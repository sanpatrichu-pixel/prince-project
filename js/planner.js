/**
 * COS 106: Introduction to Web Technologies - Practical Term Project
 * Student: PRINCE DANIEL | Matric: 2025/C/CYB/1333
 * Department of Cybersecurity | MIVA Open University
 * File: js/planner.js - EduTrack Milestone Management Engine
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'edutrack_prince_2025';

  // Seed tasks preloaded for Prince Daniel's registered curriculum
  const SEED_MILESTONES = [
    {
      id: 'mile-1',
      title: 'Submit COS 106 Web Technology Term Project & Report',
      course: 'CSC 106',
      targetDate: '2026-11-15',
      urgency: 'high',
      done: true,
      timestamp: Date.now() - 86400000
    },
    {
      id: 'mile-2',
      title: 'Build UniRide Flutter Cross-Platform Route Architecture',
      course: 'MIVA-COS 111',
      targetDate: '2026-11-18',
      urgency: 'high',
      done: false,
      timestamp: Date.now() - 43200000
    },
    {
      id: 'mile-3',
      title: 'Design DevPulse Student Community Responsive Forum Grid',
      course: 'COS 102',
      targetDate: '2026-11-20',
      urgency: 'medium',
      done: false,
      timestamp: Date.now() - 21600000
    },
    {
      id: 'mile-4',
      title: 'Solve MTH 102 Linear Matrix Transformation Equations',
      course: 'MTH 102',
      targetDate: '2026-11-22',
      urgency: 'low',
      done: false,
      timestamp: Date.now()
    }
  ];

  let milestoneStore = [];
  let activeTab = 'all';

  document.addEventListener('DOMContentLoaded', () => {
    bootMilestoneTracker();
  });

  function bootMilestoneTracker() {
    retrievePersistedMilestones();
    bindTrackerEvents();
    drawMilestoneList();
  }

  function retrievePersistedMilestones() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (serialized) {
        milestoneStore = JSON.parse(serialized);
      } else {
        milestoneStore = [...SEED_MILESTONES];
        persistMilestones();
      }
    } catch (err) {
      console.warn('LocalStorage retrieval fallback active', err);
      milestoneStore = [...SEED_MILESTONES];
    }
  }

  function persistMilestones() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(milestoneStore));
    } catch (err) {
      console.error('Storage write fault', err);
    }
  }

  function bindTrackerEvents() {
    const entryForm = document.getElementById('milestoneEntryForm');
    if (entryForm) {
      entryForm.addEventListener('submit', createMilestone);
    }

    const tabButtons = document.querySelectorAll('.pd-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.getAttribute('data-tab') || 'all';
        drawMilestoneList();
      });
    });

    const resetTrigger = document.getElementById('restoreDefaultsBtn');
    if (resetTrigger) {
      resetTrigger.addEventListener('click', () => {
        if (confirm('Restore Prince Daniel\'s default academic milestones?')) {
          milestoneStore = [...SEED_MILESTONES];
          persistMilestones();
          drawMilestoneList();
          if (window.displayToast) window.displayToast('Milestones reset to original syllabus', 'info');
        }
      });
    }
  }

  function createMilestone(e) {
    e.preventDefault();

    const titleBox = document.getElementById('milestoneTitle');
    const courseBox = document.getElementById('milestoneCourse');
    const dateBox = document.getElementById('milestoneDueDate');
    const urgencyBox = document.getElementById('milestoneUrgency');

    const titleVal = titleBox ? titleBox.value.trim() : '';
    const courseVal = courseBox ? courseBox.value : '';
    const dateVal = dateBox ? dateBox.value : '';
    const urgencyVal = urgencyBox ? urgencyBox.value : 'medium';

    let validationFailed = false;

    if (!titleVal) {
      titleBox.classList.add('is-invalid');
      validationFailed = true;
    } else {
      titleBox.classList.remove('is-invalid');
    }

    if (!courseVal) {
      courseBox.classList.add('is-invalid');
      validationFailed = true;
    } else {
      courseBox.classList.remove('is-invalid');
    }

    if (!dateVal) {
      dateBox.classList.add('is-invalid');
      validationFailed = true;
    } else {
      dateBox.classList.remove('is-invalid');
    }

    if (validationFailed) return;

    const record = {
      id: 'mile-' + Date.now(),
      title: titleVal,
      course: courseVal,
      targetDate: dateVal,
      urgency: urgencyVal,
      done: false,
      timestamp: Date.now()
    };

    milestoneStore.unshift(record);
    persistMilestones();
    drawMilestoneList();

    e.target.reset();
    if (window.displayToast) {
      window.displayToast('Academic milestone scheduled! 🎯', 'success');
    }
  }

  function toggleMilestoneStatus(recordId) {
    const target = milestoneStore.find(m => m.id === recordId);
    if (target) {
      target.done = !target.done;
      persistMilestones();
      drawMilestoneList();
      if (window.displayToast) {
        window.displayToast(target.done ? 'Milestone achieved! 🏆' : 'Milestone reopened', 'info');
      }
    }
  }

  function removeMilestone(recordId) {
    if (confirm('Are you sure you want to delete this scheduled milestone?')) {
      milestoneStore = milestoneStore.filter(m => m.id !== recordId);
      persistMilestones();
      drawMilestoneList();
      if (window.displayToast) {
        window.displayToast('Milestone removed from schedule', 'danger');
      }
    }
  }

  function drawMilestoneList() {
    const container = document.getElementById('milestoneRowsContainer');
    if (!container) return;

    refreshAnalytics();

    let viewSet = milestoneStore;
    if (activeTab === 'pending') {
      viewSet = milestoneStore.filter(m => !m.done);
    } else if (activeTab === 'completed') {
      viewSet = milestoneStore.filter(m => m.done);
    }

    container.innerHTML = '';

    if (viewSet.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 16px; background:var(--pd-card-bg); border:1px dashed var(--pd-border); border-radius:var(--pd-radius-md);">
          <div style="font-size:28px; margin-bottom:6px;">📌</div>
          <h4 style="font-size:15px; font-weight:700; color:var(--pd-text-head);">No Milestones Found</h4>
          <p style="font-size:13px; color:var(--pd-text-subtle);">There are no ${activeTab} milestones recorded in your schedule.</p>
        </div>
      `;
      return;
    }

    viewSet.forEach(record => {
      const row = document.createElement('div');
      row.className = `pd-task-row ${record.done ? 'completed' : ''}`;
      row.id = record.id;

      const priorityLabel = record.urgency.charAt(0).toUpperCase() + record.urgency.slice(1);
      let urgencyColor = '#2563EB';
      if (record.urgency === 'high') urgencyColor = '#DC2626';
      if (record.urgency === 'medium') urgencyColor = '#D97706';

      row.innerHTML = `
        <div class="pd-row-left">
          <input type="checkbox" class="pd-task-check" ${record.done ? 'checked' : ''} aria-label="Toggle completion">
          <div>
            <div class="pd-task-title">${escapeStr(record.title)}</div>
            <div class="pd-task-meta">
              <span class="pd-task-badge">${escapeStr(record.course)}</span>
              <span>📅 Target: ${record.targetDate}</span>
              <span style="color:${urgencyColor}; font-weight:700;">● ${priorityLabel} Urgency</span>
            </div>
          </div>
        </div>
        <button type="button" class="pd-del-btn" title="Delete Milestone">🗑️</button>
      `;

      const checkEl = row.querySelector('.pd-task-check');
      checkEl.addEventListener('change', () => toggleMilestoneStatus(record.id));

      const delBtn = row.querySelector('.pd-del-btn');
      delBtn.addEventListener('click', () => removeMilestone(record.id));

      container.appendChild(row);
    });
  }

  function refreshAnalytics() {
    const totalCountEl = document.getElementById('statTotalCount');
    const compCountEl = document.getElementById('statCompletedCount');
    const pendCountEl = document.getElementById('statPendingCount');
    const fillMeterEl = document.getElementById('analyticsProgressMeter');
    const percentLabelEl = document.getElementById('analyticsPercentLabel');

    const total = milestoneStore.length;
    const completed = milestoneStore.filter(m => m.done).length;
    const pending = total - completed;
    const ratio = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (totalCountEl) totalCountEl.textContent = total;
    if (compCountEl) compCountEl.textContent = completed;
    if (pendCountEl) pendCountEl.textContent = pending;
    if (fillMeterEl) fillMeterEl.style.width = ratio + '%';
    if (percentLabelEl) percentLabelEl.textContent = ratio + '%';
  }

  function escapeStr(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[c] || c));
  }
})();
