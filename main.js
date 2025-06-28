// === AOS Animation ===
AOS.init({ duration: 800 });

// === Globals ===
let knot;
let material;

// === Theme, Particles, Typed, 3D ===
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // === Check saved theme or default to dark ===
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = !savedTheme || savedTheme === "dark";
  if (!savedTheme || savedTheme === "light") {
    document.body.classList.add(savedTheme === "light" ? "light" : "");
  }
  const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
  themeToggle.textContent = currentTheme === "light" ? "☀️" : "🌙";

  // === Init particles & knot color based on theme
  initParticles(currentTheme);
  if (material) {
    material.color.set(currentTheme === "light" ? 0x778899 : 0x00f0ff);
  }

  // === Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "light" ? "☀️" : "🌙";

    // Update particles
    document.getElementById("particles-js").innerHTML = "";
    initParticles(theme);

    // Update 3D color
    if (material) {
      material.color.set(theme === "light" ? 0x778899 : 0x00f0ff); // LightSlateGray vs Cyan
    }
  });

  // === Typed.js
  new Typed("#typed-text", {
    strings: ["Frontend Developer", "Full Stack Developer", "Problem Solver"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: false
  });

  // === Mobile nav toggle
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
});


// === 3D TorusKnot Background ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.z = 40;

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
material = new THREE.MeshStandardMaterial({
  color: 0x00f0ff,
  metalness: 0.7,
  roughness: 0.2
});

knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Lights
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(20, 20, 20);
scene.add(light1);

const light2 = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(light2);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Scroll movement
let scrollOffsetY = 0;
window.addEventListener("scroll", () => {
  scrollOffsetY = window.scrollY || window.pageYOffset;
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.01;
  knot.rotation.y += 0.01;
  knot.position.y = -scrollOffsetY * 0.01;
  renderer.render(scene, camera);
}
animate();


// === Particles.js Setup ===
function initParticles(theme = "dark") {
  const particleColor = theme === "light" ? "#778899" : "#00f0ff";
  const lineColor = theme === "light" ? "#778899" : "#00f0ff";

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 60,
        density: { enable: true, value_area: 800 }
      },
      color: { value: particleColor },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" }
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: lineColor,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}
