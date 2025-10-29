
// Simple fade-in on scroll
function onScrollFade() {
  document.querySelectorAll('.fade').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) el.classList.add('show');
  });
}
window.addEventListener('scroll', onScrollFade);
window.addEventListener('load', onScrollFade);

// Booking form: save to localStorage and show thank-you message
function initBookingForm(formId, msgId) {
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const appt = {
      id: 'appt-'+Date.now(),
      name: form.querySelector('[name=name]').value.trim(),
      phone: form.querySelector('[name=phone]').value.trim(),
      service: form.querySelector('[name=service]').value,
      date: form.querySelector('[name=date]').value,
      time: form.querySelector('[name=time]').value,
      notes: form.querySelector('[name=notes]').value.trim(),
      created: new Date().toISOString()
    };
    const key = 'cubru_appointments_v1';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(appt);
    localStorage.setItem(key, JSON.stringify(arr));
    const msg = document.getElementById(msgId);
    if(msg){ msg.style.color = 'var(--gold)'; msg.textContent = "Thank you for booking with CuBru Aesthetics — we'll contact you shortly!"; msg.scrollIntoView({behavior:'smooth'}); }
    form.reset();
  });
}
