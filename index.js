// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1) Reveal sections on scroll
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.intersectionRatio > 0.1) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(r => io.observe(r));
  
    // 2) Smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // 3) Handle form submission
    const form = document.getElementById('survey-form');
    const msg  = document.getElementById('form-message');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = new FormData(form);
  
      try {
        // replace URL with your endpoint (see options below)
        const resp = await fetch('https://formspree.io/f/mzzrdpez', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(data)),
          headers: { 'Content-Type': 'application/json' }
        });
        if (!resp.ok) throw new Error(resp.statusText);
        msg.textContent = 'Thanks! We’ve received your preferences.';
        msg.classList.remove('hidden');
        form.reset();
      } catch (err) {
        msg.textContent = 'Oops, something went wrong. Please try again.';
        msg.classList.remove('hidden');
      }
    });
  });
  