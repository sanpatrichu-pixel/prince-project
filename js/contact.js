/**
 * COS 106: Introduction to Web Technologies - Practical Term Project
 * Student: PRINCE DANIEL | Matric: 2025/C/CYB/1333
 * Department of Cybersecurity | MIVA Open University
 * File: js/contact.js - Asynchronous Client-Side Input Auditing
 */

document.addEventListener('DOMContentLoaded', () => {
  const portalForm = document.getElementById('inquiryForm');
  if (!portalForm) return;

  const nameField = document.getElementById('senderFullName');
  const emailField = document.getElementById('senderEmailAddress');
  const phoneField = document.getElementById('senderPhoneNumber');
  const messageField = document.getElementById('senderMessageBody');
  const confirmModal = document.getElementById('dispatchModal');
  const dismissModalBtn = document.getElementById('dismissModalTrigger');

  // Real-time input listeners
  [nameField, emailField, phoneField, messageField].forEach(element => {
    if (element) {
      element.addEventListener('input', () => verifyContactInput(element));
      element.addEventListener('blur', () => verifyContactInput(element));
    }
  });

  if (dismissModalBtn && confirmModal) {
    dismissModalBtn.addEventListener('click', () => {
      confirmModal.style.display = 'none';
    });
  }

  portalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const okName = verifyContactInput(nameField);
    const okEmail = verifyContactInput(emailField);
    const okPhone = verifyContactInput(phoneField);
    const okMsg = verifyContactInput(messageField);

    if (okName && okEmail && okPhone && okMsg) {
      const sender = nameField.value.trim();
      const outputName = document.getElementById('modalContactName');
      if (outputName) outputName.textContent = sender;
      if (confirmModal) confirmModal.style.display = 'flex';

      portalForm.reset();
      resetAllErrors();

      if (window.displayToast) {
        window.displayToast('Inquiry delivered successfully to Prince Daniel! 📨', 'success');
      }
    } else {
      const firstFault = portalForm.querySelector('.is-invalid');
      if (firstFault) firstFault.focus();
      if (window.displayToast) {
        window.displayToast('Please review the highlighted input errors.', 'danger');
      }
    }
  });

  function verifyContactInput(inputEl) {
    if (!inputEl) return false;
    const value = inputEl.value.trim();
    const errorEl = inputEl.parentElement.querySelector('.pd-err-msg');

    // 1. Name Check (Non-empty & min 2 chars)
    if (inputEl.id === 'senderFullName') {
      if (value.length < 2) {
        flagInputError(inputEl, errorEl, 'Full name is mandatory and cannot be left blank.');
        return false;
      }
      clearInputError(inputEl, errorEl);
      return true;
    }

    // 2. Email Check (RFC-Compliant Regex)
    if (inputEl.id === 'senderEmailAddress') {
      if (!value) {
        flagInputError(inputEl, errorEl, 'Email address is required.');
        return false;
      }
      const rfcRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!rfcRegex.test(value)) {
        flagInputError(inputEl, errorEl, 'Invalid email structure (e.g., student@miva.edu.ng).');
        return false;
      }
      clearInputError(inputEl, errorEl);
      return true;
    }

    // 3. Phone Check (Strictly Digits Only: ^[0-9]+$)
    if (inputEl.id === 'senderPhoneNumber') {
      if (!value) {
        flagInputError(inputEl, errorEl, 'Phone number is required.');
        return false;
      }
      const digitsOnlyPattern = /^[0-9]+$/;
      if (!digitsOnlyPattern.test(value)) {
        flagInputError(inputEl, errorEl, 'Phone number must contain digits only (no alphabetic or special characters).');
        return false;
      }
      if (value.length < 8 || value.length > 15) {
        flagInputError(inputEl, errorEl, 'Phone number must be between 8 and 15 numerical digits.');
        return false;
      }
      clearInputError(inputEl, errorEl);
      return true;
    }

    // 4. Message Check (Non-empty)
    if (inputEl.id === 'senderMessageBody') {
      if (value.length < 6) {
        flagInputError(inputEl, errorEl, 'Message body must be at least 6 characters in length.');
        return false;
      }
      clearInputError(inputEl, errorEl);
      return true;
    }

    return true;
  }

  function flagInputError(inputEl, errEl, text) {
    inputEl.classList.add('is-invalid');
    if (errEl) {
      errEl.textContent = text;
      errEl.style.display = 'block';
    }
  }

  function clearInputError(inputEl, errEl) {
    inputEl.classList.remove('is-invalid');
    if (errEl) {
      errEl.textContent = '';
      errEl.style.display = 'none';
    }
  }

  function resetAllErrors() {
    portalForm.querySelectorAll('.pd-input').forEach(el => el.classList.remove('is-invalid'));
    portalForm.querySelectorAll('.pd-err-msg').forEach(el => {
      el.textContent = '';
      el.style.display = 'none';
    });
  }
});
