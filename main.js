// === AOS Animation ===
if (typeof AOS !== "undefined") {
  AOS.init({ duration: 800 });
}

// === Theme, Particles, Typed ===
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const particlesContainer = document.getElementById("particles-js");
  const typedEl = document.getElementById("typed-text");

  // === Check saved theme or default to dark ===
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
  if (themeToggle) themeToggle.textContent = currentTheme === "light" ? "☀️" : "🌙";

  // === Init particles based on theme (only if library + container exist)
  if (typeof particlesJS !== "undefined" && particlesContainer) {
    initParticles(currentTheme);
  }

  // === Theme toggle (only if toggle exists) ===
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const theme = document.body.classList.contains("light") ? "light" : "dark";
      localStorage.setItem("theme", theme);
      themeToggle.textContent = theme === "light" ? "☀️" : "🌙";

      // Update particles
      if (particlesContainer) {
        particlesContainer.innerHTML = "";
        if (typeof particlesJS !== "undefined") initParticles(theme);
      }
    });
  }

  // === Typed.js (only if lib + element exist) ===
  if (typeof Typed !== "undefined" && typedEl) {
    new Typed("#typed-text", {
      strings: ["Frontend Developer", "Full Stack Developer", "Problem Solver"],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: false
    });
  }

  // === Mobile nav toggle ===
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Use ID-based selector to match getElementById above
    document.querySelectorAll("#nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});

// === Particles.js Setup (Tech Network Style) ===
function initParticles(theme = "dark") {
  const particleColor = theme === "light" ? "#0a84ff" : "#00ffcc"; // Neon Blue / Cyan
  const lineColor = theme === "light" ? "#0a84ff" : "#00ffcc";

  if (typeof particlesJS === "undefined") return;

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 50,
        density: { enable: true, value_area: 800 }
      },
      color: { value: particleColor },
      shape: {
        type: "polygon",
        polygon: { nb_sides: 6 }
      },
      opacity: {
        value: 0.6,
        random: false
      },
      size: {
        value: 4,
        random: true,
        anim: { enable: true, speed: 3, size_min: 1 }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: lineColor,
        opacity: 0.4,
        width: 2
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        attract: { enable: true, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 0.8 } },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}
