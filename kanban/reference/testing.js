try {
    /**
     * Determines the CSS class based on the task's urgency and importance.
     * 
     * @param {Object} task - The task object containing urgency and importance flags.
     * @returns {string} CSS class that reflects the urgency and importance level of the task.
     */
    function getColor(task) {
        if (task.urgent && task.important) return 'high-urgent high-important';
        if (task.urgent) return 'high-urgent low-important';
        if (task.important) return 'low-urgent high-important';
        return 'low-urgent low-important';
    }

    const values = ['Start Date', 'Score', 'Important', 'Urgent'];
    let currentIndex = 0;
    const valueDisplay = document.getElementById('valueDisplay');
    const cycleButton = document.getElementById('cycleButton');

    /**
     * Cycles through sorting values (Start Date, Score, Important, Urgent),
     * updates the display, and re-renders the Kanban board.
     */
    function updateValue() {
        valueDisplay.textContent = values[currentIndex];
        currentIndex = (currentIndex + 1) % values.length;
        renderKanbanBoard();
        window.callAmplenotePlugin("togglesort");
    }

    cycleButton.addEventListener('click', updateValue);

    /**
     * Displays detailed task information when hovering over a task.
     * 
     * @param {Object} task - The task object containing detailed information.
     * @param {HTMLElement} element - The DOM element representing the task.
     */
    function showTaskInfo(task, element) {
        let infoDiv = element.querySelector('.task-info');
        if (!infoDiv) {
            infoDiv = document.createElement('div');
            infoDiv.className = 'task-info' + (document.body.classList.contains('dark-mode') ? ' dark-mode' : '');
            infoDiv.innerHTML = task.taskInfo;
            element.appendChild(infoDiv);
        }
        infoDiv.style.display = 'block';
    }

    /**
     * Hides the task information when the mouse leaves the task element.
     * 
     * @param {HTMLElement} element - The DOM element representing the task.
     */
    function hideTaskInfo(element) {
        const infoDiv = element.querySelector('.task-info');
        if (infoDiv) {
            infoDiv.style.display = 'none';
        }
    }

    /**
     * Helper function to create a button for task items.
     * 
     * @param {string} text - The text content of the button.
     * @param {string} className - The CSS class to be applied to the button.
     * @param {function} clickHandler - The function to handle click events.
     * @returns {HTMLElement} The created button element.
     */
    function createButton(text, className, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = className;
        button.onclick = clickHandler;
        return button;
    }

    /**
     * Creates and appends a task item to the specified container.
     * 
     * @param {Object} task - The task object to be displayed.
     * @param {HTMLElement} container - The DOM element representing the task list (pending, completed, or dismissed).
     * @param {boolean} isPending - Whether the task is in the pending state (default is true).
     */
    function createTaskItem(task, container, isPending = true) {
        const taskItem = document.createElement('div');
        taskItem.className = 'task ' + getColor(task);
        taskItem.textContent = task.content;

        taskItem.appendChild(createButton('ℹ', 'task-button', () => showTaskInfo(task, taskItem)));

        if (isPending) {
            taskItem.appendChild(createButton('⚙', 'task-button2', () => window.callAmplenotePlugin("taskEdit", task.uuid)));
        }

        taskItem.onmouseleave = () => hideTaskInfo(taskItem);

        container.appendChild(taskItem);
    }

    /**
     * Sorts tasks based on the specified sorting criterion (Start Date, Score, Important, Urgent).
     * 
     * @param {Array} tasks - The array of tasks to be sorted.
     * @param {string} sortBy - The criterion to sort the tasks by.
     * @returns {Array} The sorted array of tasks.
     */
    function sortTasks(tasks, sortBy) {
        switch (sortBy) {
            case 'Start Date':
                return tasks.sort((a, b) => new Date(b.startAtz) - new Date(a.startAtz));
            case 'Score':
                return tasks.sort((a, b) => b.score - a.score);
            case 'Important':
                return tasks.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
            case 'Urgent':
                return tasks.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
            default:
                return tasks;
        }
    }

    /**
     * Renders the Kanban board by creating columns for each note and sorting tasks into pending, completed, and dismissed.
     */
    function renderKanbanBoard() {
        const board = document.getElementById('kanban-board');
        const columns = {};

        tasks.forEach(task => {
            const note = task.notename;
            if (!columns[note]) {
                columns[note] = { pending: [], completed: [], dismissed: [] };
            }

            if (task.completedAt) {
                columns[note].completed.push(task);
            } else if (task.dismissedAt) {
                columns[note].dismissed.push(task);
            } else {
                columns[note].pending.push(task);
            }
        });

        board.innerHTML = '';  // Clear board before rendering

        Object.keys(columns).forEach(note => {
            const column = document.createElement('div');
            column.className = 'column';

            const header = document.createElement('h3');
            header.textContent = note;
            header.className = 'task-category';
            column.appendChild(header);

            const pendingList = document.createElement('div');
            pendingList.appendChild(document.createTextNode('Pending:'));
            sortTasks(columns[note].pending, valueDisplay.textContent).forEach(task => createTaskItem(task, pendingList));

            const completedList = document.createElement('div');
            completedList.appendChild(document.createTextNode('Completed:'));
            columns[note].completed.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
                .forEach(task => createTaskItem(task, completedList, false));

            const dismissedList = document.createElement('div');
            dismissedList.appendChild(document.createTextNode('Dismissed:'));
            columns[note].dismissed.sort((a, b) => new Date(b.dismissedAt) - new Date(a.dismissedAt))
                .forEach(task => createTaskItem(task, dismissedList, false));

            column.appendChild(pendingList);
            column.appendChild(completedList);
            column.appendChild(dismissedList);

            board.appendChild(column);
        });
    }

    renderKanbanBoard();

} catch (error) {
    console.error("Error processing scripts:", error);
}
