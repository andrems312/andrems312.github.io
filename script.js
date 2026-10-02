/* =========================================================
   Portfólio André Manoel — script.js
   ========================================================= */

/* ---------------------------------------------------------
   1. PROJETOS
   Para adicionar um projeto, copie um bloco { ... } abaixo,
   cole depois do último e preencha os campos.
   - demoUrl: link de uma demonstração online (ou null se não houver)
   - repoUrl: link do repositório no GitHub
   - details: lista de tópicos que aparecem no "Ver projeto"
   --------------------------------------------------------- */
const PROJECTS = [
  {
    id: "agente-estudos",
    name: "Agente de Estudos em Python",
    description:
      "Projeto desenvolvido para explorar conceitos de Inteligência Artificial, Python e interação com modelos de IA.",
    goal:
      "Colocar em prática os fundamentos de Python e entender como uma aplicação se comunica com um modelo de IA.",
    technologies: ["Python", "Inteligência Artificial", "Modelos de IA"],
    status: "Em desenvolvimento", // [PREENCHER] confirme o status atual
    demoUrl: null,
    repoUrl: "https://github.com/andrems312", // [PREENCHER] troque pelo link do repositório do projeto
    details: [
      // [PREENCHER] descreva aqui as funcionalidades reais do projeto, uma por linha
    ],
  },
];

/* Ícone exibido nos cards de projeto */
const PROJECT_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19 C 8 15, 10 13, 12 12 S 17 8, 20 5"/><circle cx="4" cy="19" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="20" cy="5" r="1.8"/></svg>';

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Escapa texto antes de inserir no HTML */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

const externalAttrs = 'target="_blank" rel="noopener noreferrer"';
const newTabHint = '<span class="sr-only"> (abre em nova aba)</span>';

/* ---------- Cards de projeto ---------- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const cards = PROJECTS.map(
    (project) => `
    <article class="project-card reveal" aria-labelledby="proj-${project.id}">
      <div class="project-top">
        <span class="project-icon">${PROJECT_ICON}</span>
        <span class="status">${escapeHTML(project.status)}</span>
      </div>
      <h3 id="proj-${project.id}">${escapeHTML(project.name)}</h3>
      <p class="project-desc">${escapeHTML(project.description)}</p>
      <p class="project-goal"><strong>Objetivo:</strong> ${escapeHTML(project.goal)}</p>
      <ul class="tags" aria-label="Tecnologias">
        ${project.technologies.map((t) => `<li class="tag">${escapeHTML(t)}</li>`).join("")}
      </ul>
      <div class="project-actions">
        <button type="button" class="btn btn-primary btn-small" data-project="${project.id}">Ver projeto</button>
        <a href="${project.repoUrl}" class="btn btn-ghost btn-small" ${externalAttrs}>Código no GitHub${newTabHint}</a>
      </div>
    </article>`
  ).join("");

  // Card que mostra que novos projetos estão a caminho
  const placeholder = `
    <article class="project-card is-placeholder reveal">
      <h3>Próximo projeto</h3>
      <p>Em construção. Novos projetos com IA, APIs e automação vão aparecer aqui.</p>
    </article>`;

  grid.innerHTML = cards + placeholder;
}

/* ---------- Modal de projeto ---------- */
function setupProjectModal() {
  const modal = document.getElementById("project-modal");
  const content = document.getElementById("modal-content");
  const grid = document.getElementById("projects-grid");
  if (!modal || !content || !grid) return;

  let lastTrigger = null;

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project]");
    if (!button) return;
    const project = PROJECTS.find((p) => p.id === button.dataset.project);
    if (!project) return;

    lastTrigger = button;

    const detailsHTML = project.details.length
      ? `<h4>O que o projeto faz</h4><ul>${project.details.map((d) => `<li>${escapeHTML(d)}</li>`).join("")}</ul>`
      : `<p class="placeholder-note">Mais detalhes sobre as funcionalidades deste projeto serão adicionados em breve. Enquanto isso, o código está disponível no GitHub.</p>`;

    const demoButton = project.demoUrl
      ? `<a href="${project.demoUrl}" class="btn btn-primary" ${externalAttrs}>Abrir demonstração${newTabHint}</a>`
      : "";

    content.innerHTML = `
      <span class="status">${escapeHTML(project.status)}</span>
      <h3 id="modal-title">${escapeHTML(project.name)}</h3>
      <p>${escapeHTML(project.description)}</p>
      <h4>Objetivo</h4>
      <p>${escapeHTML(project.goal)}</p>
      <h4>Tecnologias</h4>
      <ul class="tags">${project.technologies.map((t) => `<li class="tag">${escapeHTML(t)}</li>`).join("")}</ul>
      ${detailsHTML}
      <div class="project-actions">
        ${demoButton}
        <a href="${project.repoUrl}" class="btn ${project.demoUrl ? "btn-ghost" : "btn-primary"}" ${externalAttrs}>Código no GitHub${newTabHint}</a>
      </div>`;

    modal.showModal();
    document.body.style.overflow = "hidden";
  });

  const close = () => modal.close();
  modal.querySelector(".modal-close").addEventListener("click", close);

  // Fechar clicando fora da caixa
  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (lastTrigger) lastTrigger.focus();
  });
}

/* ---------- Navegação ---------- */
function setupNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  const links = [...document.querySelectorAll(".nav-link")];

  // Fundo da navbar ao rolar + botão "voltar ao topo"
  const toTop = document.querySelector(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 20);
    toTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  // Indicador da seção atual
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}

