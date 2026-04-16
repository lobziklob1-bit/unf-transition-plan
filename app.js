// ===== DATA =====
const defaultData = {
    tasks: [
        {
            id: 'task-1',
            title: 'Настройка Заказа покупателя',
            description: 'Настройка Заказа покупателя с выводом необходимых показателей, статусами и удобным форматом отображения',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-2',
            title: 'Настройка документов плановых поступлений и списаний',
            description: 'Настройка документов плановых поступлений, списаний, наличных операций',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-3',
            title: 'Настройка платежного календаря',
            description: 'Настройка платежного календаря для контроля оплат и определения свободных денежных средств',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-4',
            title: 'Настройка запроса средств',
            description: 'Настройка запроса средств (согласование Я, согласование ФД)',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-5',
            title: 'Настройка выгрузки планов для Glide',
            description: 'Настройка выгрузки План поступлений, план списаний для Glide',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-6',
            title: 'Настройка учета наличных средств',
            description: 'Настройка учета наличных средств компании',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-7',
            title: 'Проверка и доработки',
            description: 'Проверка что всё ок или доработки по настройкам',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-8',
            title: 'Порядок взаимодействия с Заказом покупателя',
            description: 'Показываем порядок взаимодействия с Заказом покупателя в 1С (Отдельно РП, отдельно Делопроизводители, отдельно Руководители)',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-9',
            title: 'Объявление о переходе на 1С',
            description: 'Делаем объявление, что через две недели запрос средств будет проходить в 1С',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: [
                { id: 'sub-9-1', title: 'Перевести все карточки по которым необходимо будет проводить оплаты в 1С. Порядок переноса карточки из Glide в 1С', deadline: '', responsible: '', completed: false },
                { id: 'sub-9-2', title: 'Карточки на этапе Подготовка к подбивке/Подбивка — согласование в Glide. Следующая подбивка будет проходить в 1С, необходимо перенести все документы по карточкам', deadline: '', responsible: '', completed: false, note: 'ПОД ВОПРОСОМ' }
            ]
        },
        {
            id: 'task-10',
            title: 'Момент перехода',
            description: 'Финплан по Заказам покупателей составляется только в 1С. Запрос средств будет проводиться только в 1С',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-11',
            title: 'Настройка согласований карточек',
            description: 'Настройка согласований карточек между отделами',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        },
        {
            id: 'task-12',
            title: 'Настройка отчета по согласованным карточкам',
            description: 'Настройка отчета по согласованным карточкам — фиксация результата',
            deadline: '',
            responsible: '',
            status: 'pending',
            subtasks: []
        }
    ],
    migrationSteps: [
        { id: 1, title: 'Выбрать или создать Контрагента', description: 'Создать контрагента со статусом "перенос из Glide"' },
        { id: 2, title: 'Создать Заказ покупателя', description: 'Создать новый заказ покупателя в 1С' },
        { id: 3, title: 'Создать и загрузить Договор', description: 'Создать договор и загрузить его в Заказ покупателя' },
        { id: 4, title: 'Создать Плановые поступления', description: 'Создать в Заказе покупателя необходимые плановые поступления' },
        { id: 5, title: 'Создать Заказы Поставщику', description: 'Создать в заказе покупателя необходимые заказы поставщику' },
        { id: 6, title: 'Создать ЗРС', description: 'Создать в заказе покупателя необходимые запросы средств' },
        { id: 7, title: 'Перенести Дополнительные соглашения', description: 'Перенести из Glide дополнительные соглашения' },
        { id: 8, title: 'Перенести Закрывающие документы с Заказчиком', description: 'Перенести из Glide закрывающие документы с заказчиком' },
        { id: 9, title: 'Перенести Закрывающие документы с Подрядчиком', description: 'Перенести из Glide закрывающие документы с подрядчиком, путем загрузки в Заказы Поставщикам' },
        { id: 10, title: 'Загрузить субподрядные договора', description: 'Загрузить субподрядные договора в созданные Заказы Поставщикам' },
        { id: 11, title: 'Загрузить фактические данные', description: 'Фактические поступления и списания, наличные расходы и проценты по ВКЛ, которые были в Glide, будут загружаться по очереди администратором' },
        { id: 12, title: 'Проверка и активация', description: 'Администратор после проверки переводит статус на "В работе" или "На подбивку"' }
    ],
    workflowInstructions: {
        'creation': {
            title: 'Создание Заказа покупателя',
            description: 'Как создать карточку и работать в Заказе покупателя',
            content: '1. Откройте раздел "Продажи" → "Заказы покупателей"\n2. Нажмите "Создать"\n3. Заполните карточку: контрагент, договор, сроки\n4. Укажите номенклатуру и количество\n5. Сохраните документ'
        },
        'finplan': {
            title: 'Финансовый план',
            description: 'Как сформировать финплан по заказу',
            content: '1. Откройте нужный Заказ покупателя\n2. Перейдите на вкладку "Финансы"\n3. Нажмите "Сформировать финплан"\n4. Проверьте плановые поступления и списания\n5. При необходимости скорректируйте суммы и даты'
        },
        'fund-request': {
            title: 'Запрос средств',
            description: 'Как отправить заявку на запрос средств',
            content: '1. В Заказе покупателя перейдите в раздел "Финансы"\n2. Нажмите "Создать запрос средств"\n3. Укажите сумму и назначение\n4. Отправьте на согласование\n5. Ожидайте утверждения руководителем'
        },
        'payments': {
            title: 'Контроль оплат',
            description: 'Где смотреть все оплаты и привязывать к Заказу',
            content: '1. Раздел "Банк и касса" → "Платежи"\n2. Фильтр по Заказу покупателя\n3. Для привязки оплаты: откройте платёж → выберите заказ\n4. Статус изменится на "Оплачен"'
        },
        'documents': {
            title: 'Документы',
            description: 'Загрузка закрывающих документов, ДС и субподрядных документов',
            content: '1. В Заказе покупателя перейдите в "Документы"\n2. "Загрузить" — закрывающие документы (акты, накладные)\n3. "ДС" — дополнительные соглашения\n4. "Субподряд" — субподрядные договоры\n5. Поддерживаемые форматы: PDF, DOCX, XLSX, JPG, PNG'
        },
        'banks': {
            title: 'Банки',
            description: 'Где смотреть банковские операции и счета',
            content: '1. Раздел "Банк и касса" → "Банковские счета"\n2. Здесь отображаются все подключенные счета\n3. Для добавления нового: "Подключить банк" → выберите банк → авторизуйтесь\n4. Операции подгружаются автоматически'
        }
    }
};

