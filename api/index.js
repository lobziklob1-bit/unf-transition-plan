const pool = require('./db');

/**
 * Vercel serverless API — catch-all handler
 * Handles all /api/* routes for the UNF transition plan app
 */
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const { method, query } = req.body || {};
    const url = req.url || '';
    const parts = url.split('/').filter(Boolean);

    const requireAdminPassword = () => {
        const expectedPassword = process.env.ADMIN_PASSWORD;
        if (!expectedPassword) {
            res.status(500).json({ error: 'ADMIN_PASSWORD is not configured' });
            return false;
        }

        const providedPassword = req.headers['x-admin-password'];
        if (providedPassword !== expectedPassword) {
            res.status(401).json({ error: 'Неверный пароль администратора' });
            return false;
        }

        return true;
    };

    try {
        // GET /api/data — load all data
        if (req.method === 'GET' && parts[1] === 'data') {
            const tasksRes = await pool.query('SELECT * FROM tasks ORDER BY "order" ASC');
            const subtasksRes = await pool.query('SELECT * FROM subtasks ORDER BY "order" ASC');
            const workflowRes = await pool.query('SELECT * FROM workflow_instructions ORDER BY id ASC');
            const migrationRes = await pool.query('SELECT * FROM migration_steps ORDER BY "order" ASC');

            const tasks = tasksRes.rows.map(task => ({
                id: task.task_id,
                title: task.title,
                description: task.description,
                deadline: task.deadline ? task.deadline.toISOString().split('T')[0] : '',
                responsible: task.responsible || '',
                status: task.status,
                subtasks: subtasksRes.rows
                    .filter(s => s.task_id === task.task_id)
                    .sort((a, b) => a.order - b.order)
                    .map(s => ({
                        id: s.subtask_id,
                        title: s.title,
                        deadline: s.deadline ? s.deadline.toISOString().split('T')[0] : '',
                        responsible: s.responsible || '',
                        completed: s.completed,
                        note: s.note || ''
                    }))
            }));

            const workflowInstructions = {};
            workflowRes.rows.forEach(w => {
                workflowInstructions[w.workflow_key] = {
                    title: w.title,
                    description: w.description,
                    content: w.content
                };
            });

            const migrationSteps = migrationRes.rows.map(s => ({
                id: s.step_id,
                title: s.title,
                description: s.description,
                completed: s.completed
            }));

            return res.json({ tasks, workflowInstructions, migrationSteps });
        }

        // PUT /api/tasks/status
        if (req.method === 'PUT' && parts[1] === 'tasks' && parts[2] === 'status') {
            const { task_id, status } = req.body;
            await pool.query(
                'UPDATE tasks SET status = $1, updated_at = NOW() WHERE task_id = $2',
                [status, task_id]
            );
            return res.json({ success: true });
        }

        // PUT /api/tasks/reorder
        if (req.method === 'PUT' && parts[1] === 'tasks' && parts[2] === 'reorder') {
            const { tasks } = req.body;
            const client = await pool.connect();
            try {
                await client.query('BEGIN');
                for (const t of tasks) {
                    await client.query(
                        'UPDATE tasks SET "order" = $1 WHERE task_id = $2',
                        [t.order, t.id]
                    );
                }
                await client.query('COMMIT');
            } finally {
                client.release();
            }
            return res.json({ success: true });
        }

        // POST /api/tasks
        if (req.method === 'POST' && parts[1] === 'tasks' && !parts[2]) {
            const { id, title, description, deadline, responsible, status, order } = req.body;
            await pool.query(
                `INSERT INTO tasks (task_id, title, description, deadline, responsible, status, "order")
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [id, title, description || '', deadline || null, responsible || '', status || 'pending', order || 999]
            );
            return res.json({ success: true });
        }

        // PUT /api/tasks/:taskId
        if (req.method === 'PUT' && parts[1] === 'tasks' && parts[2]) {
            const taskId = parts[2];
            const { title, description, deadline, responsible, status } = req.body;
            await pool.query(
                `UPDATE tasks SET title = $1, description = $2, deadline = $3, responsible = $4, status = $5, updated_at = NOW() WHERE task_id = $6`,
                [title, description, deadline || null, responsible, status, taskId]
            );
            return res.json({ success: true });
        }

        // DELETE /api/tasks/:taskId
        if (req.method === 'DELETE' && parts[1] === 'tasks' && parts[2]) {
            const taskId = parts[2];
            await pool.query('DELETE FROM tasks WHERE task_id = $1', [taskId]);
            return res.json({ success: true });
        }

        // PUT /api/subtasks/status
        if (req.method === 'PUT' && parts[1] === 'subtasks' && parts[2] === 'status') {
            const { subtask_id, completed } = req.body;
            await pool.query(
                'UPDATE subtasks SET completed = $1 WHERE subtask_id = $2',
                [completed, subtask_id]
            );
            return res.json({ success: true });
        }

        // POST /api/subtasks
        if (req.method === 'POST' && parts[1] === 'subtasks' && !parts[2]) {
            const { task_id, id, title, deadline, responsible, order } = req.body;
            await pool.query(
                `INSERT INTO subtasks (task_id, subtask_id, title, deadline, responsible, "order")
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [task_id, id, title, deadline || null, responsible || '', order || 999]
            );
            return res.json({ success: true });
        }

        // PUT /api/subtasks/:subtaskId
        if (req.method === 'PUT' && parts[1] === 'subtasks' && parts[2]) {
            const subtaskId = parts[2];
            const { title, deadline, responsible } = req.body;
            await pool.query(
                `UPDATE subtasks SET title = $1, deadline = $2, responsible = $3 WHERE subtask_id = $4`,
                [title, deadline || null, responsible, subtaskId]
            );
            return res.json({ success: true });
        }

        // DELETE /api/subtasks/:subtaskId
        if (req.method === 'DELETE' && parts[1] === 'subtasks' && parts[2]) {
            const subtaskId = parts[2];
            await pool.query('DELETE FROM subtasks WHERE subtask_id = $1', [subtaskId]);
            return res.json({ success: true });
        }

        // PUT /api/workflow/:key
        if (req.method === 'PUT' && parts[1] === 'workflow' && parts[2]) {
            if (!requireAdminPassword()) return;
            const key = parts[2];
            const { title, description, content } = req.body;
            await pool.query(
                `UPDATE workflow_instructions SET title = $1, description = $2, content = $3, updated_at = NOW() WHERE workflow_key = $4`,
                [title, description, content, key]
            );
            return res.json({ success: true });
        }

        // PUT /api/migration/:stepId
        if (req.method === 'PUT' && parts[1] === 'migration' && parts[2]) {
            if (parts[2] !== 'status' && !requireAdminPassword()) return;
            const stepId = parts[2];
            const { title, description } = req.body;
            await pool.query(
                'UPDATE migration_steps SET title = $1, description = $2 WHERE step_id = $3',
                [title, description, stepId]
            );
            return res.json({ success: true });
        }

        // PUT /api/migration/status
        if (req.method === 'PUT' && parts[1] === 'migration' && parts[2] === 'status') {
            const { step_id, completed } = req.body;
            await pool.query(
                'UPDATE migration_steps SET completed = $1 WHERE step_id = $2',
                [completed, step_id]
            );
            return res.json({ success: true });
        }

        // Not found
        res.status(404).json({ error: 'Not found' });

    } catch (err) {
        console.error('API Error:', err);
        res.status(500).json({ error: err.message });
    }
};
