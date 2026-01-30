/* SCROLL PROGRESS */
const bar = document.createElement("div");
bar.style.cssText =
  "position:fixed;top:0;left:0;height:4px;width:0%;background:linear-gradient(90deg,#2563eb,#38bdf8);z-index:9999";
document.body.appendChild(bar);

window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / h) * 100 + "%";
});

/* REVEAL */
const revealItems = document.querySelectorAll(
  ".hero, .stats, .tech, .plans, .cta-advanced, .plan-card, .stat-card"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
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
      if (p !== plan) p.style.opacity = "0.5";
    });
    plan.style.transform = "scale(1.05)";
  });

  plan.addEventListener("mouseleave", () => {
    plans.forEach(p => (p.style.opacity = "1"));
    plan.style.transform = "";
  });
});

/* MAGNETIC BUTTON */
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});