// ===== STATE =====
let appData = null;
// Relative paths work both locally (same-origin server) and on Vercel (same domain)
const API_BASE = '';

async function loadData() {
    try {
        console.log('[API] Loading data from server...');
        const resp = await fetch(`${API_BASE}/api/data`);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        console.log('[API] Data loaded:', data.tasks?.length, 'tasks');
        return data;
    } catch (e) {
        console.error('[API] Load error, falling back to localStorage:', e);
        // Fallback to localStorage if API fails
        const saved = localStorage.getItem('transition-plan-data');
        if (saved && saved.length > 10) {
            try {
                return JSON.parse(saved);
            } catch (e2) {
                return JSON.parse(JSON.stringify(defaultData));
            }
        }
        return JSON.parse(JSON.stringify(defaultData));
    }
}

async function saveData() {
    // Always save to localStorage as cache
    try {
        localStorage.setItem('transition-plan-data', JSON.stringify(appData));
    } catch (e) {
        console.warn('[API] localStorage save failed:', e);
    }
    updateStatistics();
}

async function apiSaveTasksOrder() {
    try {
        const tasks = appData.tasks.map((t, i) => ({ id: t.id, order: i }));
        await fetch(`${API_BASE}/api/tasks/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tasks })
        });
    } catch (e) {
        console.warn('[API] Order save failed:', e);
    }
}

async function apiUpdateTaskStatus(taskId, status) {
    try {
        await fetch(`${API_BASE}/api/tasks/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_id: taskId, status })
        });
    } catch (e) {
        console.warn('[API] Task status save failed:', e);
    }
}

async function apiUpdateSubtaskStatus(subtaskId, completed) {
    try {
        await fetch(`${API_BASE}/api/subtasks/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subtask_id: subtaskId, completed })
        });
    } catch (e) {
        console.warn('[API] Subtask status save failed:', e);
    }
}

async function apiInsertTask(task) {
    try {
        await fetch(`${API_BASE}/api/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...task, order: appData.tasks.length })
        });
    } catch (e) {
        console.warn('[API] Task insert failed:', e);
    }
}

async function apiUpdateTask(taskId, updates) {
    try {
        await fetch(`${API_BASE}/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
    } catch (e) {
        console.warn('[API] Task update failed:', e);
    }
}

async function apiDeleteTask(taskId) {
    try {
        await fetch(`${API_BASE}/api/tasks/${taskId}`, { method: 'DELETE' });
    } catch (e) {
        console.warn('[API] Task delete failed:', e);
    }
}

async function apiInsertSubtask(subtask) {
    try {
        const resp = await fetch(`${API_BASE}/api/subtasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subtask)
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return true;
    } catch (e) {
        console.warn('[API] Subtask insert failed:', e);
        return false;
    }
}

