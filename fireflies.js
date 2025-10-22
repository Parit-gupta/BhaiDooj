const sky = document.querySelector('.night-sky');
const totalFireflies = 25;

// Create fireflies
for (let i = 0; i < totalFireflies; i++) {
  const f = document.createElement('div');
  f.classList.add('firefly');
  sky.appendChild(f);

  f.style.top = `${Math.random() * 100}vh`;
  f.style.left = `${Math.random() * 100}vw`;
  f.style.setProperty('--size-multiplier', Math.random() * 1.5 + 0.5);

  animateFirefly(f);
}

// Extra twinkling stars
const totalStars = 60;
for (let i = 0; i < totalStars; i++) {
  const star = document.createElement('div');
  star.style.position = 'absolute';
  star.style.width = '2px';
  star.style.height = '2px';
  star.style.background = 'white';
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.opacity = Math.random();
  star.style.borderRadius = '50%';
  star.style.animation = `twinkle ${3 + Math.random() * 3}s linear infinite alternate`;
  sky.appendChild(star);
}

function animateFirefly(firefly) {
  const duration = 5000 + Math.random() * 5000;
  const x = Math.random() * 20 - 10;
  const y = Math.random() * 20 - 10;

  firefly.animate(
    [
      { transform: `translate(0,0) scale(1)`, opacity: 0.6 },
      { transform: `translate(${x}vw, ${y}vh) scale(1.2)`, opacity: 1 }
    ],
    {
      duration: duration,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    }
  );
}

// Shooting stars
function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  sky.appendChild(star);

  const startLeft = Math.random() * 100;
  star.style.left = `${startLeft}vw`;
  star.style.top = `${Math.random() * 40}vh`;

  star.animate(
    [
      { transform: 'translate(0,0)', opacity: 1 },
      { transform: 'translate(100px,300px)', opacity: 0 }
    ],
    { duration: 1500, easing: 'ease-out' }
  );

  setTimeout(() => star.remove(), 1500);
}

setInterval(createShootingStar, 4000 + Math.random() * 3000);
