const renderHome = () => {
  let main = document.querySelector("main");
  main.innerHTML = " ";
  main.appendChild(renderHeroSection());
  main.appendChild(renderFeaturesSection());
};

const renderNavbar = () => {
  const nav = createHtmlElement(
    "nav",
    "navbar navbar-expand-lg navbar-dark bg-black bg-opacity-75 shadow-lg px-4 py-3"
  );

  const container = createHtmlElement("div", "container-fluid");

  const brand = createHtmlElement(
    "span",
    "navbar-brand fw-bold fs-3 text-primary",
    "🌌 ALTSPACE"
  );

  const toggler = createHtmlElement("button", "navbar-toggler", "", {
    type: "button",
    "data-bs-toggle": "collapse",
    "data-bs-target": "#navbarNav",
    "aria-controls": "navbarNav",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation",
  });
  toggler.innerHTML = '<span class="navbar-toggler-icon"></span>';

  const navCollapse = createHtmlElement("div", "collapse navbar-collapse", "", {
    id: "navbarNav",
  });

  const navList = createHtmlElement(
    "ul",
    "navbar-nav ms-auto mb-2 mb-lg-0 gap-3 fs-5"
  );

  const links = [
    { href: "#/", label: "Home" },
    { href: "#/favorites", label: "Favorites" },
    { href: "#/albums", label: "Albums" },
    { href: "#/random", label: "Random Fact" },
  ];

  links.forEach(({ href, label }) => {
    const link = createHtmlElement("a", "nav-link", label, { href });
    const listItem = createHtmlElement("li", "nav-item");
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  navCollapse.appendChild(navList);
  customAppendChild(container, brand, toggler, navCollapse);
  nav.appendChild(container);

  return nav;
};

const renderHeroSection = () => {
  const section = createHtmlElement(
    "section",
    "hero-section position-relative overflow-hidden text-center py-5 mb-5",
    "",
    {
      style: `
        background: linear-gradient(135deg, rgba(12, 5, 32, 0.9) 0%, rgba(36, 18, 95, 0.8) 50%, rgba(8, 3, 20, 0.9) 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
      `,
    }
  );

  const stars = createHtmlElement("div", "stars", "", {
    style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%;",
  });

  const shootingStars = createHtmlElement("div", "shooting-stars", "", {
    style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%;",
  });

  const nebula = createHtmlElement("div", "nebula", "", {
    style: `
      position: absolute;
      width: 150%;
      height: 150%;
      top: -25%;
      left: -25%;
      background: radial-gradient(circle at 30% 50%, 
        rgba(94, 44, 237, 0.15) 0%, 
        rgba(12, 5, 32, 0) 50%),
      radial-gradient(circle at 70% 30%, 
        rgba(255, 102, 0, 0.1) 0%, 
        rgba(12, 5, 32, 0) 50%);
      animation: rotateNebula 180s linear infinite;
    `,
  });

  const container = createHtmlElement(
    "div",
    "container position-relative z-index-3"
  );

  const title = createHtmlElement(
    "h1",
    "display-3 fw-bold mb-4 cosmic-text",
    "Galactic Gallery"
  );

  const subtitle = createHtmlElement(
    "p",
    "lead fs-2 text-light mb-5 cosmic-subtitle",
    "Explore the cosmos through NASA's eyes"
  );

  const buttonsWrapper = createHtmlElement(
    "div",
    "d-flex flex-column flex-md-row justify-content-center gap-4"
  );

  const exploreBtn = createHtmlElement(
    "a",
    "btn btn-primary btn-lg px-4 py-3 rounded-pill cosmic-btn pulse-animation",
    "",
    {
      href: "#/search",
    }
  );
  exploreBtn.innerHTML = `
    <span class="btn-content">
      <i class="fas fa-rocket me-2"></i> Start Exploring
    </span>
    <span class="btn-glow"></span>
  `;

  const randomBtn = createHtmlElement(
    "a",
    "btn btn-outline-light btn-lg px-4 py-3 rounded-pill cosmic-btn",
    "",
    {
      href: "#/random",
    }
  );
  randomBtn.innerHTML = `
    <span class="btn-content">
      <i class="fas fa-meteor me-2"></i> Random Discovery
    </span>
    <span class="btn-glow"></span>
  `;

  const floatingPlanets = createHtmlElement("div", "floating-planets", "");
  floatingPlanets.innerHTML = `
    <div class="planet planet-1"></div>
    <div class="planet planet-2"></div>
    <div class="planet planet-3"></div>
  `;

  customAppendChild(buttonsWrapper, exploreBtn, randomBtn);
  customAppendChild(container, title, subtitle, buttonsWrapper);
  customAppendChild(
    section,
    stars,
    shootingStars,
    nebula,
    floatingPlanets,
    container
  );

  return section;
};

const renderFeaturesSection = () => {
  const section = createHtmlElement("section", "container py-5 mb-5");
  const row = createHtmlElement("div", "row g-5");

  const cardsData = [
    {
      icon: "fas fa-star",
      title: "Curated Collections",
      description:
        "Discover hand-picked space imagery from NASA's vast archives, organized for easy exploration.",
    },
    {
      icon: "fas fa-heart",
      title: "Save Favorites",
      description:
        "Create your personal collection of space wonders to revisit anytime.",
    },
    {
      icon: "fas fa-images",
      title: "Create Albums",
      description:
        "Organize your discoveries into custom albums for different themes or projects.",
    },
  ];

  cardsData.forEach(({ icon, title, description }) => {
    const card = renderFeatureCard(icon, title, description);
    row.appendChild(card);
  });

  section.appendChild(row);
  return section;
};

const renderFeatureCard = (iconClass, title, description) => {
  const col = createHtmlElement("div", "col-md-4");

  const card = createHtmlElement(
    "div",
    "card gradient-bg text-white h-100 border-0 shadow-lg rounded-3 overflow-hidden"
  );

  const cardBody = createHtmlElement("div", "card-body p-4 text-center");

  const iconWrapper = createHtmlElement(
    "div",
    "icon-wrapper bg-primary bg-opacity-10 rounded-circle p-4 mb-4 mx-auto",
    "",
    {
      style: "width: 80px; height: 80px;",
    }
  );

  const icon = createHtmlElement("i", `${iconClass} fs-3 text-primary`);

  const heading = createHtmlElement("h3", "h4 fw-bold mb-3", title);
  const paragraph = createHtmlElement("p", "mb-0", description);

  customAppendChild(iconWrapper, icon);
  customAppendChild(cardBody, iconWrapper, heading, paragraph);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
};

function renderAlbums() {
  const main = document.querySelector("main");

  main.appendChild(createAlbumHeroSection());
  main.appendChild(createAlbumsContainer());
  const grid = renderAlbumsGrid();
  customAppendChild(main, grid);
}

const renderRoute = () => {
  const main = document.querySelector("main");
  const hash = window.location.hash.replace("#", "") || "/";
  main.innerHTML = "";

  switch (hash) {
    case "/albums":
      renderAlbums();
      break;
    default:
      renderHome();
      break;
  }
};

const renderPage = () => {
  document.body.prepend(renderNavbar());
  renderRoute();
};

window.addEventListener("hashchange", renderRoute);
renderPage();
