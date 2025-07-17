// Handles scroll-triggered fade/slide, parallax, and hover effects

document.addEventListener('DOMContentLoaded', function () {
  // Scroll Animation (IntersectionObserver)
  const items = document.querySelectorAll('.scroll-animate');
  const observer = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting)
        entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  items.forEach(el => observer.observe(el));

  // Parallax backgrounds (simple)
  function parallax() {
    document.querySelectorAll('.parallax-bg').forEach(el => {
      const speed = 0.4;
      let offset = window.scrollY * speed;
      el.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    });
  }
  window.addEventListener('scroll', parallax, { passive: true });

  // Hover effect (underline)
  document.querySelectorAll('a, .cta-btn, .secondary-btn').forEach(el => {
    el.addEventListener('mouseenter', () => el.style.opacity = "0.85");
    el.addEventListener('mouseleave', () => el.style.opacity = "1");
  });
});