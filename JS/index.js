const NASA_SEARCH_API = "https://images-api.nasa.gov/search";

const renderHome = () => {
  let main = document.querySelector("main");
  main.appendChild(renderHeroSection());
  main.appendChild(renderFeaturesSection());
};

const renderNavbar = () => {
  const nav = createHtmlElement(
    "nav",
    "navbar mb-10 navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom border-secondary"
  );

  const container = createHtmlElement("div", "container-fluid");

  const brand = createHtmlElement(
    "a",
    "navbar-brand fs-4 fw-semibold text-white",
    "ALTSPACE",
    { href: "#/" }
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
    "navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3"
  );

  const links = [
    { href: "#/", label: "Home" },
    { href: "#/favorites", label: "Favorites" },
    { href: "#/albums", label: "Albums" },
    { href: "#/random", label: "Random Fact" },
  ];

  links.forEach(({ href, label }) => {
    const link = createHtmlElement(
      "a",
      "nav-link px-2 py-1 position-relative",
      label,
      { href }
    );

    const activeInd = createHtmlElement(
      "span",
      "position-absolute bottom-0 start-0 end-0 mx-auto bg-primary",
      "",
      { style: "height: 2px; width: 0%; transition: width 0.3s ease;" }
    );
    customAppendChild(link, activeInd);

    const listItem = createHtmlElement(
      "li",
      "nav-item d-flex align-items-center"
    );
    customAppendChild(listItem, link);
    customAppendChild(navList, listItem);

    if (
      window.location.hash === href ||
      (window.location.hash === "" && href === "#/")
    ) {
      link.classList.add("active", "text-white");
      activeInd.style.width = "100%";
    }
  });

  window.addEventListener("hashchange", () => {
    const navLinks = navList.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      const ind = link.querySelector("span");
      if (
        link.getAttribute("href") === window.location.hash ||
        (window.location.hash === "" && link.getAttribute("href") === "#/")
      ) {
        link.classList.add("active", "text-white");
        ind.style.width = "100%";
      } else {
        link.classList.remove("active", "text-white");
        ind.style.width = "0%";
      }
    });
  });

  customAppendChild(navCollapse, navList);
  customAppendChild(container, brand, toggler, navCollapse);
  customAppendChild(nav, container);

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
    customAppendChild(row, card);
  });

  customAppendChild(section, row);
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
  customAppendChild(card, cardBody);
  customAppendChild(col, card);

  return col;
};

const fetchSearchResults = async (searchState) => {
  const { q, mediaType, year } = searchState;
  let url = `${NASA_SEARCH_API}?q=${encodeURIComponent(q || "")}`;
  if (mediaType) url += `&media_type=${mediaType}`;
  if (year) url += `&year_start=${year}&year_end=${year}`;
  localStorage.setItem("lastSearch", JSON.stringify(searchState));
  renderSearchResults(url);
};

