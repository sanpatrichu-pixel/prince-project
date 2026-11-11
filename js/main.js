/**
 * COS 106: Introduction to Web Technologies - Practical Term Project
 * Student: PRINCE DANIEL | Matric: 2025/C/CYB/1333
 * Department of Cybersecurity | MIVA Open University
 * File: js/main.js - Global Dynamic UI & State Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Manager (Default: Royal Dark Mode, toggleable to Light Mode)
  const themeSwitchBtn = document.getElementById('themeSwitchTrigger');
  const storedTheme = localStorage.getItem('edutrack_theme_mode') || 'dark';

  if (storedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    if (themeSwitchBtn) themeSwitchBtn.textContent = '\uD83C\uDF19';
  } else {
    document.body.classList.add('dark-mode');
    if (themeSwitchBtn) themeSwitchBtn.textContent = '\u2600\uFE0F';
  }

  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeSwitchBtn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
      localStorage.setItem('edutrack_theme_mode', isDark ? 'dark' : 'light');
      if (window.displayToast) {
        window.displayToast(isDark ? 'Royal Dark Theme Activated \uD83C\uDF19' : 'Clean Light Theme Activated \u2600\uFE0F', 'info');
      }
    });
  }

  // Toast Notification Hub
  window.displayToast = function(msg, alertType = 'info') {
    let toastShelf = document.querySelector('.pd-toast-shelf');
    if (!toastShelf) {
      toastShelf = document.createElement('div');
      toastShelf.className = 'pd-toast-shelf';
      toastShelf.style.cssText = 'position:fixed; bottom:75px; right:16px; left:16px; pointer-events:none; z-index:99999; display:flex; flex-direction:column; align-items:flex-end; gap:8px;';
      document.body.appendChild(toastShelf);
    }

    const toastCard = document.createElement('div');
    toastCard.style.cssText = 'background:#0D1E36; color:#FFFFFF; padding:10px 16px; border-radius:6px; font-size:13px; font-weight:700; box-shadow:0 6px 18px rgba(0,0,0,0.45); border:1px solid #1E3A5F; border-left:4px solid #38BDF8; display:flex; align-items:center; gap:8px; max-width:100%; pointer-events:auto; transition:all 0.3s;';
    
    if (alertType === 'success') toastCard.style.borderLeftColor = '#38BDF8';
    if (alertType === 'danger') toastCard.style.borderLeftColor = '#DC2626';

    toastCard.innerHTML = `<span>\u2139\uFE0F</span> <span>${msg}</span>`;
    toastShelf.appendChild(toastCard);

    setTimeout(() => {
      toastCard.style.opacity = '0';
      toastCard.style.transform = 'translateY(10px)';
      setTimeout(() => toastCard.remove(), 300);
    }, 3200);
  };

  // Skill Bar Observer
  const skillMeters = document.querySelectorAll('.pd-skill-fill');
  if (skillMeters.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetCapacity = entry.target.getAttribute('data-capacity') || '75%';
          entry.target.style.width = targetCapacity;
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillMeters.forEach(m => observer.observe(m));
  } else {
    skillMeters.forEach(m => {
      m.style.width = m.getAttribute('data-capacity') || '75%';
    });
  }
});
