// Theme toggle with localStorage persistence
(function () {
  const STORAGE_KEY = 'site-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    const btn = document.querySelector('#theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  function currentTheme() {
    return localStorage.getItem(STORAGE_KEY) || (prefersDark.matches ? 'dark' : 'light');
  }

  function toggleTheme() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Initialize
  applyTheme(currentTheme());
  prefersDark.addEventListener('change', () => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(prefersDark.matches ? 'dark' : 'light');
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('#theme-toggle');
    if (target) {
      e.preventDefault();
      toggleTheme();
    }
  });
})();

// Smooth scroll for same-page anchors
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
