// Admin Dashboard JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Mobile sidebar toggle
  const toggleSidebar = document.querySelector(".toggle-sidebar");
  const sidebar = document.querySelector(".dashboard-sidebar");

  if (toggleSidebar) {
    toggleSidebar.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
    }
  });

  // Form validation
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });

  // Initialize any datepickers
  const datepickers = document.querySelectorAll(".datepicker");
  if (datepickers.length > 0 && typeof flatpickr !== "undefined") {
    datepickers.forEach((picker) => {
      flatpickr(picker, {
        dateFormat: "Y-m-d",
      });
    });
  }

  // File upload preview
  const fileInputs = document.querySelectorAll(".custom-file-input");

  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const fileName = this.files[0]?.name || "Choose file";
      const nextSibling = this.nextElementSibling;

      if (nextSibling) {
        nextSibling.innerText = fileName;
      }

      // Image preview if applicable
      const previewElement = document.querySelector(`#preview-${this.id}`);
      if (previewElement && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          previewElement.src = e.target.result;
          previewElement.style.display = "block";
        };

        reader.readAsDataURL(this.files[0]);
      }
    });
  });

  // Confirm delete actions
  const deleteButtons = document.querySelectorAll(".btn-delete");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (
        !confirm(
          "Are you sure you want to delete this item? This action cannot be undone."
        )
      ) {
        e.preventDefault();
      }
    });
  });

  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll(".toggle-password");

  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const passwordField = document.querySelector(
        this.getAttribute("data-target")
      );

      if (passwordField) {
        const type =
          passwordField.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordField.setAttribute("type", type);

        // Toggle icon
        this.querySelector("i").classList.toggle("fa-eye");
        this.querySelector("i").classList.toggle("fa-eye-slash");
      }
    });
  });
});

// Function to handle tab switching
function switchTab(tabId) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.style.display = "none";
  });

  // Remove active class from all tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected tab content and mark tab as active
  document.getElementById(tabId).style.display = "block";
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
}

// Function to show notification
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
            }"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

  document.body.appendChild(notification);

  // Show notification with animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
}
