// ---- Edit your schedule here (ISO dates). ----
const RACES = [
  { date: "2026-03-14T19:00:00", name: "[Event name]", track: "[Track, City ST]" },
  { date: "2026-04-18T19:00:00", name: "[Event name]", track: "[Track, City ST]" },
  { date: "2026-06-06T19:00:00", name: "[Event name]", track: "[Track, City ST]" },
  { date: "2026-08-22T19:00:00", name: "[Event name]", track: "[Track, City ST]" },
];

document.querySelectorAll("[data-year]").forEach(e => e.textContent = new Date().getFullYear());

const now = Date.now();
const list = document.getElementById("races");
RACES.forEach(r => {
  const d = new Date(r.date), past = d < now;
  const li = document.createElement("li");
  if (past) li.className = "past";
  li.innerHTML = `<div class="date">${d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
    <div><strong></strong><small></small></div><span class="tag">${past ? "Complete" : "Upcoming"}</span>`;
  li.querySelector("strong").textContent = r.name;
  li.querySelector("small").textContent = r.track;
  list.appendChild(li);
});

const next = RACES.map(r => ({...r, t: new Date(r.date).getTime()})).filter(r => r.t > now).sort((a,b)=>a.t-b.t)[0];
if (next) {
  const box = document.getElementById("next-race"); box.hidden = false;
  box.querySelector("[data-name]").textContent = `${next.name} — ${next.track}`;
  const q = s => box.querySelector(s);
  const tick = () => {
    let s = Math.max(0, Math.floor((next.t - Date.now()) / 1000));
    q("[data-d]").textContent = Math.floor(s/86400); s %= 86400;
    q("[data-h]").textContent = Math.floor(s/3600); s %= 3600;
    q("[data-m]").textContent = Math.floor(s/60);
    q("[data-s]").textContent = s % 60;
  };
  tick(); setInterval(tick, 1000);
}

// Mobile menu
const burger = document.querySelector(".burger"), nav = document.querySelector(".nav nav");
burger.addEventListener("click", () => burger.setAttribute("aria-expanded", nav.classList.toggle("open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) nav.classList.remove("open"); });

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll(".section .wrap").forEach(el => { el.classList.add("reveal"); io.observe(el); });

// Merch waitlist: wire to Mailchimp/Shopify/Formspree later; for now just confirms.
document.getElementById("signup").addEventListener("submit", e => {
  e.preventDefault();
  e.target.querySelector(".msg").textContent = "You're on the list. We'll let you know when the shop opens.";
  e.target.reset();
});
