document.addEventListener("DOMContentLoaded", () => {
  const modes = ["nn", "sleep", "design", "repeat"];

  const showMode = (mode) => {
    modes.forEach(m => {
      const el = document.getElementById(`hero-${m}`);
      if (el) {
        el.classList.remove("active");
      }
    });

    const target = document.getElementById(`hero-${mode}`);
    if (target) {
      target.classList.add("active");
    }
  };

  // Default mode is 'nn'
  showMode("nn");

  // Button handlers
  document.getElementById("nn-btn").addEventListener("click", () => showMode("nn"));
  document.getElementById("sleep-btn").addEventListener("click", () => showMode("sleep"));
  document.getElementById("design-btn").addEventListener("click", () => showMode("design"));
  document.getElementById("repeat-btn").addEventListener("click", () => showMode("repeat"));
});