async function apiUpdateSubtask(subtaskId, updates) {
    try {
        await fetch(`${API_BASE}/api/subtasks/${subtaskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
    } catch (e) {
        console.warn('[API] Subtask update failed:', e);
    }
}

async function apiDeleteSubtask(subtaskId) {
    try {
        await fetch(`${API_BASE}/api/subtasks/${subtaskId}`, { method: 'DELETE' });
    } catch (e) {
        console.warn('[API] Subtask delete failed:', e);
    }
}

async function apiUpdateWorkflow(key, updates) {
    try {
        const resp = await fetch(`${API_BASE}/api/workflow/${key}`, {
            method: 'PUT',
            headers: getAdminHeaders(),
            body: JSON.stringify(updates)
        });
        if (!resp.ok) {
            const error = await resp.json().catch(() => ({}));
            throw new Error(error.error || `HTTP ${resp.status}`);
        }
        return true;
    } catch (e) {
        console.warn('[API] Workflow update failed:', e);
        showPasswordError(e.message || 'Не удалось сохранить изменения.');
        adminSessionPassword = '';
        return false;
    }
}

async function apiUpdateMigration(stepId, updates) {
    try {
        const resp = await fetch(`${API_BASE}/api/migration/${stepId}`, {
            method: 'PUT',
            headers: getAdminHeaders(),
            body: JSON.stringify(updates)
        });
        if (!resp.ok) {
            const error = await resp.json().catch(() => ({}));
            throw new Error(error.error || `HTTP ${resp.status}`);
        }
        return true;
    } catch (e) {
        console.warn('[API] Migration update failed:', e);
        showPasswordError(e.message || 'Не удалось сохранить изменения.');
        adminSessionPassword = '';
        return false;
    }
}

function getAdminHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (adminSessionPassword) {
        headers['x-admin-password'] = adminSessionPassword;
    }
    return headers;
}

function showPasswordError(message) {
    const errorEl = document.getElementById('password-error');
    if (!errorEl) return;
    errorEl.textContent = message || 'Неверный пароль';
    errorEl.style.display = 'block';
}

// ===== EVENT DELEGATION =====
function initGlobalEventListeners() {
    const tasksContainer = document.getElementById('tasks-container');
    
    // ===== DRAG AND DROP (Mouse Events) =====
    let dragState = null;

    // Drag handle mousedown
    tasksContainer.addEventListener('mousedown', (e) => {
        const handle = e.target.closest('.drag-handle');
        if (!handle) return;
        
        const card = handle.closest('.task-card');
        if (!card) return;
        
        e.preventDefault();
        
        const taskId = card.dataset.taskId;
        const taskIndex = appData.tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;
        
        // Create drag ghost — position it exactly where the card is
        const rect = card.getBoundingClientRect();
        const ghost = card.cloneNode(true);
        ghost.style.position = 'fixed';
        ghost.style.top = rect.top + 'px';
        ghost.style.left = rect.left + 'px';
        ghost.style.width = rect.width + 'px';
        ghost.style.opacity = '0.85';
        ghost.style.zIndex = '10000';
        ghost.style.transform = 'rotate(2deg) scale(1.02)';
        ghost.style.transition = 'none';
        ghost.style.pointerEvents = 'none';
        ghost.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
        ghost.style.margin = '0';
        document.body.appendChild(ghost);
        
        card.style.opacity = '0.3';
        card.classList.add('dragging');
        
        dragState = {
            taskId,
            taskIndex,
            card,
            ghost,
            startX: e.clientX,
            startY: e.clientY,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
            moved: false
        };

        console.log('[DnD] mousedown on:', taskId, 'index:', taskIndex);
    });

    // Mousemove
    document.addEventListener('mousemove', (e) => {
        if (!dragState) return;
        e.preventDefault();

        dragState.moved = true;

        // Move ghost — keep same horizontal position relative to cursor
        dragState.ghost.style.top = (e.clientY - dragState.offsetY) + 'px';
        dragState.ghost.style.left = (e.clientX - dragState.offsetX) + 'px';
        
        // Find card under cursor
        const cards = Array.from(tasksContainer.querySelectorAll('.task-card'));
        const targetCard = cards.find(c => {
            if (c === dragState.card || c.classList.contains('dragging')) return false;
            const rect = c.getBoundingClientRect();
            return e.clientY >= rect.top && e.clientY <= rect.bottom;
        });
        
        // Clear all indicators
        cards.forEach(c => c.classList.remove('drag-above', 'drag-below'));
        
        if (targetCard) {
            const rect = targetCard.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            if (e.clientY < midY) {
                targetCard.classList.add('drag-above');
            } else {
                targetCard.classList.add('drag-below');
            }
        }
    });
    
    // Mouseup
    document.addEventListener('mouseup', (e) => {
        if (!dragState) return;
        
        console.log('[DnD] mouseup, moved:', dragState.moved);
        
        // Remove ghost
        if (dragState.ghost && dragState.ghost.parentNode) {
            dragState.ghost.parentNode.removeChild(dragState.ghost);
        }
        
        // Restore card opacity
        dragState.card.style.opacity = '';
        dragState.card.classList.remove('dragging');
        
        if (dragState.moved) {
            // Find insertion point
            const cards = Array.from(tasksContainer.querySelectorAll('.task-card'));
            const targetCard = cards.find(c => 
                !c.classList.contains('dragging') && 
                (c.classList.contains('drag-above') || c.classList.contains('drag-below'))
            );
            
            if (targetCard) {
                const targetId = targetCard.dataset.taskId;
                const targetIndex = appData.tasks.findIndex(t => t.id === targetId);
                const draggedIndex = dragState.taskIndex;
                
                console.log('[DnD] draggedIndex:', draggedIndex, 'targetIndex:', targetIndex);
                console.log('[DnD] target:', appData.tasks[targetIndex]?.title);
                console.log('[DnD] isAbove:', targetCard.classList.contains('drag-above'));
                
                if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
                    const [movedTask] = appData.tasks.splice(draggedIndex, 1);
                    const newTargetIndex = appData.tasks.findIndex(t => t.id === targetId);
                    const insertBefore = targetCard.classList.contains('drag-above');
                    const insertIndex = insertBefore ? newTargetIndex : newTargetIndex + 1;
                    
                    appData.tasks.splice(insertIndex, 0, movedTask);

                    console.log('[DnD] New order:', appData.tasks.map((t, i) => `${i+1}. ${t.title}`));

                    apiSaveTasksOrder();
                    saveData();
                    renderTasks();
                }
            } else {
                console.log('[DnD] No target card found');
            }
        }
        
        // Clear indicators
        tasksContainer.querySelectorAll('.task-card').forEach(c => {
            c.classList.remove('drag-above', 'drag-below', 'dragging');
            c.style.opacity = '';
        });
        
        dragState = null;
    });
    
    // Event: Task checkbox toggle
    tasksContainer.addEventListener('change', (e) => {
        const checkbox = e.target.closest('input[type="checkbox"]');
        if (!checkbox) return;
        
        const taskId = checkbox.id.replace('check-', '');
        const task = appData.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        task.status = checkbox.checked ? 'completed' : 'pending';
        apiUpdateTaskStatus(task.id, task.status);
        saveData();
        renderTasks();
    });

    // Event: Subtask checkbox toggle
    tasksContainer.addEventListener('change', (e) => {
        const checkbox = e.target.closest('input[type="checkbox"]');
        if (!checkbox || !checkbox.id.startsWith('subcheck-')) return;
        
        const subtaskId = checkbox.id.replace('subcheck-', '');
        for (const task of appData.tasks) {
            const subtask = task.subtasks.find(s => s.id === subtaskId);
            if (subtask) {
                subtask.completed = checkbox.checked;
                apiUpdateSubtaskStatus(subtask.id, subtask.completed);
                saveData();
                renderTasks();
                break;
            }
        }
    });

    // Event: Expand/collapse task
    tasksContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.task-header');
        if (!header) return;
        if (e.target.closest('.task-checkbox, .task-actions, .drag-handle')) return;
        
        const card = header.closest('.task-card');
        if (card) {
            card.classList.toggle('expanded');
        }
    });

    // Event: Add subtask button
    tasksContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-subtask, .add-subtask-btn');
        if (!btn) return;
        e.stopPropagation();
        openAddSubtaskModal(btn.dataset.taskId);
    });

    // Event: Edit task
    tasksContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.edit-task');
        if (!btn) return;
        e.stopPropagation();
        openEditTaskModal(btn.dataset.taskId);
    });

    // Event: Delete task
    tasksContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-task');
        if (!btn) return;
        e.stopPropagation();
        if (confirm('Удалить задачу?')) {
            apiDeleteTask(btn.dataset.taskId);
            appData.tasks = appData.tasks.filter(t => t.id !== btn.dataset.taskId);
            saveData();
            renderTasks();
        }
    });

    // Event: Edit subtask
    tasksContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.edit-subtask');
        if (!btn) return;
        e.stopPropagation();
        openEditSubtaskModal(btn.dataset.parentId, btn.dataset.subtaskId);
    });

    // Event: Delete subtask
    tasksContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-subtask');
        if (!btn) return;
        e.stopPropagation();
        if (confirm('Удалить подзадачу?')) {
            apiDeleteSubtask(btn.dataset.subtaskId);
            const parentTask = appData.tasks.find(t => t.id === btn.dataset.parentId);
            if (parentTask) {
                parentTask.subtasks = parentTask.subtasks.filter(s => s.id !== btn.dataset.subtaskId);
                saveData();
                renderTasks();
            }
        }
    });
}

// ===== HELPERS =====
function generateId() {
    return 'task-' + Date.now();
}

function generateSubId() {
    return 'sub-' + Date.now();
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU');
}

// ===== RENDERING =====
function renderTasks() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    appData.tasks.forEach((task, index) => {
        const taskCard = createTaskCard(task, index + 1);
        container.appendChild(taskCard);
    });

    updateStatistics();
}

function createTaskCard(task, number) {
    const card = document.createElement('div');
    const isCompleted = task.status === 'completed';
    const isInProgress = task.status === 'in-progress';
    card.className = `task-card fade-in visible ${isCompleted ? 'completed' : ''} ${isInProgress ? 'in-progress' : ''}`;
    card.dataset.taskId = task.id;

    const completedSubtasks = task.subtasks.filter(s => s.completed).length;
    const totalSubtasks = task.subtasks.length;

    card.innerHTML = `
        <div class="task-header">
            <div class="drag-handle" title="Перетащите для изменения порядка">
                <i class="fas fa-grip-vertical"></i>
            </div>
            <div class="task-checkbox">
                <input type="checkbox" id="check-${task.id}" ${task.status === 'completed' ? 'checked' : ''}>
                <label for="check-${task.id}"><i class="fas fa-check"></i></label>
            </div>
            <div class="task-number">${number}</div>
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                ${task.description ? `<div class="task-desc-inline">${task.description}</div>` : ''}
                <div class="task-meta">
                    ${task.deadline ? `<div class="task-meta-item"><i class="fas fa-calendar"></i> ${formatDate(task.deadline)}</div>` : ''}
                    ${task.responsible ? `<div class="task-meta-item"><i class="fas fa-user"></i> ${task.responsible}</div>` : ''}
                    ${totalSubtasks > 0 ? `<div class="task-meta-item"><i class="fas fa-list-check"></i> ${completedSubtasks}/${totalSubtasks} подзадач</div>` : ''}
                </div>
            </div>
            <div class="task-actions">
                <button class="task-action-btn add-subtask" title="Добавить подзадачу" data-task-id="${task.id}">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="task-action-btn edit-task" title="Редактировать" data-task-id="${task.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-action-btn delete delete-task" title="Удалить" data-task-id="${task.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            ${totalSubtasks > 0 ? '<i class="fas fa-chevron-down task-toggle-icon"></i>' : ''}
        </div>
        <div class="task-body">
            <div class="task-content">
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                ${totalSubtasks > 0 ? `
                    <div class="subtasks-section">
                        <div class="subtasks-header">
                            <div class="subtasks-title">Подзадачи (${completedSubtasks}/${totalSubtasks})</div>
                            <button class="add-subtask-btn" data-task-id="${task.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="subtasks-list">
                            ${task.subtasks.map(subtask => `
                                <div class="subtask-item ${subtask.completed ? 'completed' : ''}" data-subtask-id="${subtask.id}">
                                    <div class="subtask-checkbox">
                                        <input type="checkbox" id="subcheck-${subtask.id}" ${subtask.completed ? 'checked' : ''}>
                                        <label for="subcheck-${subtask.id}"><i class="fas fa-check"></i></label>
                                    </div>
                                    <div class="subtask-info">
                                        <div class="subtask-title">${subtask.title} ${subtask.note ? `<span style="color: var(--primary-orange); font-size: 11px;">[${subtask.note}]</span>` : ''}</div>
                                        <div class="subtask-meta">
                                            ${subtask.deadline ? `<div class="subtask-meta-item"><i class="fas fa-calendar"></i> ${formatDate(subtask.deadline)}</div>` : ''}
                                            ${subtask.responsible ? `<div class="subtask-meta-item"><i class="fas fa-user"></i> ${subtask.responsible}</div>` : ''}
                                        </div>
                                    </div>
                                    <div class="subtask-actions">
                                        <button class="subtask-action-btn edit-subtask" title="Редактировать" data-subtask-id="${subtask.id}" data-parent-id="${task.id}">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="subtask-action-btn delete delete-subtask" title="Удалить" data-subtask-id="${subtask.id}" data-parent-id="${task.id}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

function renderMigrationSteps() {
    const container = document.getElementById('migration-steps');
    container.innerHTML = '';
    
    appData.migrationSteps.forEach(step => {
        const stepEl = document.createElement('div');
        stepEl.className = `migration-step fade-in visible ${step.completed ? 'completed' : ''}`;
        stepEl.dataset.stepId = step.id;
        stepEl.innerHTML = `
            <div class="migration-step-number">${step.id}</div>
            <div class="migration-step-content">
                <div class="migration-step-title">${step.title}</div>
                <div class="migration-step-desc">${step.description}</div>
            </div>
        `;
        container.appendChild(stepEl);
    });
}

function updateStatistics() {
    const total = appData.tasks.length;
    const completed = appData.tasks.filter(t => t.status === 'completed').length;
    const inProgress = appData.tasks.filter(t => t.status === 'in-progress').length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('in-progress-tasks').textContent = inProgress;
    document.getElementById('progress-percent').textContent = percent + '%';
    
    document.getElementById('progress-text').textContent = percent + '% завершено';
    document.querySelector('.progress-fill').style.width = percent + '%';
}

// ===== MODALS =====
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
    delete window._editingSubtask;
    delete window._pendingMigrationId;
    
    // Reset modal titles
    const addSubtaskModal = document.querySelector('#add-subtask-modal .modal-header h3');
    if (addSubtaskModal) {
        addSubtaskModal.innerHTML = '<i class="fas fa-plus"></i> Добавить подзадачу';
    }
    
    // Reset workflow modal to view mode
    document.getElementById('workflow-view-mode').style.display = 'block';
    document.getElementById('workflow-edit-mode').style.display = 'none';
}

// Add Task Modal
function openAddTaskModal() {
    document.getElementById('add-task-form').reset();
    openModal('add-task-modal');
}

document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newTask = {
        id: generateId(),
        title: document.getElementById('task-title').value.trim(),
        description: document.getElementById('task-description').value.trim(),
        deadline: document.getElementById('task-deadline').value,
        responsible: document.getElementById('task-responsible').value.trim(),
        status: 'pending',
        subtasks: []
    };
    
    if (!newTask.title) return;

    appData.tasks.push(newTask);
    apiInsertTask(newTask);
    saveData();
    renderTasks();
    closeAllModals();
});

// Edit Task Modal
function openEditTaskModal(taskId) {
    const task = appData.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('edit-task-id').value = task.id;
    document.getElementById('edit-task-title').value = task.title;
    document.getElementById('edit-task-description').value = task.description || '';
    document.getElementById('edit-task-deadline').value = task.deadline || '';
    document.getElementById('edit-task-responsible').value = task.responsible || '';
    document.getElementById('edit-task-status').value = task.status;
    
    openModal('edit-task-modal');
}

document.getElementById('edit-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskId = document.getElementById('edit-task-id').value;
    const task = appData.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    task.title = document.getElementById('edit-task-title').value.trim();
    task.description = document.getElementById('edit-task-description').value.trim();
    task.deadline = document.getElementById('edit-task-deadline').value;
    task.responsible = document.getElementById('edit-task-responsible').value.trim();
    task.status = document.getElementById('edit-task-status').value;

    apiUpdateTask(task.id, { title: task.title, description: task.description, deadline: task.deadline, responsible: task.responsible, status: task.status });
    saveData();
    renderTasks();
    closeAllModals();
});

