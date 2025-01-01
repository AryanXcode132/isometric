// Select all cards
const cards = document.querySelectorAll('.card');

// Clamp values within a range
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// Throttle function to limit event frequency
const throttle = (func, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

// Check if the user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
  // Add mousemove event for tilt effect
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;

    cards.forEach((card) => {
      const rotateX = clamp(((e.clientY - centerY) / innerHeight) * 10, -10, 10);
      const rotateY = clamp(((e.clientX - centerX) / innerWidth) * -10, -10, 10);

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const resetTransform = () => {
    cards.forEach((card) => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  };

  document.addEventListener('mousemove', throttle(handleMouseMove, 50));
  document.addEventListener('mouseout', resetTransform);
} else {
  console.log('Tilt effect disabled due to reduced motion preference.');
}
