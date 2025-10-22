const audio = document.getElementById("bgAudio");
const bgMusic = document.getElementById("bgMusic");
const wishText = document.getElementById("wishText");
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

const message = `On this beautiful night of Bhai Dooj, 
may your life glow brighter than the diyas 🪔
and sparkle like the stars above. ✨ 
You're not just my sister but one of my forever light. 💛`;

let i = 0;
const intervalTime = 40;

startBtn.addEventListener("click", () => {
  // Hide start button
  startScreen.style.display = "none";

  // Play both audios
  audio.play();
  bgMusic.play();

  // Start typewriter animation
  const typeWriterInterval = setInterval(() => {
    wishText.textContent += message.charAt(i);
    i++;
    if (i >= message.length) clearInterval(typeWriterInterval);
  }, intervalTime);
});
