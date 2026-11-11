/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: PRINCE DANIEL
 * Matric No: 2025/C/CYB/1333 | Degree: B.Sc. Cybersecurity
 * File: js/main.js - Global Site Interactions & Theme Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Switching (Dark / Light) with LocalStorage
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('prince_portfolio_theme') || 'light';

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('prince_portfolio_theme', isDark ? 'dark' : 'light');
      window.showToast(isDark ? 'Dark Mode Enabled 🌙' : 'Light Mode Enabled ☀️', 'info');
    });
  }

  // Toast System
  window.showToast = function(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  // Skill Bar Animation Observer
  const skillBars = document.querySelectorAll('.skill-progress-fill');
  if (skillBars.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.getAttribute('data-level') || '75%';
          entry.target.style.width = targetWidth;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => observer.observe(bar));
  } else {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-level') || '75%';
    });
  }
});
