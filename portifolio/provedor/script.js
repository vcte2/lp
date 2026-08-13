/* SCROLL PROGRESS */
const bar = document.createElement("div");
bar.id = "scroll-progress";
document.body.appendChild(bar);

window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / h) * 100 + "%";
});

/* MENU MOBILE */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ANO NO RODAPÉ */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* REVEAL ON SCROLL */
const revealItems = document.querySelectorAll(
  ".hero, .stats, .tech, .plans, .cta-advanced, .plan-card, .stat-card"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach(el => {
  el.classList.add("reveal-hidden");
  observer.observe(el);
});

/* PLAN FOCUS */
const plans = document.querySelectorAll(".plan-card");

plans.forEach(plan => {
  plan.addEventListener("mouseenter", () => {
    plans.forEach(p => {
      if (p !== plan) p.style.opacity = "0.55";
    });
  });

  plan.addEventListener("mouseleave", () => {
    plans.forEach(p => (p.style.opacity = "1"));
  });
});

/* MAGNETIC BUTTON */
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});
