/* =========================
  Data
========================= */

const dataList = [
  {
    name: "Jessica Rollins",
    role: "Project Manager",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    text: "Each demo built with Teba will look different. You can customize almost anything in the appearance of your website."
  },
  {
    name: "Marcus Aurelius",
    role: "CEO, Nexa",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "The integration process was incredibly smooth. Triad's infrastructure is built for speed and long-term scalability."
  },
  {
    name: "Amina Al-Sayed",
    role: "UI Designer",
    img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604",
    text: "We value security above all else, and Teba provided us with a fortress-like framework that doesn't compromise on design."
  }
];

const uvpItems = [
  [
    { id: "01", title: "End-to-End Expertise", icon: "fa-layer-group", desc: "Full-lifecycle management from initial concept to deployment and beyond." },
    { id: "02", title: "2026-Ready Tech Stack", icon: "fa-microchip", desc: "Utilizing next-gen AI integration and sustainable, scalable architectures." },
    { id: "03", title: "Client-Centric Approach", icon: "fa-handshake-angle", desc: "Your goals are our compass. We prioritize transparent and deep communication." }
  ],
  [
    { id: "04", title: "Proven Results", icon: "fa-chart-line", desc: "Track record of delivering high-impact digital transformations globally." },
    { id: "05", title: "Fast Delivery", icon: "fa-bolt", desc: "Agile workflows that ensure your project hits the market exactly on time." },
    { id: "06", title: "Full Transparency", icon: "fa-magnifying-glass-chart", desc: "Complete visibility into our process, progress, and performance metrics." }
  ]
];

const services = [
  { title: "Web Development", icon: "fa-code", desc: "Building high-performance, scalable web applications with modern tech stacks for ultimate reliability and speed." },
  { title: "Software Development", icon: "fa-laptop-code", desc: "Crafting robust, custom software solutions that streamline business processes and enhance operational efficiency." },
  { title: "SEO & Digital Marketing", icon: "fa-bullhorn", desc: "Growing your brand through data-driven SEO, PPC, and social strategies that dominate search rankings." },
  { title: "UI/UX Design", icon: "fa-bezier-curve", desc: "Crafting intuitive and visually stunning interfaces that ensure high conversion and seamless user journeys." },
  { title: "Mobile App Development", icon: "fa-mobile-alt", desc: "Creating powerful, user-centric mobile applications for iOS and Android that engage and retain users." },
  { title: "Branding", icon: "fa-copyright", desc: "Developing unique brand personas that capture your company's spirit and resonate with global audiences." }
];

const processSteps = [
  { step: "01", title: "Initiation & Planning", img: "https://cdni.iconscout.com/illustration/premium/thumb/business-planning-illustration-download-in-svg-png-gif-file-formats--project-management-strategic-plan-mission-vision-pack-people-illustrations-4634739.png", alt: "Initiation" },
  { step: "02", title: "Execution & Strategy", img: "https://cdni.iconscout.com/illustration/premium/thumb/execution-illustration-download-in-svg-png-gif-file-formats--project-management-implementation-plan-pack-business-illustrations-4634743.png", alt: "Execution" },
  { step: "03", title: "Execution & Development", img: "https://cdni.iconscout.com/illustration/premium/thumb/development-illustration-download-in-svg-png-gif-file-formats--coding-programming-software-pack-network-communication-illustrations-4634747.png", alt: "Development" },
  { step: "04", title: "Deployment & Scaling", img: "https://cdni.iconscout.com/illustration/premium/thumb/product-launch-illustration-download-in-svg-png-gif-file-formats--rocket-startup-business-pack-people-illustrations-4634741.png", alt: "Launch" },
  { step: "05", title: "Analytics & Growth", img: "https://cdni.iconscout.com/illustration/premium/thumb/monitoring-illustration-download-in-svg-png-gif-file-formats--data-analytics-dashboard-business-pack-network-communication-illustrations-4634745.png", alt: "Monitoring" },
  { step: "06", title: "Security & Future-Proofing", img: "https://cdni.iconscout.com/illustration/premium/thumb/security-illustration-download-in-svg-png-gif-file-formats--protection-shield-safety-business-pack-network-communication-illustrations-4634742.png", alt: "Security" }
];

const caseFilters = ["All Work", "SaaS", "AI Tech", "Mobile App"];

/* =========================
  Helpers
========================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

function clamp(n, a, b){ return Math.min(Math.max(n, a), b); }

/* =========================
  Header scroll
========================= */
function setupHeaderScroll(){
  const header = $("#triadHeader");
  if (!header) return;

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 50);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* =========================
  Trust logo tiles
========================= */
function renderTrustLogos(){
  const grid = $("#trustLogoGrid");
  if (!grid) return;

  grid.innerHTML = "";
  for (let i = 0; i < 6; i++){
    const tile = document.createElement("div");
    tile.className = "trust-logo-tile";
    grid.appendChild(tile);
  }
}

/* =========================
  Reveal on scroll
========================= */
function setupReveal(){
  const el = $("#statsReveal");
  if (!el) return;

  if (!("IntersectionObserver" in window)){
    el.classList.add("is-visible");
    return;
  }

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting){
      el.classList.add("is-visible");
      io.disconnect();
    }
  }, { threshold: 0.1 });

  io.observe(el);
}

