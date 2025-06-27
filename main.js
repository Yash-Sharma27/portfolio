// === AOS Animation ===
AOS.init({ duration: 800 });

// Global 3D object variables
let material;
let knot;

// === DOM Ready ===
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }

  // Initialize features
  initParticles(savedTheme === "light" ? "light" : "dark");
  init3DScene(savedTheme === "light" ? "light" : "dark");

  // Theme toggle logic
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    themeToggle.textContent = currentTheme === "light" ? "☀️" : "🌙";

    // Reload particles
    document.getElementById("particles-js").innerHTML = "";
    initParticles(currentTheme);

    // Update 3D shape color
    if (material) {
      const newColor = currentTheme === "light" ? 0x778899 : 0x00f0ff;
      material.color.setHex(newColor);
    }
  });

  // Typed text animation
  new Typed("#typed-text", {
    strings: ["Frontend Developer", "Full Stack Developer", "Problem Solver"],
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
    showCursor: false
  });
});

// === 3D Background Scene ===
function init3DScene(theme = "dark") {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  camera.position.z = 40;

  // Create TorusKnot with dynamic theme-based color
  const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const color = theme === "light" ? 0x778899 : 0x00f0ff;

  material = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.7,
    roughness: 0.2
  });

  knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  const light1 = new THREE.PointLight(0xffffff, 1);
  light1.position.set(20, 20, 20);
  scene.add(light1);

  const light2 = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(light2);

  let scrollOffsetY = 0;
  window.addEventListener("scroll", () => {
    scrollOffsetY = window.scrollY || window.pageYOffset;
  });

  window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    knot.rotation.x += 0.01;
    knot.rotation.y += 0.01;
    knot.position.y = -scrollOffsetY * 0.01;
    renderer.render(scene, camera);
  }

  animate();
}

// === Particles.js with Theme Support ===
function initParticles(theme = "dark") {
  const particleColor = theme === "light" ? "#555555" : "#00f0ff";
  const lineColor = theme === "light" ? "#555555" : "#00f0ff";

  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: { enable: true, value_area: 800 }
      },
      color: { value: particleColor },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" }
      },
      opacity: {
        value: 0.7,
        random: true
      },
      size: {
        value: 4.5,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: lineColor,
        opacity: 0.4,
        width: 1.2
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