// Add Subtask Modal
function openAddSubtaskModal(parentId) {
    document.getElementById('add-subtask-form').reset();
    document.getElementById('subtask-parent-id').value = parentId;
    delete window._editingSubtask;
    
    // Reset modal title
    document.querySelector('#add-subtask-modal .modal-header h3').innerHTML = '<i class="fas fa-plus"></i> Добавить подзадачу';
    
    openModal('add-subtask-modal');
}

// Edit Subtask Modal
function openEditSubtaskModal(parentId, subtaskId) {
    const parentTask = appData.tasks.find(t => t.id === parentId);
    if (!parentTask) return;
    
    const subtask = parentTask.subtasks.find(s => s.id === subtaskId);
    if (!subtask) return;
    
    // Store editing state
    window._editingSubtask = { parentId, subtaskId };
    
    // Reuse add subtask modal but pre-fill
    document.getElementById('subtask-parent-id').value = parentId;
    document.getElementById('subtask-title').value = subtask.title;
    document.getElementById('subtask-deadline').value = subtask.deadline || '';
    document.getElementById('subtask-responsible').value = subtask.responsible || '';
    
    // Change modal title
    document.querySelector('#add-subtask-modal .modal-header h3').innerHTML = '<i class="fas fa-edit"></i> Редактировать подзадачу';
    
    openModal('add-subtask-modal');
}

