/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: PRINCE DANIEL
 * Matric No: 2025/C/CYB/1333 | Degree: B.Sc. Cybersecurity
 * File: js/projects.js - Project Showcase Filtering & Interactive Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Category Filter
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Demo Modal System
  const demoBtns = document.querySelectorAll('.btn-project-demo');
  const demoModal = document.getElementById('projectDemoModal');
  const closeDemoModal = document.getElementById('closeDemoModal');

  if (closeDemoModal && demoModal) {
    closeDemoModal.addEventListener('click', () => {
      demoModal.style.display = 'none';
    });
  }

  demoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Project Demonstration';
      const tech = btn.getAttribute('data-tech') || 'Web & Mobile';
      const desc = btn.getAttribute('data-desc') || 'Project interactive simulation.';

      const titleEl = document.getElementById('demoModalTitle');
      const techEl = document.getElementById('demoModalTech');
      const descEl = document.getElementById('demoModalDesc');

      if (titleEl) titleEl.textContent = title;
      if (techEl) techEl.textContent = tech;
      if (descEl) descEl.textContent = desc;

      if (demoModal) demoModal.style.display = 'flex';
    });
  });
});
