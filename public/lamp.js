const light = document.getElementById("lightBeam");
const string = document.getElementById("string");
const knob = document.getElementById("knob");

let isLampOn = true;
let isDragging = false;
let dragStartY = 0;
let pullDistance = 0;
let defaultLength = 120;
let maxStretch = 100;
let toggleThreshold = 60;

function toggleLamp() {
  isLampOn = !isLampOn;
  light.style.display = isLampOn ? "block" : "none";
}

function updateString(length) {
  string.style.height = `${length}px`;
  knob.style.bottom = "0";
}

function animateReleaseAndToggle() {
  let current = pullDistance;
  let velocity = -current / 4;

  function step() {
    current += velocity;
    velocity *= 0.75;

    updateString(defaultLength + current);

    if (Math.abs(current) > 1) {
      requestAnimationFrame(step);
    } else {
      updateString(defaultLength);
      if (pullDistance > toggleThreshold) toggleLamp();
    }
  }

  step();
}

function handleMouseDown(e) {
  isDragging = true;
  dragStartY = e.clientY;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(e) {
  if (!isDragging) return;

  const dragY = e.clientY - dragStartY;
  pullDistance = Math.min(Math.max(dragY, 0), maxStretch);
  updateString(defaultLength + pullDistance);
}

function handleMouseUp() {
  if (!isDragging) return;
  isDragging = false;

  animateReleaseAndToggle();

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

knob.addEventListener("mousedown", handleMouseDown);

// Initialize with lamp ON
light.style.display = "block";
