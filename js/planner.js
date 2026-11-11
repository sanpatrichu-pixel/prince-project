/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: PRINCE DANIEL
 * Matric No: 2025/C/CYB/1333 | Degree: B.Sc. Cybersecurity
 * File: js/planner.js - Academic Task Planner Engine
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'miva_tasks_prince_daniel';

  // Sample tasks preloaded for Prince Daniel's 100L registered coursework
  const DEFAULT_TASKS = [
    {
      id: 'task-1',
      title: 'Complete COS 106 Practical Term Assessment Website & Report',
      course: 'CSC 106',
      dueDate: '2026-11-15',
      priority: 'high',
      completed: true,
      createdAt: Date.now() - 86400000
    },
    {
      id: 'task-2',
      title: 'Design Wireframes & State Management Architecture in Flutter',
      course: 'MIVA-COS 111',
      dueDate: '2026-11-18',
      priority: 'high',
      completed: false,
      createdAt: Date.now() - 43200000
    },
    {
      id: 'task-3',
      title: 'Complete COS 102 Algorithm Flowcharts & Pseudocode Exercises',
      course: 'COS 102',
      dueDate: '2026-11-20',
      priority: 'medium',
      completed: false,
      createdAt: Date.now() - 21600000
    },
    {
      id: 'task-4',
      title: 'Practice MTH 102 Matrix Operations & Linear System Equations',
      course: 'MTH 102',
      dueDate: '2026-11-22',
      priority: 'low',
      completed: false,
      createdAt: Date.now()
    }
  ];

  let tasks = [];
  let currentFilter = 'all';

  document.addEventListener('DOMContentLoaded', () => {
    initPlanner();
  });

  function initPlanner() {
    loadTasks();
    setupEventListeners();
    renderTasks();
  }

  function loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        tasks = JSON.parse(stored);
      } else {
        tasks = [...DEFAULT_TASKS];
        saveTasks();
      }
    } catch (e) {
      console.error('Failed to parse tasks from localStorage', e);
      tasks = [...DEFAULT_TASKS];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks to localStorage', e);
    }
  }

  function setupEventListeners() {
    const form = document.getElementById('taskForm');
    if (form) {
      form.addEventListener('submit', handleAddTask);
    }

    // Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        renderTasks();
      });
    });

    // Reset Tasks Button
    const resetBtn = document.getElementById('resetTasksBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset planner back to Prince Daniel\'s default academic tasks?')) {
          tasks = [...DEFAULT_TASKS];
          saveTasks();
          renderTasks();
          if (window.showToast) window.showToast('Tasks restored to defaults', 'info');
        }
      });
    }
  }

  function handleAddTask(e) {
    e.preventDefault();

    const titleInput = document.getElementById('taskTitle');
    const courseSelect = document.getElementById('taskCourse');
    const dateInput = document.getElementById('taskDueDate');
    const prioritySelect = document.getElementById('taskPriority');

    const title = titleInput ? titleInput.value.trim() : '';
    const course = courseSelect ? courseSelect.value : '';
    const dueDate = dateInput ? dateInput.value : '';
    const priority = prioritySelect ? prioritySelect.value : 'medium';

    let hasError = false;

    if (!title) {
      titleInput.classList.add('is-invalid');
      hasError = true;
    } else {
      titleInput.classList.remove('is-invalid');
    }

    if (!course) {
      courseSelect.classList.add('is-invalid');
      hasError = true;
    } else {
      courseSelect.classList.remove('is-invalid');
    }

    if (!dueDate) {
      dateInput.classList.add('is-invalid');
      hasError = true;
    } else {
      dateInput.classList.remove('is-invalid');
    }

    if (hasError) return;

    const newTask = {
      id: 'task-' + Date.now(),
      title: title,
      course: course,
      dueDate: dueDate,
      priority: priority,
      completed: false,
      createdAt: Date.now()
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();

    // Reset Form
    e.target.reset();
    if (window.showToast) {
      window.showToast('Academic Milestone Added! 🚀', 'success');
    }
  }

  function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
      if (window.showToast) {
        window.showToast(task.completed ? 'Milestone Completed! 🎉' : 'Milestone Reopened', 'info');
      }
    }
  }

  function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this academic task?')) {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      renderTasks();
      if (window.showToast) {
        window.showToast('Task removed from academic planner', 'danger');
      }
    }
  }

  function renderTasks() {
    const container = document.getElementById('taskListContainer');
    if (!container) return;

    updateMetrics();

    let filtered = tasks;
    if (currentFilter === 'pending') {
      filtered = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
      filtered = tasks.filter(t => t.completed);
    }

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:32px 16px; background:var(--bg-card); border:1px dashed var(--border-light); border-radius:var(--radius-md);">
          <div style="font-size:32px; margin-bottom:8px;">📋</div>
          <h4 style="font-size:16px; font-weight:700;">No Tasks Found</h4>
          <p style="font-size:13px; color:var(--text-subtle);">There are currently no ${currentFilter} academic milestones scheduled.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(task => {
      const item = document.createElement('div');
      item.className = `task-item ${task.completed ? 'completed' : ''}`;
      item.id = task.id;

      const priorityClass = `task-priority-${task.priority.toLowerCase()}`;
      const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

      item.innerHTML = `
        <div class="task-left">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task completed">
          <div class="task-details">
            <span class="task-title">${escapeHTML(task.title)}</span>
            <div class="task-meta">
              <span class="task-course-badge">${escapeHTML(task.course)}</span>
              <span>📅 Target: ${task.dueDate}</span>
              <span class="${priorityClass}">● ${priorityLabel} Priority</span>
            </div>
          </div>
        </div>
        <button type="button" class="task-delete-btn" title="Delete Task">🗑️</button>
      `;

      // Event Listeners
      const chk = item.querySelector('.task-checkbox');
      chk.addEventListener('change', () => toggleTaskComplete(task.id));

      const del = item.querySelector('.task-delete-btn');
      del.addEventListener('click', () => deleteTask(task.id));

      container.appendChild(item);
    });
  }

  function updateMetrics() {
    const totalEl = document.getElementById('totalTasksCount');
    const compEl = document.getElementById('completedTasksCount');
    const pendEl = document.getElementById('pendingTasksCount');
    const fillEl = document.getElementById('progressFill');
    const percentEl = document.getElementById('progressPercent');

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (totalEl) totalEl.textContent = total;
    if (compEl) compEl.textContent = completed;
    if (pendEl) pendEl.textContent = pending;
    if (fillEl) fillEl.style.width = percent + '%';
    if (percentEl) percentEl.textContent = percent + '%';
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
})();