/* =========================
  Counters
========================= */
function setupCounters(){
  const counters = $$(".counter");
  if (!counters.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animate = (el) => {
    const end = Number(el.dataset.end || "0");
    const suffix = el.dataset.suffix || "";
    const duration = prefersReduced ? 1 : 2500;

    let startTime = null;

    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const progress = ts - startTime;
      const pct = clamp(progress / duration, 0, 1);
      const eased = (pct === 1) ? 1 : (1 - Math.pow(2, -10 * pct));
      const val = Math.floor(eased * end);
      el.textContent = `${val}${suffix}`;
      if (pct < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)){
    counters.forEach(animate);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting){
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => io.observe(c));
}

/* =========================
  UVP rotation
========================= */
function setupUVP(){
  const col = $("#uvpFeatureColumn");
  if (!col) return;

  let uvpGroup = 0;

  const render = () => {
    col.innerHTML = "";

    uvpItems.forEach((group, gIdx) => {
      const slide = document.createElement("div");
      slide.className = `uvp-fade-slide ${uvpGroup === gIdx ? "active" : ""}`;

      group.forEach((item) => {
        const row = document.createElement("div");
        row.className = "uvp-feature";

        const iconWrap = document.createElement("div");
        iconWrap.className = "uvp-icon";
        iconWrap.innerHTML = `<i class="fas ${item.icon}"></i>`;

        const text = document.createElement("div");
        text.className = "uvp-text";
        text.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;

        row.appendChild(iconWrap);
        row.appendChild(text);
        slide.appendChild(row);
      });

      col.appendChild(slide);
    });
  };

  render();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced){
    setInterval(() => {
      uvpGroup = (uvpGroup === 0 ? 1 : 0);
      render();
    }, 5000);
  }
}

/* =========================
  Services
========================= */
function renderServices(){
  const grid = $("#servicesGrid");
  if (!grid) return;

  grid.innerHTML = services.map((svc, idx) => `
    <div class="service-card-new">
      <div class="card-number">0${idx + 1}</div>
      <div class="icon-box-new"><i class="fas ${svc.icon}"></i></div>
      <h3 class="service-title-new">${svc.title}</h3>
      <p class="service-desc-new">${svc.desc}</p>
      <a href="#" class="learn-more-link">Learn More <i class="fas fa-arrow-right"></i></a>
    </div>
  `).join("");
}

/* =========================
  Process
========================= */
function renderProcess(){
  const grid = $("#processGrid");
  if (!grid) return;

  grid.innerHTML = processSteps.map((item) => `
    <div class="reveal-container">
      <div class="process-item-card process-card">
        <div class="illustration-box">
          <img src="${item.img}" alt="${item.alt}" />
        </div>
        <div class="step-badge">Step - ${item.step}</div>
        <h4 class="process-card__title">${item.title}</h4>
        <p class="process-card__desc">We are architects of innovation and trailblazers of technological advancement.</p>
      </div>
    </div>
  `).join("");

  const items = $$(".process-grid-layout .reveal-container");
  if (!("IntersectionObserver" in window)){
    items.forEach(i => i.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting){
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(i => io.observe(i));
}

/* =========================
  Case filter buttons
========================= */
function setupCaseFilters(){
  const wrap = $("#caseFilterButtons");
  if (!wrap) return;

  let active = "All Work";

  const render = () => {
    wrap.innerHTML = caseFilters.map((f) => {
      const activeClass = (f === active) ? "is-active" : "";
      return `<button type="button" data-filter="${f}" class="case-filter-btn ${activeClass}">${f}</button>`;
    }).join("");
  };

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    active = btn.dataset.filter;
    render();
  });

  render();
}

/* =========================
  Testimonials
========================= */
function setupTestimonials(){
  const section = $(".triad-testimonials");
  const img = $("#tImg");
  const name = $("#tName");
  const role = $("#tRole");
  const text = $("#tText");
  const meta = $("#tMeta");
  const prev = $("#tPrev");
  const next = $("#tNext");

  if (!section || !img || !name || !role || !text || !meta || !prev || !next) return;

  let idx = 0;
  let anim = false;

  const render = () => {
    const d = dataList[idx];
    img.src = d.img;
    name.textContent = d.name;
    role.textContent = d.role;
    text.textContent = `"${d.text}"`;
  };

  const setAnimating = (on) => {
    anim = on;
    section.classList.toggle("is-animating", on);
  };

  const go = (dir) => {
    if (anim) return;
    setAnimating(true);

    setTimeout(() => {
      idx = (dir === "next")
        ? (idx + 1) % dataList.length
        : (idx - 1 + dataList.length) % dataList.length;

      render();
      setAnimating(false);
    }, 500);
  };

  prev.addEventListener("click", () => go("prev"));
  next.addEventListener("click", () => go("next"));

  render();
  setAnimating(false);

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced){
    setInterval(() => go("next"), 5000);
  }
}

/* =========================
  Boot
========================= */
document.addEventListener("DOMContentLoaded", () => {
  setupHeaderScroll();
  renderTrustLogos();
  setupReveal();
  setupCounters();
  setupUVP();
  renderServices();
  renderProcess();
  setupCaseFilters();
  setupTestimonials();
});
