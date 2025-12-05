// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Navigation scroll effect
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Parallax effect for hero
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });

  // Update active navigation link
  function updateActiveNavLink(targetId) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === targetId) {
        link.classList.add("active");
      }
    });
  }

  // Scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // For feature cards - stagger animation
        if (
          entry.target.classList.contains("feature-card") ||
          entry.target.classList.contains("activity-card")
        ) {
          const parent = entry.target.parentElement;
          const index = Array.from(parent.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }

        // For timeline items
        if (entry.target.classList.contains("timeline-item")) {
          const index = Array.from(entry.target.parentElement.children).indexOf(
            entry.target
          );
          entry.target.style.transitionDelay = `${index * 0.2}s`;
        }
      }
    });
  }, observerOptions);

  // Observe all elements with animation class
  document
    .querySelectorAll(
      ".animate-on-scroll, .feature-card, .timeline-item, .activity-card"
    )
    .forEach((el) => {
      observer.observe(el);
    });

  // Testimonial slider
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll(".testimonial");

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    testimonials[index].classList.add("active");
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  // Auto-rotate testimonials every 5 seconds
  let testimonialInterval = setInterval(nextTestimonial, 5000);

  // Pause on hover
  const testimonialSlider = document.querySelector(".testimonial-slider");
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  });

  // Initialize
  showTestimonial(0);

  // Gallery hover effect
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    item.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });

    // Click to view larger
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const imgSrc = this.querySelector("img").src;
      const title = this.querySelector("h3").textContent;
      const desc = this.querySelector("p").textContent;

      // Create modal
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="modal-info">
                        <h3>${title}</h3>
                        <p>${desc}</p>
                    </div>
                </div>
            `;

      // Add modal styles
      const style = document.createElement("style");
      style.textContent = `
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }
                .modal-content {
                    max-width: 90%;
                    max-height: 90%;
                    position: relative;
                    animation: zoomIn 0.3s ease;
                }
                .modal-content img {
                    max-width: 100%;
                    max-height: 70vh;
                    border-radius: 10px;
                }
                .modal-info {
                    background: white;
                    padding: 20px;
                    border-radius: 0 0 10px 10px;
                }
                .close-modal {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 40px;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .close-modal:hover {
                    transform: scale(1.2);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.8); }
                    to { transform: scale(1); }
                }
            `;

      document.head.appendChild(style);
      document.body.appendChild(modal);

      // Close modal functionality
      modal.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.animation = "fadeOut 0.3s ease";
        setTimeout(() => {
          modal.remove();
          style.remove();
        }, 300);
      });

      // Close on click outside
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.animation = "fadeOut 0.3s ease";
          setTimeout(() => {
            modal.remove();
            style.remove();
          }, 300);
        }
      });
    });
  });

  // Floating elements animation enhancement
  document.querySelectorAll(".floating-element").forEach((element, index) => {
    element.style.animationDuration = `${15 + index * 2}s`;
    element.style.animationDelay = `${index * 3}s`;
  });

  // Add current year to footer
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;

  // Add click effect to CTA button
  const ctaButton = document.querySelector(".cta-button");
  ctaButton.addEventListener("click", function () {
    this.style.animation = "pulse 0.5s ease";
    setTimeout(() => {
      this.style.animation = "";
    }, 500);
  });

  // Back to top button functionality
  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);

    // Console welcome message
    console.log(
      "%c🌳 Welcome to Old Village Website!",
      "color: #8B4513; font-size: 18px; font-weight: bold;"
    );
    console.log(
      "%cExperience the charm of our timeless village.",
      "color: #666; font-size: 14px;"
    );
  });

  // Seasonal greeting based on current month
  const month = new Date().getMonth();
  const seasonalMessages = [
    "❄ Winter Wonderland - Visit our cozy Winter Market!",
    "💝 Love is in the air - Valentine's in the Village",
    "🌸 Spring is blooming - Join our Blossom Walk!",
    "🌷 Easter celebrations in the village square",
    "☀ Summer is coming - Prepare for the Summer Faire!",
    "🌻 Enjoy long summer days in our beautiful countryside",
    "🏖 Summer vacation activities for all ages",
    "🌞 Perfect weather for village exploration",
    "🍎 Harvest season begins - Festival preparations underway",
    "🎃 Halloween decorations and pumpkin carving",
    "🦃 Thanksgiving celebrations with the community",
    "🎄 Christmas magic in Old Village - Markets & Lights",
  ];

  // Mouse trail effect
  const trail = [];
  const trailCount = 20;

  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement("div");
    dot.className = "mouse-trail-dot";
    dot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let trailIndex = 0;
  document.addEventListener("mousemove", (e) => {
    const dot = trail[trailIndex];
    dot.style.left = e.pageX - 3 + "px";
    dot.style.top = e.pageY - 3 + "px";
    dot.style.opacity = "0.7";

    setTimeout(() => {
      dot.style.opacity = "0";
    }, 300);

    trailIndex = (trailIndex + 1) % trailCount;
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Escape key closes modal if open
    if (e.key === "Escape") {
      const modal = document.querySelector(".modal");
      if (modal) {
        modal.remove();
      }
    }

    // Spacebar pauses/resumes testimonial slider
    if (e.key === " " && !e.target.matches("input, textarea")) {
      e.preventDefault();
      if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
      } else {
        testimonialInterval = setInterval(nextTestimonial, 5000);
      }
    }
  });

  // Initialize scroll position for animations
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
  }, 100);
});
