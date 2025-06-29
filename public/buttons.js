document.addEventListener("DOMContentLoaded", () => {
  const modes = ["nn", "sleep", "design", "repeat"];
  const info = document.querySelector(".info");

  const showMode = (mode) => {
    // Switch hero views
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

    // Toggle .dark-text on .info for sleep and design
    if (mode === "sleep" || mode === "design") {
      info.classList.add("dark-text");
    } else {
      info.classList.remove("dark-text");
    }
  };

  // Default mode is 'nn'
  showMode("nn");

  // Button handlers
  modes.forEach(mode => {
    const btn = document.getElementById(`${mode}-btn`);
    if (btn) {
      btn.addEventListener("click", () => showMode(mode));
    }
  });
});
