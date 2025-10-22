// Add this new file as "glitch-title.js" and include it in gallery.html

const originalText = "📸 Good Pictures I got 📸";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?";

function playGlitchTitle() {
  const titleEl = document.querySelector('.title');
  if (!titleEl) return;
  
  titleEl.classList.add('glitch-animating');
  
  let iterations = 0;
  const maxIterations = 30;
  
  const interval = setInterval(() => {
    titleEl.textContent = originalText
      .split('')
      .map((char, index) => {
        if (char === ' ' || char === '📸') return char;
        if (index < iterations) return originalText[index];
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');
    
    iterations += 1;
    
    if (iterations > maxIterations) {
      clearInterval(interval);
      titleEl.textContent = originalText;
      titleEl.classList.remove('glitch-animating');
      titleEl.classList.add('glitch-revealed');
    }
  }, 50);
}

// Auto-play when title becomes visible
window.addEventListener('load', () => {
  setTimeout(playGlitchTitle, 5200); // Starts after intro (5s) + small delay
});