document.addEventListener("DOMContentLoaded", function () {
  // Initialize dropdowns as closed
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    dropdown.classList.remove('active');
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  mobileMenuBtn.addEventListener("click", function () {
    mainNav.classList.toggle("active");
    this.classList.toggle("mobile-menu-active");
    document.body.style.overflow = mainNav.classList.contains("active") ? "hidden" : "";
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        mobileMenuBtn.classList.remove("mobile-menu-active");
        document.body.style.overflow = "";
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      mainNav.classList.contains("active") &&
      !mainNav.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      mainNav.classList.remove("active");
      mobileMenuBtn.classList.remove("mobile-menu-active");
      document.body.style.overflow = "";
    }
  });

  // Dropdown functionality
  document.querySelectorAll('.nav-dropdown > .nav-link').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
      // Desktop - show on hover only (handled by CSS)
      if (window.innerWidth > 768) return;
      
      // Mobile - toggle on click
      e.preventDefault();
      e.stopPropagation(); // Prevent event from bubbling up
      
      const parent = this.parentElement;
      const wasActive = parent.classList.contains('active');
      
      // Close all dropdowns first
      document.querySelectorAll('.nav-dropdown').forEach(item => {
        item.classList.remove('active');
      });
      
      // Toggle this dropdown if it wasn't active
      if (!wasActive) {
        parent.classList.add('active');
      }
    });
  });

  // Handle dropdown link clicks (NEW)
  document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', function(e) {
      // On mobile, close the menu and let default behavior handle navigation
      if (window.innerWidth <= 768) {
        // On mobile, close the menu but allow navigation
        mainNav.classList.remove("active");
        mobileMenuBtn.classList.remove("mobile-menu-active");
        document.body.style.overflow = "";
        // Let the default anchor behavior handle the navigation
      } else {
        // Desktop behavior
        e.preventDefault();
        const href = this.getAttribute('href');
        const [path, hash] = href.split('#');
        
        if (window.location.pathname === path && hash) {
          const target = document.getElementById(hash);
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        } else {
          window.location.href = href;
        }
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      const clickedInsideNav = e.target.closest('.main-nav');
      const clickedMenuBtn = e.target.closest('.mobile-menu-btn');
      const clickedDropdown = e.target.closest('.nav-dropdown');
  
      if (!clickedInsideNav && !clickedMenuBtn) {
        // Close full nav menu
        mainNav.classList.remove("active");
        mobileMenuBtn.classList.remove("mobile-menu-active");
        document.body.style.overflow = "";
  
        // Close all dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(item => {
          item.classList.remove('active');
        });
      } else if (!clickedDropdown) {
        // If clicked inside nav but outside dropdown, just close dropdowns
        document.querySelectorAll('.nav-dropdown').forEach(item => {
          item.classList.remove('active');
        });
      }
    }
  });

  // Handle page load with hash (NEW)
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const target = document.getElementById(hash);
    if (target) {
      // Small timeout to ensure page is fully rendered
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      }, 100);
    }
  }

  // Close dropdowns when clicking elsewhere on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && !e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(item => {
        item.classList.remove('active');
      });
    }
  });

  // Donation amount selection
  const amountOptions = document.querySelectorAll(".amount-option");
  amountOptions.forEach((option) => {
    option.addEventListener("click", function () {
      amountOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      document.querySelector("#donation-amount").value = this.dataset.amount;
    });
  });

  // Smooth scrolling for anchor links on current page
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      // Only handle if the link is on the same page
      if (this.href.split('#')[0] === window.location.href.split('#')[0]) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Hero Video Functionality
  const heroSection = document.querySelector(".hero");
  const heroVideo = document.querySelector(".hero-video video");

  if (heroVideo) {
    // Only enable hover play on desktop
    if (window.matchMedia("(min-width: 769px)").matches) {
      heroSection.addEventListener("mouseenter", function () {
        heroVideo.play().catch((e) => console.log("Video play failed:", e));
      });

      heroSection.addEventListener("mouseleave", function () {
        heroVideo.pause();
        heroVideo.currentTime = 0;
      });
    } else {
      // Mobile - play video automatically (muted)
      heroVideo.setAttribute("autoplay", "");
      heroVideo.setAttribute("muted", "");
      heroVideo.loop = true;
    }
  }

  // Counter Animation
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  function animateCounters() {
      counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          const count = +counter.innerText;
          const increment = target / speed;
          
          if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(animateCounters, 1);
          } else {
              counter.innerText = target;
          }
      });
  }
  
  // Start counter animation when element is in viewport
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-number').forEach(counter => {
      observer.observe(counter);
  });
  
  // Gallery Filter
  const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          
          galleryItems.forEach(item => {
              if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });
  
  // Events Filter
  const eventFilterButtons = document.querySelectorAll('.events-filter .filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  
  eventFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          eventFilterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          
          eventCards.forEach(card => {
              if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });
  
  // Video Play Functionality
  const videoThumbnails = document.querySelectorAll('.video-thumbnail');
  
  videoThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
          // In a real implementation, this would open a modal with the video
          // For now, we'll just link to YouTube
          window.open('https://www.youtube.com/@gyandeepakngo7337', '_blank');
      });
  });
});