const renderSearchPage = () => {
  const hero = createHtmlElement(
    "section",
    "search-hero   position-relative py-5 mb-5",
    "",
    {
      style: `
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                  url('https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') 
                  no-repeat center center/cover;
      min-height: 300px;
      margin-top:70px
    `,
    }
  );

  const container = createHtmlElement(
    "div",
    "container position-relative z-index-1 py-5"
  );
  const title = createHtmlElement(
    "h1",
    "display-4 fw-bold text-center text-white mb-4",
    "Explore NASA's Universe"
  );

  const formRow = createHtmlElement("div", "row justify-content-center");
  const col = createHtmlElement("div", "col-lg-8");

  const form = createHtmlElement(
    "form",
    "search-glass p-4 rounded-3 shadow-lg",
    "",
    { id: "searchForm" }
  );

  const row = createHtmlElement("div", "row g-3 align-items-end");

  const colSearch = createHtmlElement("div", "col-md-5");
  const labelSearch = createHtmlElement(
    "label",
    "form-label text-white small",
    "Search Term",
    { for: "searchInput" }
  );
  const groupSearch = createHtmlElement("div", "input-group");
  const iconSearch = createHtmlElement(
    "span",
    "input-group-text bg-dark border-secondary text-primary"
  );
  iconSearch.innerHTML = `<i class="fas fa-search"></i>`;
  const inputSearch = createHtmlElement(
    "input",
    "form-control bg-dark text-light border-secondary",
    "",
    {
      type: "text",
      id: "searchInput",
      placeholder: "Mars, Galaxy, Nebula...",
    }
  );
  customAppendChild(groupSearch, iconSearch, inputSearch);
  customAppendChild(colSearch, labelSearch, groupSearch);

  const colMedia = createHtmlElement("div", "col-md-3");
  const labelMedia = createHtmlElement(
    "label",
    "form-label text-white small",
    "Media Type",
    { for: "mediaType" }
  );
  const selectMedia = createHtmlElement(
    "select",
    "form-select bg-dark text-light border-secondary",
    "",
    { id: "mediaType" }
  );
  ["All Types", "Image", "Video", "Audio"].forEach((label, index) => {
    const val = index === 0 ? "" : label.toLowerCase();
    selectMedia.appendChild(
      createHtmlElement("option", "", label, { value: val })
    );
  });
  customAppendChild(colMedia, labelMedia, selectMedia);

  const colYear = createHtmlElement("div", "col-md-2");
  const labelYear = createHtmlElement(
    "label",
    "form-label text-white small",
    "Year",
    { for: "yearInput" }
  );
  const inputYear = createHtmlElement(
    "input",
    "form-control bg-dark text-light border-secondary",
    "",
    {
      type: "number",
      id: "yearInput",
      min: 1900,
      max: 2100,
      placeholder: "Year",
    }
  );
  customAppendChild(colYear, labelYear, inputYear);

  const colSubmit = createHtmlElement("div", "col-md-2");
  const button = createHtmlElement("button", "btn btn-primary w-100", "", {
    type: "submit",
  });
  button.innerHTML = `<i class="fas fa-search me-1"></i> Search`;
  customAppendChild(colSubmit, button);
  customAppendChild(row, colSearch, colMedia, colYear, colSubmit);
  customAppendChild(form, row);
  customAppendChild(col, form);
  customAppendChild(formRow, col);
  customAppendChild(container, title);
  customAppendChild(container, formRow);
  customAppendChild(hero, container);
  const main = document.querySelector("main");
  customAppendChild(main, hero);

  const resultsSection = createHtmlElement("section", "container mb-5");
  const headerRow = createHtmlElement(
    "div",
    "d-flex justify-content-between align-items-center mb-4"
  );
  const resultsTitle = createHtmlElement(
    "h2",
    "h4 fw-bold text-light mb-0",
    "Search Results"
  );
  const resultsCount = createHtmlElement(
    "div",
    "text-secondary small",
    "0 results",
    { id: "resultsCount" }
  );

  customAppendChild(headerRow, resultsTitle, resultsCount);

  const resultsDiv = createHtmlElement("div", "row g-4", "", {
    id: "searchResults",
  });

  const loadMoreBtn = createHtmlElement(
    "button",
    "btn btn-outline-primary",
    "",
    {
      id: "loadMoreBtn",
      style: "display: none;",
    }
  );
  loadMoreBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i> Load More`;

  const loadMoreWrapper = createHtmlElement("div", "text-center mt-4");
  customAppendChild(loadMoreWrapper, loadMoreBtn);

  customAppendChild(resultsSection, headerRow, resultsDiv, loadMoreWrapper);
  customAppendChild(main, resultsSection);
  const savedSearch = JSON.parse(localStorage.getItem("lastSearch") || "{}");
  if (Object.keys(savedSearch).length) {
    inputSearch.value = savedSearch.q || "";
    selectMedia.value = savedSearch.mediaType || "";
    inputYear.value = savedSearch.year || "";
    fetchSearchResults(savedSearch);
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const searchState = {
      q: inputSearch.value.trim(),
      mediaType: selectMedia.value,
      year: inputYear.value,
    };
    fetchSearchResults(searchState);
  };
};

const renderSearchResults = (url, append = false) => {
  const resultsDiv = document.getElementById("searchResults");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!append) {
    resultsDiv.innerHTML = "";
    loadMoreBtn.style.display = "none";

    const loadingCol = createHtmlElement("div", "col-12");
    const loadingCard = createHtmlElement(
      "div",
      "card bg-dark border-secondary"
    );
    const loadingBody = createHtmlElement("div", "card-body text-center py-5");

    const spinner = createHtmlElement(
      "div",
      "spinner-border text-primary",
      "",
      { role: "status" }
    );
    const spinnerSpan = createHtmlElement(
      "span",
      "visually-hidden",
      "Loading..."
    );
    const loadingText = createHtmlElement(
      "p",
      "mt-3 mb-0 text-light",
      "Searching NASA's archives..."
    );

    customAppendChild(spinner, spinnerSpan);
    customAppendChild(loadingBody, spinner, loadingText);
    customAppendChild(loadingCard, loadingBody);
    customAppendChild(loadingCol, loadingCard);
    customAppendChild(resultsDiv, loadingCol);
  } else {
    loadMoreBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin me-2"></i> Loading...';
  }

  fetchDataWithXHR(
    url,
    (data) => {
      const items = data.collection?.items || [];
      const total = data.collection?.metadata?.total_hits || 0;

      const resultsCount = document.getElementById("resultsCount");
      resultsCount.textContent = `${total.toLocaleString()} results found`;

      if (!items.length) {
        resultsDiv.innerHTML = "";
        const noResultsCol = createHtmlElement("div", "col-12");
        const noResultsCard = createHtmlElement(
          "div",
          "card bg-dark border-secondary"
        );
        const noResultsBody = createHtmlElement(
          "div",
          "card-body text-center py-5"
        );

        const icon = createHtmlElement(
          "i",
          "fas fa-search text-secondary fs-1 mb-3"
        );
        const noResultsTitle = createHtmlElement(
          "h3",
          "h4 text-light",
          "No results found"
        );
        const noResultsText = createHtmlElement(
          "p",
          "text-secondary",
          "Try different search terms or filters"
        );

        customAppendChild(noResultsBody, icon, noResultsTitle, noResultsText);
        customAppendChild(noResultsCard, noResultsBody);
        customAppendChild(noResultsCol, noResultsCard);
        customAppendChild(resultsDiv, noResultsCol);

        loadMoreBtn.style.display = "none";
        return;
      }

      if (!append) {
        resultsDiv.innerHTML = "";
      }

      items.forEach((item) => {
        const cardElem = mediaCard(item);
        customAppendChild(resultsDiv, cardElem);
      });

      const nextUrl = data.collection.links?.find(
        (link) => link.rel === "next"
      )?.href;

      if (total > items.length && nextUrl) {
        loadMoreBtn.style.display = "block";
        loadMoreBtn.innerHTML = '<i class="fas fa-plus me-2"></i> Load More';
        loadMoreBtn.onclick = () => renderSearchResults(nextUrl, true);
      } else {
        loadMoreBtn.style.display = "none";
      }
    },
    (error) => {
      console.error("XHR error:", error);

      resultsDiv.innerHTML = "";
      const errorCol = createHtmlElement("div", "col-12");
      const errorCard = createHtmlElement(
        "div",
        "card bg-dark border-secondary"
      );
      const errorBody = createHtmlElement("div", "card-body text-center py-5");

      const errorIcon = createHtmlElement(
        "i",
        "fas fa-exclamation-triangle text-danger fs-1 mb-3"
      );
      const errorTitle = createHtmlElement(
        "h3",
        "h4 text-light",
        "Search failed"
      );
      const errorText = createHtmlElement(
        "p",
        "text-secondary",
        "Please try again later"
      );

      customAppendChild(errorBody, errorIcon, errorTitle, errorText);
      customAppendChild(errorCard, errorBody);
      customAppendChild(errorCol, errorCard);
      customAppendChild(resultsDiv, errorCol);

      loadMoreBtn.style.display = "none";
    },
    "GET"
  );
};

const mediaCard = (item) => {
  const data = item.data?.[0] || {};
  const thumb = item.links?.[0]?.href || "";
  const id = data.nasa_id;
  const title = data.title || "Untitled";
  const desc = data.description ? `${data.description.slice(0, 120)}...` : "";
  const type = data.media_type || "unknown";
  const year = data.date_created
    ? new Date(data.date_created).getFullYear()
    : "";

  const itemObj = { id, title, thumb, type, desc };

  const cardCol = createHtmlElement("div", "col-12 col-sm-6 col-md-4 col-lg-3");

  const card = createHtmlElement(
    "div",
    "card card-hover-effect bg-dark text-light h-100 shadow border-secondary",
    "",
    { style: "position: relative;" }
  );

  const imgWrapper = createHtmlElement(
    "div",
    "position-relative overflow-hidden",
    "",
    { style: "height: 180px;" }
  );

  const image = createHtmlElement("img", "w-100 h-100 object-fit-cover", "", {
    src: thumb,
    alt: title,
    style: "transition: transform 0.5s ease;",
    loading: "lazy",
  });

  const badgeWrapper = createHtmlElement(
    "div",
    "position-absolute top-0 end-0 m-2"
  );

  const badgeColor =
    type === "image"
      ? "bg-primary"
      : type === "video"
      ? "bg-danger"
      : "bg-info";

  const badge = createHtmlElement("span", `badge ${badgeColor}`, type);

  customAppendChild(badgeWrapper, badge);
  customAppendChild(imgWrapper, image, badgeWrapper);

  const cardBody = createHtmlElement("div", "card-body d-flex flex-column");

  const titleEl = createHtmlElement("h5", "card-title text-primary", title);

  const descEl = createHtmlElement(
    "p",
    "card-text small text-secondary mb-3",
    desc
  );

  const footer = createHtmlElement("div", "mt-auto");

  const footerTop = createHtmlElement(
    "div",
    "d-flex justify-content-between align-items-center"
  );

  const yearBadge = createHtmlElement(
    "span",
    "badge bg-dark border border-secondary",
    year
  );

  const dropdownWrapper = createHtmlElement("div", "dropdown", "", {
    style: "position: static;",
  });

  const dropdownBtn = createHtmlElement(
    "button",
    "btn btn-sm btn-outline-secondary dropdown-toggle",
    "",
    {
      type: "button",
      id: "dropdownMenuButton",
      "data-bs-toggle": "dropdown",
      "aria-expanded": "false",
      "data-bs-offset": "10,20",
    }
  );

  dropdownBtn.innerHTML = `<i class="fas fa-ellipsis-h"></i>`;

  const dropdownMenu = createHtmlElement(
    "ul",
    "dropdown-menu dropdown-menu-dark dropdown-menu-end",
    "",
    {
      "aria-label": "dropdownMenuButton",
      style: "position: absolute; z-index: 9999;",
    }
  );

  const viewItem = createHtmlElement("li");
  let isFav = true;
  const viewLink = createHtmlElement("a", "dropdown-item", "", {
    href: `#/detail/${id}`,
  });
  viewLink.innerHTML = `<i class="fas fa-eye me-2"></i>View Details`;

  const favItem = createHtmlElement("li");

  const favBtn = createHtmlElement("button", "dropdown-item favoriteBtn", "", {
    "data-id": id,
    "data-title": title,
    "data-thumb": thumb,
    "data-type": type,
    "data-desc": desc,
  });
  favBtn.innerHTML = `
    <i class="${isFav ? "fas" : "far"} fa-star me-2"></i>
    ${isFav ? "Remove Favorite" : "Add Favorite"}
  `;

  customAppendChild(viewItem, viewLink);
  customAppendChild(favItem, favBtn);
  customAppendChild(dropdownMenu, viewItem, favItem);
  customAppendChild(dropdownWrapper, dropdownBtn, dropdownMenu);
  customAppendChild(footerTop, yearBadge, dropdownWrapper);

  customAppendChild(footer, footerTop);
  customAppendChild(cardBody, titleEl, descEl, footer);
  customAppendChild(card, imgWrapper, cardBody);
  customAppendChild(cardCol, card);

  return cardCol;
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
    case "/search":
      renderSearchPage();
      break;

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