// Handle subtask form submit (add or edit)
document.getElementById('add-subtask-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const parentId = document.getElementById('subtask-parent-id').value;
    const parentTask = appData.tasks.find(t => t.id === parentId);
    if (!parentTask) return;
    
    const title = document.getElementById('subtask-title').value.trim();
    if (!title) return;
    
    // Check if we're editing
    if (window._editingSubtask) {
        const subtask = parentTask.subtasks.find(s => s.id === window._editingSubtask.subtaskId);
        if (subtask) {
            subtask.title = title;
            subtask.deadline = document.getElementById('subtask-deadline').value;
            subtask.responsible = document.getElementById('subtask-responsible').value.trim();
            apiUpdateSubtask(subtask.id, { title, deadline: subtask.deadline, responsible: subtask.responsible });
        }
        delete window._editingSubtask;
        
        // Reset modal title
        document.querySelector('#add-subtask-modal .modal-header h3').innerHTML = '<i class="fas fa-plus"></i> Добавить подзадачу';
    } else {
        // Adding new subtask
        const newSubtask = {
            task_id: parentId,
            id: generateSubId(),
            title: title,
            deadline: document.getElementById('subtask-deadline').value,
            responsible: document.getElementById('subtask-responsible').value.trim(),
            completed: false,
            order: parentTask.subtasks.length
        };
        parentTask.subtasks.push(newSubtask);
        apiInsertSubtask(newSubtask);
    }

    saveData();
    renderTasks();
    closeAllModals();
});

