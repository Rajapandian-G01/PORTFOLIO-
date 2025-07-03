// Initialize EmailJS
emailjs.init("Yr-3hRUZeklfQJ3Ld");

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
}
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const theme = body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", theme);
  updateThemeColors();
});

function updateThemeColors() {
  const neon = document.querySelector(".neon");
  if (body.classList.contains("light")) {
    neon.style.color = "#0077ff";
    neon.style.textShadow = "0 0 10px #33aaff, 0 0 20px #3399ff";
  } else {
    neon.style.color = "#00ffff";
    neon.style.textShadow = "0 0 10px #00ffff, 0 0 20px #00ffff";
  }
}

// Typing Effect
const typingSpan = document.querySelector(".typing");
const words = ["Cyber Security Student", "Web Developer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const word = words[wordIndex];
  typingSpan.textContent = word.substring(0, charIndex);

  if (!isDeleting && charIndex < word.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 1000);
    return;
  }
  setTimeout(type, isDeleting ? 80 : 150);
}

document.addEventListener("DOMContentLoaded", () => {
  type();
  updateThemeColors();
  particlesJS.load("particles-js", "particles.json");
});

// Smooth Scroll
document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// EmailJS Form Handler
const form = document.querySelector("#contact-form");
const sendBtn = document.querySelector("#send-btn");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.classList.add("loading");

    emailjs.sendForm("service_yuhuckf", "template_dxm2iun", form)
      .then(() => {
        showAlert("✅ Message sent successfully!", "success");
        form.reset();
        sendBtn.classList.remove("loading");
        sendBtn.disabled = false;
      })
      .catch(() => {
        showAlert("❌ Failed to send message. Try again later.", "error");
        sendBtn.classList.remove("loading");
        sendBtn.disabled = false;
      });
  });
}

// Notification Alert
function showAlert(msg, type) {
  const box = document.createElement("div");
  box.textContent = msg;
  box.style.position = "fixed";
  box.style.bottom = "20px";
  box.style.right = "20px";
  box.style.padding = "12px 20px";
  box.style.borderRadius = "8px";
  box.style.zIndex = "9999";
  box.style.fontWeight = "bold";
  box.style.color = "#fff";
  box.style.background = type === "success" ? "#00cc99" : "#ff4444";
  box.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
  document.body.appendChild(box);
  setTimeout(() => {
    box.style.opacity = "0";
    setTimeout(() => box.remove(), 400);
  }, 4000);
}
