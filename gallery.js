const imageFolder = "pics/";
const imageFiles = [
  "IMG-20251021-WA0059.jpg",
  "IMG-20251021-WA0060.jpg",
  "IMG-20251021-WA0061.jpg",
  "IMG-20251021-WA0062.jpg",
  "IMG-20251021-WA0063.jpg",
  "IMG-20251021-WA0064.jpg",
  "IMG-20251021-WA0065.jpg",
  "IMG-20251021-WA0066.jpg",
  "IMG-20251021-WA0067.jpg",
  "IMG-20251021-WA0068.jpg",
  "WhatsApp Image 2025-10-21 at 14.14.17_d544365b.jpg",
  "WhatsApp Image 2025-10-21 at 14.14.17_e0e769d8.jpg"
];

// Split images into 4 quadrants
const quadrants = [
  imageFiles.slice(0, 3),
  imageFiles.slice(3, 6),
  imageFiles.slice(6, 9),
  imageFiles.slice(9, 12)
];

const animationClasses = ["fadeShow", "slideShow", "rotateShow", "zoomShow"];

quadrants.forEach((images, i) => {
  const quad = document.getElementById(`quad${i + 1}`);
  
  // Create only one image element per quadrant
  const img = document.createElement("img");
  img.src = `${imageFolder}${images[0]}`; // initial image
  img.classList.add(animationClasses[i]);
  quad.appendChild(img);

  let current = 1; // next image index

  function showNextImage() {
    // Remove animation class to restart it
    img.classList.remove(animationClasses[i]);
    
    // Small delay to allow animation reset
    setTimeout(() => {
      img.src = `${imageFolder}${images[current]}`;
      img.classList.add(animationClasses[i]);
    }, 50);

    current = (current + 1) % images.length;
  }

  // Offset timing slightly between quadrants
  const delay = i * 800;
  setTimeout(() => {
    setInterval(showNextImage, 3500);
  }, delay);
});