// Modal event listeners
document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Overlay click — only closes the specific modal clicked on
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        const modal = overlay.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.getElementById('add-task-btn').addEventListener('click', openAddTaskModal);

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// ===== WORKFLOW INSTRUCTIONS =====
let adminSessionPassword = '';
let pendingWorkflowAction = null;

function openWorkflowInstruction(key) {
    const data = appData.workflowInstructions ? appData.workflowInstructions[key] : null;
    console.log('openWorkflowInstruction called, key:', key, 'data:', data);
    
    if (!data) return;
    
    document.getElementById('workflow-instruction-title').textContent = data.title;
    document.getElementById('workflow-instruction-content').textContent = data.content;
    document.getElementById('workflow-edit-key').value = key;
    
    // Show view mode, hide edit mode
    document.getElementById('workflow-view-mode').style.display = 'block';
    document.getElementById('workflow-edit-mode').style.display = 'none';
    
    openModal('workflow-instruction-modal');
}

function openWorkflowEditForm(key) {
    console.log('[WF Edit v3] openWorkflowEditForm called, key:', key);
    const data = appData.workflowInstructions[key];
    if (!data) {
        console.error('[WF Edit v3] No data for key:', key);
        return;
    }

    try {
        const titleEl = document.getElementById('workflow-instruction-title');
        const keyEl = document.getElementById('workflow-edit-key');
        const editTitleEl = document.getElementById('workflow-edit-title');
        const descEl = document.getElementById('workflow-edit-desc');
        const contentEl = document.getElementById('workflow-edit-content');
        const viewModeEl = document.getElementById('workflow-view-mode');
        const editModeEl = document.getElementById('workflow-edit-mode');
        
        console.log('[WF Edit v3] Elements:', {
            title: !!titleEl, key: !!keyEl, editTitle: !!editTitleEl,
            desc: !!descEl, content: !!contentEl, viewMode: !!viewModeEl, editMode: !!editModeEl
        });

        if (!viewModeEl || !editModeEl) {
            console.error('[WF Edit v3] CRITICAL: viewMode or editMode element not found!');
            console.log('[WF Edit v3] Try searching modal content...');
            const modal = document.getElementById('workflow-instruction-modal');
            if (modal) {
                console.log('[WF Edit v3] Modal innerHTML preview:', modal.innerHTML.substring(0, 500));
            }
            return;
        }

        if (titleEl) titleEl.textContent = data.title;
        if (keyEl) keyEl.value = key;
        if (editTitleEl) editTitleEl.value = data.title;
        if (descEl) descEl.value = data.description || '';
        if (contentEl) contentEl.value = data.content;

        viewModeEl.style.display = 'none';
        editModeEl.style.display = 'block';
        
        console.log('[WF Edit v3] Edit mode activated!');
    } catch (err) {
        console.error('[WF Edit v3] Exception:', err);
    }
}

