const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../src')));

// PostgreSQL connection
const pool = new Pool({
    database: 'unf_transition_plan',
    user: process.env.DB_USER || process.env.USER,
    host: 'localhost',
    port: 5432,
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ DB connection error:', err.message);
    } else {
        console.log('✅ PostgreSQL connected:', res.rows[0].now);
    }
});

// ===== API: GET all data =====
app.get('/api/data', async (req, res) => {
    try {
        const tasks = await pool.query('SELECT * FROM tasks ORDER BY "order" ASC');
        const subtasks = await pool.query('SELECT * FROM subtasks ORDER BY "order" ASC');
        const workflow = await pool.query('SELECT * FROM workflow_instructions ORDER BY id ASC');
        const migrationSteps = await pool.query('SELECT * FROM migration_steps ORDER BY "order" ASC');

        // Group subtasks by task
        const tasksWithSubtasks = tasks.rows.map(task => ({
            id: task.task_id,
            title: task.title,
            description: task.description,
            deadline: task.deadline ? task.deadline.toISOString().split('T')[0] : '',
            responsible: task.responsible || '',
            status: task.status,
            subtasks: subtasks.rows
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
        workflow.rows.forEach(w => {
            workflowInstructions[w.workflow_key] = {
                title: w.title,
                description: w.description,
                content: w.content
            };
        });

        const migrationData = migrationSteps.rows.map(s => ({
            id: s.step_id,
            title: s.title,
            description: s.description,
            completed: s.completed
        }));

        res.json({
            tasks: tasksWithSubtasks,
            workflowInstructions,
            migrationSteps: migrationData
        });
    } catch (err) {
        console.error('GET /api/data error:', err);
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE task status =====
app.put('/api/tasks/status', async (req, res) => {
    const { task_id, status } = req.body;
    try {
        await pool.query(
            'UPDATE tasks SET status = $1, updated_at = NOW() WHERE task_id = $2',
            [status, task_id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE task order =====
app.put('/api/tasks/reorder', async (req, res) => {
    const { tasks } = req.body; // array of {id, order}
    try {
        const client = await pool.connect();
        await client.query('BEGIN');
        for (const t of tasks) {
            await client.query(
                'UPDATE tasks SET "order" = $1 WHERE task_id = $2',
                [t.order, t.id]
            );
        }
        await client.query('COMMIT');
        client.release();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE subtask completed =====
app.put('/api/subtasks/status', async (req, res) => {
    const { subtask_id, completed } = req.body;
    try {
        await pool.query(
            'UPDATE subtasks SET completed = $1 WHERE subtask_id = $2',
            [completed, subtask_id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: INSERT new task =====
app.post('/api/tasks', async (req, res) => {
    const { id, title, description, deadline, responsible, status, order } = req.body;
    try {
        await pool.query(
            `INSERT INTO tasks (task_id, title, description, deadline, responsible, status, "order") 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [id, title, description || '', deadline || null, responsible || '', status || 'pending', order || 999]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE task =====
app.put('/api/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { title, description, deadline, responsible, status } = req.body;
    try {
        await pool.query(
            `UPDATE tasks SET title = $1, description = $2, deadline = $3, responsible = $4, status = $5, updated_at = NOW() WHERE task_id = $6`,
            [title, description, deadline || null, responsible, status, taskId]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: DELETE task =====
app.delete('/api/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
        await pool.query('DELETE FROM tasks WHERE task_id = $1', [taskId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: INSERT subtask =====
app.post('/api/subtasks', async (req, res) => {
    const { task_id, id, title, deadline, responsible, order } = req.body;
    try {
        await pool.query(
            `INSERT INTO subtasks (task_id, subtask_id, title, deadline, responsible, "order")
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [task_id, id, title, deadline || null, responsible || '', order || 999]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE subtask =====
app.put('/api/subtasks/:subtaskId', async (req, res) => {
    const { subtaskId } = req.params;
    const { title, deadline, responsible } = req.body;
    try {
        await pool.query(
            `UPDATE subtasks SET title = $1, deadline = $2, responsible = $3 WHERE subtask_id = $4`,
            [title, deadline || null, responsible, subtaskId]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: DELETE subtask =====
app.delete('/api/subtasks/:subtaskId', async (req, res) => {
    const { subtaskId } = req.params;
    try {
        await pool.query('DELETE FROM subtasks WHERE subtask_id = $1', [subtaskId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE workflow instruction =====
app.put('/api/workflow/:key', async (req, res) => {
    const { key } = req.params;
    const { title, description, content } = req.body;
    try {
        await pool.query(
            `UPDATE workflow_instructions SET title = $1, description = $2, content = $3, updated_at = NOW() WHERE workflow_key = $4`,
            [title, description, content, key]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE migration step =====
app.put('/api/migration/:stepId', async (req, res) => {
    const { stepId } = req.params;
    const { title, description } = req.body;
    try {
        await pool.query(
            'UPDATE migration_steps SET title = $1, description = $2 WHERE step_id = $3',
            [title, description, stepId]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== API: UPDATE migration step completed =====
app.put('/api/migration/status', async (req, res) => {
    const { step_id, completed } = req.body;
    try {
        await pool.query(
            'UPDATE migration_steps SET completed = $1 WHERE step_id = $2',
            [completed, step_id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ===== Serve frontend =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/data`);
});
