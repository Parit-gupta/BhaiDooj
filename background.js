document.addEventListener("mousemove", e => {
  const x = e.clientX / window.innerWidth * 100 + "%";
  const y = e.clientY / window.innerHeight * 100 + "%";
  document.body.style.setProperty("--x1", x);
  document.body.style.setProperty("--y1", y);
  document.body.style.setProperty("--x2", `calc(${x} + 20%)`);
  document.body.style.setProperty("--y2", `calc(${y} + 10%)`);
  document.body.style.setProperty("--x3", `calc(${x} - 15%)`);
  document.body.style.setProperty("--y3", `calc(${y} - 20%)`);
});