document.getElementById('edit-workflow-btn').addEventListener('click', () => {
    const key = document.getElementById('workflow-edit-key').value;
    if (!adminSessionPassword) {
        requestAdminForWorkflow(key);
    } else {
        openWorkflowEditForm(key);
    }
});

document.getElementById('cancel-workflow-edit-bottom').addEventListener('click', () => {
    const key = document.getElementById('workflow-edit-key').value;
    openWorkflowInstruction(key);
});

document.getElementById('workflow-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const key = document.getElementById('workflow-edit-key').value;
    const newTitle = document.getElementById('workflow-edit-title').value.trim();
    const newDesc = document.getElementById('workflow-edit-desc').value.trim();
    const newContent = document.getElementById('workflow-edit-content').value.trim();
    
    if (!newTitle || !newContent) return;
    
    if (appData.workflowInstructions[key]) {
        const saved = await apiUpdateWorkflow(key, { title: newTitle, description: newDesc, content: newContent });
        if (!saved) {
            requestAdminForWorkflow(key, document.getElementById('password-error').textContent);
            return;
        }
        appData.workflowInstructions[key].title = newTitle;
        appData.workflowInstructions[key].description = newDesc;
        appData.workflowInstructions[key].content = newContent;
        saveData();
    }
    
    // Update view
    document.getElementById('workflow-instruction-title').textContent = newTitle;
    document.getElementById('workflow-instruction-content').textContent = newContent;
    
    // Update card in DOM
    const card = document.querySelector(`.workflow-card[data-workflow-key="${key}"]`);
    if (card) {
        card.querySelector('h3').textContent = newTitle;
        const descEl = card.querySelector('.workflow-desc');
        if (descEl) descEl.textContent = newDesc;
    }
    
    // Switch to view mode
    document.getElementById('workflow-view-mode').style.display = 'block';
    document.getElementById('workflow-edit-mode').style.display = 'none';
});

