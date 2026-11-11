/**
 * COS 106: Introduction to Web Technologies - Practical Term Project
 * Student: PRINCE DANIEL | Matric: 2025/C/CYB/1333
 * Department of Cybersecurity | MIVA Open University
 * File: js/projects.js - Project Showcase Filter & Interactive Sandbox Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Category Filtering
  const filterPills = document.querySelectorAll('.pd-filter-pill');
  const projectCards = document.querySelectorAll('.pd-project-box');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const targetGroup = pill.getAttribute('data-group') || 'all';

      projectCards.forEach(card => {
        const itemGroup = card.getAttribute('data-group') || '';
        if (targetGroup === 'all' || itemGroup === targetGroup) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Interactive Demo Modal
  const demoButtons = document.querySelectorAll('.pd-demo-trigger');
  const modalCover = document.getElementById('sandboxModal');
  const dismissBtn = document.getElementById('closeSandboxTrigger');

  if (dismissBtn && modalCover) {
    dismissBtn.addEventListener('click', () => {
      modalCover.style.display = 'none';
    });
  }

  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const heading = btn.getAttribute('data-name') || 'Project Inspection';
      const stack = btn.getAttribute('data-stack') || 'Mobile & Web';
      const details = btn.getAttribute('data-details') || 'Interactive system simulation.';

      const titleEl = document.getElementById('sandboxTitle');
      const techEl = document.getElementById('sandboxStack');
      const descEl = document.getElementById('sandboxDetails');

      if (titleEl) titleEl.textContent = heading;
      if (techEl) techEl.textContent = stack;
      if (descEl) descEl.textContent = details;

      if (modalCover) modalCover.style.display = 'flex';
    });
  });
});