/* ---------- Revelação ao rolar ---------- */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- Linha da timeline acompanha a rolagem ---------- */
function setupTimeline() {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  const items = [...timeline.querySelectorAll(".timeline-item")];

  let ticking = false;
  const update = () => {
    const rect = timeline.getBoundingClientRect();
    const anchor = window.innerHeight * 0.6;
    const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
    timeline.style.setProperty("--progress", progress.toFixed(3));

    items.forEach((item) => {
      const step = item.querySelector(".timeline-step").getBoundingClientRect();
      item.classList.toggle("is-reached", step.top + step.height / 2 < anchor);
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", update);
  update();
}

/* ---------- Texto dinâmico do Hero ---------- */
function setupTyped() {
  const el = document.querySelector(".typed");
  if (!el) return;
  const words = el.dataset.words.split("|");
  let index = 0;

  if (prefersReducedMotion) {
    // Sem animação de digitação: troca a palavra a cada poucos segundos
    setInterval(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];
    }, 3500);
    return;
  }

  let chars = words[0].length;
  let deleting = false;

  const tick = () => {
    const word = words[index];
    chars += deleting ? -1 : 1;
    el.textContent = word.slice(0, chars);

    let delay = deleting ? 45 : 85;
    if (!deleting && chars === word.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && chars === 0) {
      deleting = false;
      index = (index + 1) % words.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  setTimeout(() => { deleting = true; tick(); }, 2800);
}

/* ---------- Malha de neurônios no fundo do Hero ---------- */
function buildMesh() {
  const mesh = document.getElementById("mesh");
  if (!mesh) return;
  const ns = "http://www.w3.org/2000/svg";

  // Pontos fixos (posições escolhidas à mão para não poluir a trajetória)
  const points = [
    [40, 250], [110, 190], [70, 120], [180, 150], [150, 60], [250, 110],
    [300, 40], [230, 370], [330, 330], [410, 270], [470, 200], [420, 380],
    [500, 320], [330, 90],
  ];

  // Liga cada ponto aos dois vizinhos mais próximos
  const pairs = new Set();
  points.forEach((p, i) => {
    points
      .map((q, j) => ({ j, d: Math.hypot(p[0] - q[0], p[1] - q[1]) }))
      .filter((n) => n.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => pairs.add([Math.min(i, j), Math.max(i, j)].join("-")));
  });

  pairs.forEach((key) => {
    const [a, b] = key.split("-").map(Number);
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", points[a][0]);
    line.setAttribute("y1", points[a][1]);
    line.setAttribute("x2", points[b][0]);
    line.setAttribute("y2", points[b][1]);
    mesh.appendChild(line);
  });

  points.forEach(([x, y], i) => {
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 2.6);
    if (i % 4 === 0) {
      circle.classList.add("blink");
      circle.style.setProperty("--d", `${i * 0.35}s`);
    }
    mesh.appendChild(circle);
  });

  if (prefersReducedMotion) {
    const svg = mesh.ownerSVGElement;
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
  }
}

/* ---------- Brilho discreto que segue o cursor no Hero ---------- */
function setupSpotlight() {
  const hero = document.querySelector(".hero");
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!hero || !finePointer || prefersReducedMotion) return;

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    hero.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
}

/* ---------- Repositórios do GitHub (API pública, sem chave) ---------- */
async function loadRepos() {
  const list = document.getElementById("repo-list");
  if (!list) return;

  const USER = "andrems312";
  const CACHE_KEY = "repos-cache";
  const fallback = `<li class="repo-empty">Não foi possível carregar os repositórios agora. <a href="https://github.com/${USER}" ${externalAttrs}>Veja direto no GitHub${newTabHint}</a>.</li>`;

  const render = (repos) => {
    if (!repos.length) {
      list.innerHTML = `<li class="repo-empty">Nenhum repositório público ainda. Os próximos projetos aparecem aqui assim que forem publicados.</li>`;
      return;
    }
    const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
    list.innerHTML = repos
      .map(
        (repo) => `
        <li>
          <a class="repo" href="${repo.html_url}" ${externalAttrs}>
            <span class="repo-name">${escapeHTML(repo.name)}</span>
            <span class="repo-desc">${escapeHTML(repo.description || "Sem descrição")}</span>
            <span class="repo-meta">${repo.language ? `<span>${escapeHTML(repo.language)}</span>` : ""}<span>atualizado em ${dateFmt.format(new Date(repo.pushed_at))}</span></span>
            ${newTabHint}
          </a>
        </li>`
      )
      .join("");
  };

  // Evita chamar a API várias vezes na mesma visita
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return render(JSON.parse(cached));
  } catch (_) { /* armazenamento indisponível: segue sem cache */ }

  try {
    const response = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=30`);
    if (!response.ok) throw new Error(`GitHub respondeu ${response.status}`);
    const data = await response.json();
    const repos = data
      .filter((repo) => !repo.fork)
      .slice(0, 5)
      .map(({ name, description, language, pushed_at, html_url }) => ({ name, description, language, pushed_at, html_url }));

    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(repos)); } catch (_) {}
    render(repos);
  } catch (error) {
    console.warn("Repositórios do GitHub indisponíveis:", error.message);
    list.innerHTML = fallback;
  }
}

/* ---------- Copiar e-mail ---------- */
function setupCopyEmail() {
  const button = document.getElementById("copy-email");
  if (!button) return;
  const label = button.querySelector(".copy-label");

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.email);
      label.textContent = "Copiado";
      button.classList.add("is-copied");
      setTimeout(() => {
        label.textContent = "Copiar";
        button.classList.remove("is-copied");
      }, 2000);
    } catch (_) {
      label.textContent = "Selecione e copie";
    }
  });
}

/* ---------- Inicialização ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupProjectModal();
  setupNavigation();
  setupReveal();
  setupTimeline();
  setupTyped();
  buildMesh();
  setupSpotlight();
  setupCopyEmail();
  loadRepos();
});