document.getElementById('cancel-workflow-edit-bottom').addEventListener('click', () => {
    const key = document.getElementById('workflow-edit-key').value;
    openWorkflowInstruction(key);
});

function requestAdminForWorkflow(key, errorMessage = '') {
    pendingWorkflowAction = { type: 'workflow-edit', key };
    document.getElementById('admin-password').value = '';
    if (errorMessage) {
        showPasswordError(errorMessage);
    } else {
        showPasswordError('');
        document.getElementById('password-error').style.display = 'none';
    }
    openModal('password-modal');
}

function requestAdminForMigration(errorMessage = '') {
    pendingWorkflowAction = { type: 'migration-edit' };
    document.getElementById('admin-password').value = '';
    if (errorMessage) {
        showPasswordError(errorMessage);
    } else {
        showPasswordError('');
        document.getElementById('password-error').style.display = 'none';
    }
    openModal('password-modal');
}

function handlePasswordSubmit() {
    const password = document.getElementById('admin-password').value;
    if (!password) {
        showPasswordError('Введите пароль');
        return false;
    }

    adminSessionPassword = password;
    
    // Only close password modal, keep others open
    document.getElementById('password-modal').classList.remove('active');

    if (pendingWorkflowAction) {
        if (pendingWorkflowAction.type === 'workflow-edit') {
            openWorkflowEditForm(pendingWorkflowAction.key);
        } else if (pendingWorkflowAction.type === 'migration-edit') {
            if (window._pendingMigrationId) {
                openEditMigrationForm(window._pendingMigrationId);
            }
        }
        pendingWorkflowAction = null;
    }
    return true;
}

document.getElementById('password-form').addEventListener('submit', (e) => {
    e.preventDefault();
    handlePasswordSubmit();
});

// Click handler for workflow cards (delegated via initGlobalEventListeners)
// Moved inside initGlobalEventListeners below

// ===== MIGRATION STEP EDIT =====
window._pendingMigrationId = null;

function openEditMigrationForm(stepId) {
    const step = appData.migrationSteps.find(s => s.id === stepId);
    if (!step) return;
    
    document.getElementById('edit-migration-id').value = step.id;
    document.getElementById('edit-migration-title').value = step.title;
    document.getElementById('edit-migration-desc').value = step.description || '';
    
    openModal('edit-migration-modal');
}

document.getElementById('edit-migration-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const stepId = parseInt(document.getElementById('edit-migration-id').value);
    const step = appData.migrationSteps.find(s => s.id === stepId);
    if (!step) return;
    
    const nextTitle = document.getElementById('edit-migration-title').value.trim();
    const nextDescription = document.getElementById('edit-migration-desc').value.trim();

    const saved = await apiUpdateMigration(step.id, { title: nextTitle, description: nextDescription });
    if (!saved) {
        window._pendingMigrationId = step.id;
        requestAdminForMigration(document.getElementById('password-error').textContent);
        return;
    }

    step.title = nextTitle;
    step.description = nextDescription;
    saveData();
    renderMigrationSteps();
    closeAllModals();
});

// Click handler for workflow cards
document.addEventListener('click', (e) => {
    const card = e.target.closest('.workflow-card');
    if (!card) return;
    
    const key = card.dataset.workflowKey;
    if (key) {
        e.stopPropagation();
        openWorkflowInstruction(key);
    }
});

// Click on migration step number
document.addEventListener('click', (e) => {
    const stepNum = e.target.closest('.migration-step-number');
    if (!stepNum) return;
    e.stopPropagation();

    const stepEl = stepNum.closest('.migration-step');
    if (!stepEl) return;

    const stepId = parseInt(stepEl.dataset.stepId);

    if (!adminSessionPassword) {
        window._pendingMigrationId = stepId;
        requestAdminForMigration();
    } else {
        openEditMigrationForm(stepId);
    }
});

// ===== INIT =====
console.log('=== APP v4 (PostgreSQL) LOADED ===');
document.addEventListener('DOMContentLoaded', async () => {
    appData = await loadData();
    renderTasks();
    renderMigrationSteps();
    initGlobalEventListeners();

    // Delay to allow DOM to settle
    setTimeout(initScrollAnimations, 100);
});
