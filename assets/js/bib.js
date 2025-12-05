// Navbar scroll
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 20);
});

// GSAP Hero animation
gsap.from(".hero-title, .hero-subtitle, .cta-button", {
  opacity: 0,
  y: 40,
  duration: 1.4,
  stagger: 0.2,
  ease: "power3.out",
});

// Scroll reveal
const revealElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

// Back-to-top button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

// Mini-quizz simple
const quizButton = document.getElementById("startQuiz");
if (quizButton) {
  quizButton.addEventListener("click", () => {
    const answer = prompt(
      "Quel logiciel est libre et gratuit ?\n1) Windows\n2) LibreOffice\n3) Photoshop"
    );
    if (answer === "2") {
      alert("Bravo ! Correct ✅");
    } else {
      alert("Oups ! Réessayez. ❌");
    }
  });
}
