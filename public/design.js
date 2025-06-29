const canvas = document.getElementById('design-canvas');
const ctx = canvas.getContext('2d');
const heroDesign = document.getElementById('hero-design');

function resizeCanvas() {
  const rect = heroDesign.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  // Set actual canvas size accounting for DPR
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // Set CSS display size
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';

  // Scale drawing context to match DPR
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
  ctx.scale(dpr, dpr);

  // Drawing styles
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
});


