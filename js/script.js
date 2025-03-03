// Main JavaScript file for JSVK website
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations for stats counters
  initStatsCounter();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Add scroll to top button functionality
  initScrollToTop();

  // Add responsive image handling
  initResponsiveImages();
});

// Stats counter animation
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat-number");

  if (stats.length === 0) return;

  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.innerText.replace(/\D/g, ""));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = Math.ceil(countTo / (duration / 30));

        const timer = setInterval(() => {
          count += increment;
          if (count >= countTo) {
            target.innerText = target.innerText.includes("+")
              ? countTo + "+"
              : countTo;
            clearInterval(timer);
          } else {
            target.innerText = target.innerText.includes("+")
              ? count + "+"
              : count;
          }
        }, 30);

        observer.unobserve(target);
      }
    });
  }, options);

  stats.forEach((stat) => {
    observer.observe(stat);
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    });
}

// Scroll to top button
function initScrollToTop() {
  // Create the button if it doesn't exist
  if (!document.querySelector(".scroll-to-top")) {
    const button = document.createElement("button");
    button.className = "scroll-to-top";
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute("aria-label", "Scroll to top");
    button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #024950;
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 99;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
    document.body.appendChild(button);

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        button.style.display = "flex";
      } else {
        button.style.display = "none";
      }
    });
  }
}

// Responsive image handling
function initResponsiveImages() {
  const images = document.querySelectorAll("img:not([loading])");
  images.forEach((img) => {
    img.setAttribute("loading", "lazy");
  });
}

// Add animation to elements when they come into view
function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  if (elements.length === 0) return;

  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Dropdown menu handling for mobile
function handleDropdownMenus() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");
    const content = dropdown.querySelector(".dropdown-content");

    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
      }
    });
  });
}

// Initialize dropdown handling on load and resize
window.addEventListener("load", handleDropdownMenus);
window.addEventListener("resize", handleDropdownMenus);
