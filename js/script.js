const toggle = document.querySelector(".navbar nav .toggle");
const nav_top = document.querySelectorAll(".navbar .nav-collapse");
const navbar = document.querySelector(".navbar");

// Enhanced toggle menu with animation
toggle.addEventListener("click", function () {
  nav_top.forEach((col) => {
    col.classList.toggle("nav-collapse-show");
    // Add slide animation
    if (col.classList.contains("nav-collapse-show")) {
      col.style.animation = "slideDown 0.3s ease-out forwards";
    } else {
      col.style.animation = "slideUp 0.3s ease-out forwards";
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(232, 248, 245, 0.95)";
    navbar.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(232, 248, 245, 1)";
    navbar.style.boxShadow = "none";
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      nav_top.forEach((col) => col.classList.remove("nav-collapse-show"));
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Add directional animations based on position
      const rect = entry.target.getBoundingClientRect();
      if (rect.top > 0) {
        entry.target.classList.add("animate-up");
      } else if (rect.left > window.innerWidth / 2) {
        entry.target.classList.add("animate-right");
      } else {
        entry.target.classList.add("animate-left");
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document
  .querySelectorAll(".about-section, .heading, .feedback-card, .info-ngo-body")
  .forEach((el) => {
    observer.observe(el);
  });

// Enhanced form validation
const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    // Add floating label animation
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });

    // Real-time validation
    input.addEventListener("input", () => {
      if (input.required && !input.value.trim()) {
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("error");
        // Add shake animation
        field.style.animation = "shake 0.5s ease-in-out";
        setTimeout(() => {
          field.style.animation = "";
        }, 500);
      } else {
        field.classList.remove("error");
      }
    });

    if (!isValid) {
      e.preventDefault();
      alert("Please fill in all required fields");
    }
  });
});

// Enhanced donation amount validation
const donationAmount = document.getElementById("donation_amount");
if (donationAmount) {
  donationAmount.addEventListener("input", (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value < 1) {
      e.target.value = 1;
      e.target.classList.add("error");
      setTimeout(() => e.target.classList.remove("error"), 500);
    }
  });
}

// Enhanced button interactions
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.type === "submit" || this.getAttribute("onClick")) {
      this.classList.add("loading");

      // Add ripple effect
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      const rect = this.getBoundingClientRect();
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;

      setTimeout(() => {
        ripple.remove();
        this.classList.remove("loading");
      }, 2000);
    }
  });
});
