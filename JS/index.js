document.addEventListener("DOMContentLoaded", () => {
  document.body.prepend(renderNavbar());
  renderHome();
});

const renderHome = () => {
  let main = document.querySelector("main");
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
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                      url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') 
                      no-repeat center center/cover;
          min-height: 80vh; display: flex; align-items: center;
        `,
    }
  );

  const container = createHtmlElement(
    "div",
    "container position-relative z-index-1"
  );

  const title = createHtmlElement(
    "h1",
    "display-3 fw-bold mb-4 gradient-text",
    "Galactic Gallery"
  );
  const subtitle = createHtmlElement(
    "p",
    "lead fs-2 text-light mb-5",
    "Explore the cosmos through NASA's eyes"
  );

  const buttonsWrapper = createHtmlElement(
    "div",
    "d-flex justify-content-center gap-4"
  );

  const exploreBtn = createHtmlElement(
    "a",
    "btn btn-primary btn-lg px-4 py-3 rounded-pill shadow-lg",
    "",
    {
      href: "#/search",
    }
  );
  exploreBtn.innerHTML = `<i class="fas fa-search me-2"></i> Start Exploring`;

  const randomBtn = createHtmlElement(
    "a",
    "btn btn-outline-light btn-lg px-4 py-3 rounded-pill shadow-lg",
    "",
    {
      href: "#/random",
    }
  );
  randomBtn.innerHTML = `<i class="fas fa-random me-2"></i> Random Discovery`;

  const scrollIconWrapper = createHtmlElement(
    "div",
    "floating position-absolute bottom-0 start-50 translate-middle-x mb-5"
  );
  const scrollIcon = createHtmlElement(
    "i",
    "fas fa-chevron-down text-white fs-1"
  );

  customAppendChild(buttonsWrapper, exploreBtn, randomBtn);
  customAppendChild(container, title, subtitle, buttonsWrapper);
  customAppendChild(scrollIconWrapper, scrollIcon);
  customAppendChild(section, container, scrollIconWrapper);

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

const renderRandomFactSection = (data) => {

  const section = createHtmlElement('section', 'container py-5 text-white');

  const title = createHtmlElement('h2', 'mb-4 display-5 fw-bold', data.title);
  const date = createHtmlElement('p', 'text-muted', `${data.date}`);

  const imageWrapper = createHtmlElement('div', 'mb-4 text-center');
  const image = createHtmlElement('img', 'img-fluid rounded shadow', '', {
    src: data.url,
    alt: data.title,
    style: 'max-height: 500px; object-fit: cover;',
  });
  imageWrapper.appendChild(image);

  const explanation = createHtmlElement('p', 'lead', data.explanation);

  customAppendChild(section, title, date, imageWrapper, explanation);
};