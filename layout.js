// Shared header/footer, edit once, applies to every page.
const SITE = {
  email: "loniunser@gmail.com",
  social: { // replace # with your real profile URLs
    Instagram: "#", LinkedIn: "#", YouTube: "#", TikTok: "#"
  },
  // Put logo files in assets/sponsors/ and list them here.
  sponsors: [
    { name: "Speedway Motors", file: "speedway-motors.png" },
    { name: "Mobil 1", file: "mobil-1.png" },
    { name: "Acumatica", file: "acumatica.png" },
    { name: "PenFed Credit Union", file: "penfed.png" },
    { name: "Kellymoss", file: "kellymoss.png" },
  ],
};
const PAGES = [["Home","index.html"],["2026","2026.html"],["About","about.html"],["Contact","contact.html"],["Schedule","schedule.html"],["Shop","shop.html"],["Cart","cart.html"]];
const here = location.pathname.split("/").pop() || "index.html";
const icons = {
  Instagram:'<path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM17.3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.200-1.7 4.800-4.900 4.900-1.300.1-1.600.1-4.800.1s-3.600 0-4.800-.1c-3.300-.1-4.800-1.700-4.900-4.900C2.200 15.600 2.200 15.200 2.200 12s0-3.600.1-4.800C2.400 3.900 4 2.400 7.200 2.300 8.400 2.200 8.800 2.200 12 2.200zM12 0C8.700 0 8.300 0 7.100.1 2.700.3.300 2.700.1 7.100 0 8.300 0 8.700 0 12s0 3.700.1 4.900c.2 4.400 2.600 6.800 7 7 1.200.1 1.600.1 4.900.1s3.700 0 4.900-.1c4.400-.2 6.800-2.600 7-7 .1-1.200.1-1.600.1-4.900s0-3.700-.1-4.900c-.2-4.400-2.600-6.800-7-7C15.700 0 15.300 0 12 0z"/>',
  LinkedIn:'<path d="M20.4 20.5h-3.600v-5.600c0-1.300 0-3-1.800-3s-2.100 1.400-2.100 2.900v5.700H9.400V9h3.400v1.600c.5-.9 1.600-1.800 3.400-1.800 3.600 0 4.300 2.400 4.300 5.500v6.200zM5.300 7.400a2.100 2.100 0 110-4.200 2.100 2.100 0 010 4.200zM7.100 20.500H3.600V9h3.600v11.500z"/>',
  YouTube:'<path d="M23.500 6.200a3 3 0 00-2.100-2.100C19.500 3.600 12 3.600 12 3.600s-7.500 0-9.400.5A3 3 0 00.5 6.200C0 8.100 0 12 0 12s0 3.900.5 5.800a3 3 0 002.100 2.100c1.900.5 9.400.5 9.400.5s7.500 0 9.400-.5a3 3 0 002.100-2.100c.5-1.900.5-5.800.5-5.800s0-3.900-.5-5.800zM9.600 15.600V8.400l6.200 3.600-6.200 3.600z"/>',
  TikTok:'<path d="M19.600 6.700a4.800 4.800 0 01-3.800-4.200h-3.400v13.800a2.900 2.900 0 11-2-2.800V10a6.300 6.300 0 105.400 6.300V9a8.100 8.100 0 004.700 1.500V7.100c-.3 0-.6 0-.9-.4z"/>'
};
const nav = PAGES.map(([n,h]) => `<a href="${h}"${h===here?' aria-current="page"':''}>${n}</a>`).join("");
document.body.insertAdjacentHTML("afterbegin",
  `<header class="site-header"><a class="logo" href="index.html">Loni Unser</a>
   <button class="burger" aria-expanded="false">Menu</button><nav>${nav}</nav></header>`);
const sp = SITE.sponsors.map(s => `<div><img src="assets/sponsors/${s.file}" alt="${s.name}" data-name="${s.name}"></div>`).join("");
const soc = Object.entries(SITE.social).map(([n,u]) => `<a href="${u}" aria-label="${n}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24">${icons[n]}</svg></a>`).join("");
document.body.insertAdjacentHTML("beforeend",
  `<footer class="site-footer">
   <div class="sponsors">${sp}</div>
   <div class="foot"><div class="big">Loni Unser</div><div class="social">${soc}</div>
   <a class="big" href="mailto:${SITE.email}">${SITE.email}</a></div>
   <p class="legal">© ${new Date().getFullYear()} Loni Unser. All rights reserved.</p></footer>`);

// Missing image → neat grey placeholder (so the site looks intentional before photos are added)
document.querySelectorAll("img").forEach(img => {
  const swap = () => { const d = document.createElement("div"); d.className = "ph " + img.className.replace("photo",""); d.textContent = img.dataset.name || ("Add photo: " + (img.getAttribute("src")||"")); img.replaceWith(d); };
  img.addEventListener("error", swap); if (img.complete && !img.naturalWidth) swap();
});
const b = document.querySelector(".burger"), n = document.querySelector(".site-header nav");
b.addEventListener("click", () => b.setAttribute("aria-expanded", n.classList.toggle("open")));
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), {threshold:.1});
document.querySelectorAll("main > *:not(.hero)").forEach(el => { el.classList.add("reveal"); io.observe(el); });
