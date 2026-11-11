/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: PRINCE DANIEL
 * Matric No: 2025/C/CYB/1333 | Degree: B.Sc. Cybersecurity
 * File: js/contact.js - Client-Side Contact Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const messageInput = document.getElementById('contactMessage');
  const modal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Real-time input listeners
  [nameInput, emailInput, phoneInput, messageInput].forEach(field => {
    if (field) {
      field.addEventListener('input', () => validateSingleField(field));
      field.addEventListener('blur', () => validateSingleField(field));
    }
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateSingleField(nameInput);
    const isEmailValid = validateSingleField(emailInput);
    const isPhoneValid = validateSingleField(phoneInput);
    const isMessageValid = validateSingleField(messageInput);

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      // Success!
      const senderName = nameInput.value.trim();
      if (modal) {
        const senderSpan = document.getElementById('modalSender');
        if (senderSpan) senderSpan.textContent = senderName;
        modal.style.display = 'flex';
      }

      form.reset();
      clearAllValidation();

      if (window.showToast) {
        window.showToast('Message transmitted securely to Prince Daniel! 📩', 'success');
      }
    } else {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      if (window.showToast) {
        window.showToast('Please correct highlighted validation errors.', 'danger');
      }
    }
  });

  function validateSingleField(input) {
    if (!input) return false;
    const val = input.value.trim();
    const errorEl = input.parentElement.querySelector('.error-feedback');

    // 1. Name Check: Non-empty
    if (input.id === 'contactName') {
      if (val.length < 2) {
        setFieldError(input, errorEl, 'Full name is required and must be at least 2 characters.');
        return false;
      }
      clearFieldError(input, errorEl);
      return true;
    }

    // 2. Email Check: RFC-Compliant Regex
    if (input.id === 'contactEmail') {
      if (!val) {
        setFieldError(input, errorEl, 'Email address is required.');
        return false;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(val)) {
        setFieldError(input, 'Please provide a valid email format (e.g., student@miva.edu.ng).');
        return false;
      }
      clearFieldError(input, errorEl);
      return true;
    }

    // 3. Phone Check: Digits Only (/^[0-9]+$/)
    if (input.id === 'contactPhone') {
      if (!val) {
        setFieldError(input, errorEl, 'Phone number is required.');
        return false;
      }
      const digitsRegex = /^[0-9]+$/;
      if (!digitsRegex.test(val)) {
        setFieldError(input, errorEl, 'Phone number must contain digits only (no letters or symbols).');
        return false;
      }
      if (val.length < 8 || val.length > 15) {
        setFieldError(input, errorEl, 'Phone number length must be between 8 and 15 digits.');
        return false;
      }
      clearFieldError(input, errorEl);
      return true;
    }

    // 4. Message Check: Non-empty
    if (input.id === 'contactMessage') {
      if (val.length < 5) {
        setFieldError(input, errorEl, 'Please enter a message of at least 5 characters.');
        return false;
      }
      clearFieldError(input, errorEl);
      return true;
    }

    return true;
  }

  function setFieldError(input, errorEl, msg) {
    input.classList.add('is-invalid');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove('is-invalid');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  function clearAllValidation() {
    form.querySelectorAll('.form-control').forEach(f => f.classList.remove('is-invalid'));
    form.querySelectorAll('.error-feedback').forEach(e => {
      e.textContent = '';
      e.style.display = 'none';
    });
  }
});
