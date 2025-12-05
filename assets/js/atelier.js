window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 50);

  document
    .querySelector(".back-to-top")
    .classList.toggle("visible", window.scrollY > 200);
});

// Scroll animations
const scrollElements = document.querySelectorAll(".animate-on-scroll");

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

scrollElements.forEach((el) => scrollObserver.observe(el));

// Testimonial slider
let index = 0;
const testimonials = document.querySelectorAll(".testimonial");

setInterval(() => {
  testimonials[index].classList.remove("active");
  index = (index + 1) % testimonials.length;
  testimonials[index].classList.add("active");
}, 4000);
