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
let movedDuringTouch = false;
let touchStartTime = 0;

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
  e.preventDefault();
  isDragging = true;
  dragStartY = e.clientY;
  movedDuringTouch = false;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(e) {
  if (!isDragging) return;

  const dragY = e.clientY - dragStartY;
  if (Math.abs(dragY) > 5) movedDuringTouch = true; // mark if moved more than 5px

  pullDistance = Math.min(Math.max(dragY, 0), maxStretch);
  updateString(defaultLength + pullDistance);
}

function handleMouseUp(e) {
  if (!isDragging) return;
  isDragging = false;

  animateReleaseAndToggle();

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

function handleTouchStart(e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    isDragging = true;
    dragStartY = e.touches[0].clientY;
    movedDuringTouch = false;
    touchStartTime = Date.now();
  }
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const dragY = e.touches[0].clientY - dragStartY;
  if (Math.abs(dragY) > 5) movedDuringTouch = true;

  pullDistance = Math.min(Math.max(dragY, 0), maxStretch);
  updateString(defaultLength + pullDistance);
}

function handleTouchEnd(e) {
  if (!isDragging) return;
  isDragging = false;

  const touchDuration = Date.now() - touchStartTime;

  if (!movedDuringTouch && touchDuration < 300) {
    // It's a tap — toggle lamp immediately
    toggleLamp();
    updateString(defaultLength);
  } else {
    // It's a drag release
    animateReleaseAndToggle();
  }
}

knob.addEventListener("mousedown", handleMouseDown);
knob.addEventListener("touchstart", handleTouchStart, { passive: false });
knob.addEventListener("touchmove", handleTouchMove, { passive: false });
knob.addEventListener("touchend", handleTouchEnd);

light.style.display = "block";
