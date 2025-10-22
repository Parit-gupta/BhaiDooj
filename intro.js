window.addEventListener("load", () => {
  console.log("Script loaded");
  
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) {
    console.error("Canvas not found!");
    return;
  }
  
  const ctx = canvas.getContext("2d");

  // Fullscreen canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  console.log("Canvas size:", canvas.width, "x", canvas.height);

  const particles = [];
  const totalParticles = 800;

  // Offscreen canvas to draw M
  const offCanvas = document.createElement("canvas");
  const offCtx = offCanvas.getContext("2d");
  offCanvas.width = canvas.width;
  offCanvas.height = canvas.height;

  // Calculate responsive font size (35% of smaller dimension for better fit)
  const fontSize = Math.min(canvas.width, canvas.height) * 0.35;
  console.log("Font size:", fontSize);

  // Center the M
  offCtx.font = `bold ${fontSize}px 'Playfair Display', serif`;
  offCtx.textAlign = "center";
  offCtx.textBaseline = "middle";
  offCtx.fillStyle = "white";

  // Draw M exactly at canvas center
  offCtx.fillText("M", offCanvas.width / 2, offCanvas.height / 2);

  // Get pixels of M
  const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
  const pixels = [];

  // Sample pixels with adaptive rate
  const sampleRate = Math.max(4, Math.floor(fontSize / 50));
  console.log("Sample rate:", sampleRate);
  
  for (let y = 0; y < offCanvas.height; y += sampleRate) {
    for (let x = 0; x < offCanvas.width; x += sampleRate) {
      const alpha = imageData.data[(y * offCanvas.width + x) * 4 + 3];
      if (alpha > 128) pixels.push({ x, y });
    }
  }
  
  console.log("Pixels found:", pixels.length);

  if (pixels.length === 0) {
    console.error("No pixels found for M!");
    return;
  }

  // Create particles with random start positions
  const particleCount = Math.min(totalParticles, pixels.length);
  console.log("Creating", particleCount, "particles");
  
  for (let i = 0; i < particleCount; i++) {
    const target = pixels[Math.floor(Math.random() * pixels.length)];
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 1,
      targetX: target.x,
      targetY: target.y,
      color: "rgba(0,255,255,0.9)"
    });
  }

  // ===== WATER BUBBLES (INCREASED COUNT) =====
  const bubbles = [];
  const bubbleCount = 60; // Increased from 25 to 60

  // Create bubbles
  for (let i = 0; i < bubbleCount; i++) {
    bubbles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height, // Start from random positions
      radius: Math.random() * 20 + 3, // Varied sizes (3-23px)
      speed: Math.random() * 0.8 + 0.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      opacity: Math.random() * 0.4 + 0.2
    });
  }

  let showingGallery = false;

  // Animate particles and bubbles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bubbles first (behind particles)
    bubbles.forEach(b => {
      b.y -= b.speed;
      b.wobble += b.wobbleSpeed;
      
      // Reset bubble when it goes off screen
      if (b.y + b.radius < 0) {
        b.y = canvas.height + b.radius;
        b.x = Math.random() * canvas.width;
      }

      const wobbleX = Math.sin(b.wobble) * 4;

      // Bubble outer glow
      ctx.beginPath();
      ctx.arc(b.x + wobbleX, b.y, b.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 200, 255, ${b.opacity * 0.6})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bubble fill
      const gradient = ctx.createRadialGradient(
        b.x + wobbleX - b.radius * 0.3, 
        b.y - b.radius * 0.3, 
        0,
        b.x + wobbleX, 
        b.y, 
        b.radius
      );
      gradient.addColorStop(0, `rgba(200, 240, 255, ${b.opacity * 0.4})`);
      gradient.addColorStop(0.5, `rgba(100, 200, 255, ${b.opacity * 0.2})`);
      gradient.addColorStop(1, `rgba(0, 150, 255, ${b.opacity * 0.1})`);
      
      ctx.fillStyle = gradient;
      ctx.fill();

      // Highlight spot
      ctx.beginPath();
      ctx.arc(
        b.x + wobbleX - b.radius * 0.35, 
        b.y - b.radius * 0.35, 
        b.radius * 0.3, 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.6})`;
      ctx.fill();
    });

    // Draw particles only if not showing gallery
    if (!showingGallery) {
      particles.forEach(p => {
        p.x += (p.targetX - p.x) * 0.06;
        p.y += (p.targetY - p.y) * 0.06;

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
  console.log("Animation started");

  // Fade out intro and show gallery (but keep bubbles)
  setTimeout(() => {
    console.log("Fading out intro");
    showingGallery = true;
    
    canvas.parentElement.style.transition = "opacity 1s ease";
    canvas.parentElement.style.opacity = "0";

    setTimeout(() => {
      // Remove intro container but keep canvas for bubbles
      canvas.parentElement.style.display = "none";
      document.querySelector(".quadrant-grid").style.display = "grid";
      
      // Move canvas to body to keep bubbles visible
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "1";
      canvas.style.opacity = "1";
      document.body.appendChild(canvas);
      
      console.log("Gallery shown with bubbles");
    }, 1000);
  }, 4500);

  // Handle window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});