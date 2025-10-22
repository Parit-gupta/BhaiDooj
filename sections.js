function createConfetti(x, y) {
  const colors = ['#ff0','#ff6666','#66ff66','#66ccff','#ff66ff'];
  for(let i=0;i<50;i++){
    const conf = document.createElement('div');
    conf.style.position = 'absolute';
    conf.style.width = '6px';
    conf.style.height = '6px';
    conf.style.background = colors[Math.floor(Math.random()*colors.length)];
    conf.style.left = x + 'px';
    conf.style.top = y + 'px';
    conf.style.borderRadius = '50%';
    conf.style.opacity = 1;
    document.body.appendChild(conf);

    conf.animate(
      [
        { transform: `translate(0,0)`, opacity: 1 },
        { transform: `translate(${Math.random()*200-100}px,${Math.random()*200-100}px)`, opacity: 0 }
      ],
      { duration: 1000 + Math.random()*500, easing: 'ease-out' }
    );

    setTimeout(() => conf.remove(), 1500);
  }
}

document.getElementById('wordsBox').addEventListener('click', e => {
  createConfetti(e.clientX, e.clientY);
  // Optional: show a temporary message div instead of alert
  const msg = document.createElement('div');
  msg.textContent = "Here are my heartfelt words to you! 💛";
  msg.className = "temp-msg";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
});

document.getElementById('galleryBox').addEventListener('click', e => {
  createConfetti(e.clientX, e.clientY);
  window.open("gallery.html", "_blank"); // open gallery in new tab
});
