const NASA_SEARCH_API = "https://images-api.nasa.gov/search";
const News_API =
  "https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/news-release/feed/";

const renderHome = () => {
  let main = document.querySelector("main");
  main.appendChild(renderHeroSection());
  main.appendChild(renderFeaturesSection());
  fetchDataWithXHR(
    News_API,
    (data) => {
      renderListNews(data);
      main.appendChild(renderCallToActionSection());
    },
    (error) => {
      console.log(error);
      main.appendChild(renderCallToActionSection());
    },
    "GET"
  );
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
      "position-absolute activeInd bottom-0 start-0 end-0 mx-auto bg-primary"
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
    "hero-section position-relative overflow-hidden text-center py-5 mb-5"
  );

  const stars = createHtmlElement("div", "stars", "");

  const shootingStars = createHtmlElement("div", "shooting-stars", "");

  const nebula = createHtmlElement("div", "nebula", "");

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
    "btn btn-primary btn-lg px-4 py-3 rounded-pill cosmic-btn cosmic-btn-responsive pulse-animation",
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
    "icon-wrapper bg-primary bg-opacity-10 rounded-circle p-4 mb-4 mx-auto"
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

const fetchData = ({ method, url, async, callback, index }) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, async);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      try {
        const response = JSON.parse(xhr.responseText);
        console.log(response);

        let fisrtFoundArray = null;

        if (!Array.isArray(response)) {
          for (const key in response) {
            if (Array.isArray(response[key])) {
              fisrtFoundArray = response[key];
              break;
            }
          }
        } else {
          fisrtFoundArray = response;
        }

        !index
          ? callback(fisrtFoundArray)
          : callback(fisrtFoundArray.length, index);
      } catch (er) {
        console.error("Error while parsing response:", er);
      }
    }
  };
  xhr.send();
};

let countLst = 6;
let showAll = true;
const renderListNews = (lst) => {
  const main = getElemnt("#app");

  const sectionHerader_card = createHtmlElement("section", "", "", {
    id: "sectionNews",
  });
  const sectionHeader = createHtmlElement(
    "div",
    "d-flex justify-content-between align-items-center mb-4"
  );
  const container_cards = createHtmlElement(
    "section",
    "row justify-content-center"
  );
  const sectionTitle = createHtmlElement(
    "h2",
    "fw-bold text-white py-4 m-0 text-start",
    "📡 Space News"
  );

  customAppendChild(sectionHeader, sectionTitle);
  customAppendChild(sectionHeader);

  lst.items.slice(0, countLst).forEach((i) => {
    const col = createHtmlElement("div", "col-12 col-md-4  mb-4 d-flex");
    const card = createHtmlElement(
      "div",
      "card border-primary bg-dark text-white  py-2 px-2 mb-3 h-100 position-relative"
    );
    const badge = createHtmlElement(
      "div",
      "position-absolute top-0 start-0 translate-middle-y badge bg-info text-white px-2 py-1 rounded-start-2 d-flex justify-content-center align-items-center",
      "News"
    );
    badge.style.width = "60px";
    badge.style.height = "30px";
    const cardBody = createHtmlElement("div", "card-body d-flex flex-column");
    customAppendChild(card, badge);

    const link = createHtmlElement(
      "a",
      "btn btn-outline-primary mt-auto align-self-start",
      "Read More",
      {
        href: i.link,
        target: "_blank",
      }
    );
    const title = createHtmlElement("h5", "fw-bold", `${i.title}`);
    const description = createHtmlElement(
      "p",
      "text-secondary",
      `${i.description.slice(0, 100) + "..."}`
    );
    const pubDate = createHtmlElement(
      "p",
      "text-start pt-2 text-secondary  mb-0",
      `${i.pubDate}`
    );

    customAppendChild(cardBody, title, description, link, pubDate);
    customAppendChild(card, cardBody);
    customAppendChild(col, card);
    customAppendChild(container_cards, col);
  });

  customAppendChild(sectionHerader_card, sectionHeader);
  customAppendChild(sectionHerader_card, container_cards);
  customAppendChild(main, sectionHerader_card);
};

let index = 0;

const main = getElemnt("#app");
const container_counters = createHtmlElement(
  "section",
  "d-flex justify-content-center gap-4 flex-wrap p-2 mt-100"
);

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
    "search-hero   position-relative py-5 mb-5"
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
    "btn loadMoreBtn btn-outline-primary",
    "",
    {
      id: "loadMoreBtn",
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
    "card media-card card-hover-effect bg-dark text-light h-100 shadow border-secondary"
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

  const dropdownWrapper = createHtmlElement("div", "dropdown dropdownWrapper");

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
    "dropdown-menu dropdown-menu-dark dropdown-menu-end"
  );

  const viewItem = createHtmlElement("li");
  const isFav = getFavorites().some((f) => f.id === id);
  const viewLink = createHtmlElement("a", "dropdown-item", "", {
    href: `#/detail/${id}`,
  });
  viewLink.innerHTML = `<i class="fas fa-eye me-2"></i>View Details`;

  const favItem = createHtmlElement("li");

  const favLink = createHtmlElement("a", "dropdown-item", "", {
    href: "#",
  });
  favLink.innerHTML = `<i class="${isFav ? "fas" : "far"} fa-star me-2"></i>${
    isFav ? "Remove Favorite" : "Add Favorite"
  }`;

  favLink.addEventListener("click", (e) => {
    e.preventDefault();
    let favs = getFavorites();
    const alreadyFav = favs.some((f) => f.id === id);

    if (alreadyFav) {
      favs = favs.filter((f) => f.id !== id);
      favLink.innerHTML = `<i class="far fa-star me-2"></i> Add Favorite`;
      showToast("Removed from favorites", "info");
    } else {
      favs.push(itemObj);
      favLink.innerHTML = `<i class="fas fa-star me-2"></i> Remove Favorite`;
      showToast("Added to favorites", "success");
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
  });

  favItem.appendChild(favLink);

  const albumRow = createHtmlElement(
    "div",
    "d-flex gap-2 align-items-center mt-3"
  );

  const albumSelect = createHtmlElement(
    "select",
    "form-select form-select-sm",
    "",
    {
      "aria-label": "Select album",
    }
  );

  const albums = getAlbums();

  if (albums.length === 0) {
    const opt = createHtmlElement("option", "", "No albums found");
    albumSelect.appendChild(opt);
    albumSelect.disabled = true;
  } else {
    const defaultOpt = createHtmlElement("option", "", "Add to album...", {
      selected: true,
      disabled: true,
    });
    albumSelect.appendChild(defaultOpt);

    albums.forEach((album, index) => {
      const option = createHtmlElement("option", "", album.name, {
        value: index,
      });
      albumSelect.appendChild(option);
    });
  }

  albumSelect.addEventListener("change", (e) => {
    const albums = getAlbums();
    const selectedIndex = e.target.value;
    const selectedAlbum = albums[selectedIndex];

    if (!selectedAlbum) return;

    if (selectedAlbum.items.some((i) => i.id === id)) {
      showToast("Item already in album", "warning");
      return;
    }

    selectedAlbum.items.push(itemObj);
    localStorage.setItem("albums", JSON.stringify(albums));
    showToast(`Added to ${selectedAlbum.name}`, "success");
    renderAlbumsGrid();
  });

  albumRow.appendChild(albumSelect);

  customAppendChild(viewItem, viewLink);
  customAppendChild(dropdownMenu, viewItem, favItem);
  customAppendChild(dropdownWrapper, dropdownBtn, dropdownMenu);
  customAppendChild(footerTop, yearBadge, dropdownWrapper);

  customAppendChild(footer, footerTop);
  customAppendChild(cardBody, titleEl, descEl, footer, albumRow);
  customAppendChild(card, imgWrapper, cardBody);
  customAppendChild(cardCol, card);

  return cardCol;
};

function renderFavorites() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const heroSection = createHtmlElement(
    "div",
    "bg-primary  heroSection text-white  text-center py-5 rounded-4 shadow-sm "
  );

  const heroTitle = createHtmlElement(
    "h1",
    "display-4 fw-bold mb-2",
    "⭐ Favorites Library"
  );

  const heroSub = createHtmlElement(
    "p",
    "lead opacity-75",
    "Explore your saved NASA images and videos."
  );

  customAppendChild(heroSection, heroTitle, heroSub);
  const listWrapper = createHtmlElement("div", "row g-4", "", {
    id: "favoritesList",
  });

  customAppendChild(main, heroSection, listWrapper);

  const favs = getFavorites();
  if (!favs.length) {
    const emptyMsg = createHtmlElement(
      "div",
      "col-12 text-center text-secondary fs-5",
      "🚫 No favorites yet."
    );
    listWrapper.appendChild(emptyMsg);
    return;
  }

  favs.forEach((fav) => {
    const col = createHtmlElement("div", "col-12 col-sm-6 col-md-4");
    const card = createHtmlElement(
      "div",
      "card bg-gradient bg-dark text-light h-100 border-0 shadow-lg rounded-4 overflow-hidden"
    );

    const img = createHtmlElement("img", "card-img-top object-fit-cover", "", {
      src: fav.thumb,
      alt: fav.title,
      loading: "lazy",
    });

    const cardBody = createHtmlElement(
      "div",
      "card-body d-flex flex-column p-4"
    );
    const titleEl = createHtmlElement(
      "h5",
      "card-title text-primary fw-bold mb-2",
      fav.title
    );
    const descEl = createHtmlElement(
      "p",
      "card-text small text-light opacity-75 mb-3",
      fav.desc
    );

    const badgeRow = createHtmlElement("div", "mb-3");
    const badge = createHtmlElement(
      "span",
      "badge rounded-pill bg-info text-dark px-3 py-2",
      fav.type
    );

    const btnGroup = createHtmlElement("div", "d-flex gap-2 mt-auto");

    const viewBtn = createHtmlElement(
      "button",
      "btn btn-outline-info w-50 fw-semibold",
      " View",
      {},
      {
        click: () =>
          (window.location.hash = `#/detail/${encodeURIComponent(fav.id)}`),
      }
    );

    const removeBtn = createHtmlElement(
      "button",
      "btn btn-outline-danger w-50 fw-semibold",
      " Remove",
      {
        "data-id": fav.id,
      },
      {
        click: () => {
          showConfirmDialog({
            message: `Are you sure you want to remove "${fav.title}" from your favorites?`,
            onConfirm: () => {
              let favs = getFavorites();
              favs = favs.filter((f) => f.id !== fav.id);
              localStorage.setItem("favorites", JSON.stringify(favs));
              renderFavorites();
            },
          });
        },
      }
    );

    customAppendChild(badgeRow, badge);
    customAppendChild(btnGroup, viewBtn, removeBtn);
    customAppendChild(cardBody, titleEl, descEl, badgeRow, btnGroup);
    customAppendChild(card, img, cardBody);
    customAppendChild(col, card);
    customAppendChild(listWrapper, col);
  });
}

function renderAlbums() {
  const main = document.querySelector("main");

  main.appendChild(createAlbumHeroSection());
  main.appendChild(createAlbumsContainer());
  const grid = renderAlbumsGrid();
  customAppendChild(main, grid);
  main.appendChild(createAlbumMediaSection());
}

const renderDetailPage = (id) => {
  const container = createHtmlElement("section", "container py-5");

  const backBtn = createHtmlElement(
    "button",
    "btn btn-outline-light mb-4",
    ``,
    { onclick: "history.back()" }
  );
  backBtn.innerHTML = '<i class="fas fa-arrow-left me-2"></i> Back';

  const spinner = createHtmlElement(
    "div",
    "d-flex justify-content-center spinner align-items-center "
  );
  spinner.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;

  const mediaContainer = createHtmlElement("div", "position-relative ", "", {
    id: "mediaContainer",
  });
  mediaContainer.appendChild(spinner);

  const mediaCol = createHtmlElement("div", "col-lg-8 ");
  mediaCol.appendChild(mediaContainer);

  const textCol = createHtmlElement("div", "col-lg-4");

  const cardBody = createHtmlElement(
    "div",
    "card-body p-4 h-100 d-flex flex-column"
  );

  const detailTitle = createHtmlElement(
    "h2",
    "card-title text-primary mb-3",
    "",
    { id: "detailTitle" }
  );
  const detailDesc = createHtmlElement("p", "card-text text-light", "", {
    id: "detailDesc",
  });
  const topContent = createHtmlElement("div", "mb-4");
  customAppendChild(topContent, detailTitle, detailDesc);

  const detailType = createHtmlElement("span", "badge bg-primary", "", {
    id: "detailType",
  });
  const detailDate = createHtmlElement("span", "badge bg-secondary", "", {
    id: "detailDate",
  });
  const detailCenter = createHtmlElement(
    "span",
    "badge bg-info text-dark",
    "",
    { id: "detailCenter" }
  );
  const badgeGroup = createHtmlElement(
    "div",
    "d-flex flex-wrap gap-2 mt-2 mb-4"
  );
  customAppendChild(badgeGroup, detailType, detailDate, detailCenter);

  const favoriteBtn = createHtmlElement(
    "button",
    "btn btn-warning flex-grow-1",
    "",
    { id: "favoriteBtn" }
  );
  favoriteBtn.innerHTML = '<i class="fas fa-star me-2"></i> Favorite';

  const shareBtn = createHtmlElement(
    "button",
    "btn btn-outline-light dropdown-toggle",
    "",
    {
      type: "button",
      "data-bs-toggle": "dropdown",
      "aria-expanded": "false",
    }
  );
  shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';

  const dropdownMenu = createHtmlElement(
    "ul",
    "dropdown-menu dropdown-menu-dark"
  );

  const linkItem = createHtmlElement("li");
  const linkBtn = createHtmlElement("button", "dropdown-item", "");
  linkBtn.innerHTML = '<i class="fas fa-link me-2"></i>Copy Link';
  linkItem.appendChild(linkBtn);

  customAppendChild(dropdownMenu, linkItem);

  const dropdown = createHtmlElement("div", "dropdown");
  customAppendChild(dropdown, shareBtn, dropdownMenu);

  const bottomActions = createHtmlElement("div", "d-flex gap-2");
  customAppendChild(bottomActions, favoriteBtn, dropdown);

  const bottomWrapper = createHtmlElement("div", "mt-auto");
  customAppendChild(bottomWrapper, badgeGroup, bottomActions);

  customAppendChild(cardBody, topContent, bottomWrapper);

  textCol.appendChild(cardBody);

  const row = createHtmlElement("div", "row g-0");
  customAppendChild(row, mediaCol, textCol);

  const card = createHtmlElement(
    "div",
    "card bg-dark text-light shadow-lg border-secondary overflow-hidden"
  );
  card.appendChild(row);

  customAppendChild(container, backBtn, card);
  const main = document.querySelector("main");
  customAppendChild(main, container);

  fetchDetailContent(id);
};

const fetchDetailContent = async (id) => {
  const url = `${NASA_SEARCH_API}?nasa_id=${id}`;
  fetchDataWithXHR(
    url,
    (data) => {
      const item = data.collection.items[0];
      if (!item) throw new Error("Not found");

      const media = item.data[0];
      const thumb = item.links?.[0]?.href || "";
      const title = media.title || "Untitled";
      const desc = media.description || "No description available.";
      const date = new Date(media.date_created).toLocaleDateString();
      const type = media.media_type || "unknown";
      const center = media.center || "NASA";
      const keywords = media.keywords || [];

      document.getElementById("detailTitle").textContent = title;
      document.getElementById("detailDesc").textContent = desc;
      document.getElementById("detailType").textContent = type;
      document.getElementById("detailDate").textContent = date;
      document.getElementById("detailCenter").textContent = center;

      const isFav = getFavorites().some((f) => f.id === id);

      const favoriteBtn = document.getElementById("favoriteBtn");
      favoriteBtn.innerHTML = isFav
        ? '<i class="fas fa-star me-2"></i> Favorited'
        : '<i class="far fa-star me-2"></i> Favorite';

      favoriteBtn.onclick = () => {
        let favs = getFavorites();
        const alreadyFav = favs.some((f) => f.id === id);

        if (alreadyFav) {
          favs = favs.filter((f) => f.id !== id);
          favoriteBtn.innerHTML = '<i class="far fa-star me-2"></i> Favorite';
        } else {
          favs.push({ id, title, thumb, type, desc });
          favoriteBtn.innerHTML = '<i class="fas fa-star me-2"></i> Favorited';
        }

        localStorage.setItem("favorites", JSON.stringify(favs));
      };

      const mediaContainer = document.getElementById("mediaContainer");
      if (type === "video") {
        mediaContainer.innerHTML = `
          <video controls class="w-100 mt-10" style="max-height:  600px;">
            <source src="${getVideoUrl(item)}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
      } else {
        mediaContainer.innerHTML = `
          <img src="${thumb}" alt="${title}" class="w-100" style="max-height: 600px; object-fit: contain;" />
        `;
      }

      if (keywords.length) {
        const keywordsContainer = document.createElement("div");
        keywordsContainer.className = "d-flex flex-wrap gap-2 mt-3";
        keywords.forEach((keyword) => {
          const badge = document.createElement("span");
          badge.className = "badge bg-dark border border-secondary";
          badge.textContent = keyword;
          keywordsContainer.appendChild(badge);
        });
        document
          .querySelector(".card-body")
          .insertBefore(keywordsContainer, document.querySelector(".mt-auto"));
      }
    },
    (error) => {
      console.log(error);
    },
    "GET"
  );
};

const getVideoUrl = (item) => {
  const id = item.data[0].nasa_id;
  return `https://images-assets.nasa.gov/video/${id}/${id}~orig.mp4`;
};

const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const renderCallToActionSection = () => {
  const section = createHtmlElement(
    "section",
    "container-fluid py-5 mb-5 ActionSection position-relative overflow-hidden"
  );

  const container = createHtmlElement("div", "container text-center py-5");

  const heading = createHtmlElement(
    "h2",
    "display-5 fw-bold text-white mb-4",
    "Ready to Explore the Universe?"
  );

  const paragraph = createHtmlElement(
    "p",
    "lead text-light mb-5",
    "Join millions of space enthusiasts discovering the wonders of our cosmos."
  );

  const launchBtn = createHtmlElement(
    "a",
    "btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg",
    ``,
    {
      href: "#/search",
    }
  );
  launchBtn.innerHTML = '<i class="fas fa-rocket me-2"></i> Launch Explorer';

  customAppendChild(container, heading, paragraph, launchBtn);
  customAppendChild(section, container);
  return section;
};

const renderRoute = () => {
  const main = document.querySelector("main");
  const hash = window.location.hash.replace("#", "") || "/";
  main.innerHTML = "";

  if (hash.startsWith("/detail/")) {
    const id = hash.split("/detail/")[1];
    console.log(id);

    renderDetailPage(id);
    return;
  }

  switch (hash) {
    case "/search":
      renderSearchPage();
      break;

    case "/favorites":
      renderFavorites();
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

// window.onscroll = () => {
//   const sectionHeader = getElemnt("#sectionNews");

//   if (!dataFetched && sectionHeader < window.innerHeight) {
//     dataFetched = true;
//     fetchData({
//       method: "GET",
//       url: "http://api.open-notify.org/astros.json",
//       async: true,
//       callback: RenderCounter,
//       index: 1,
//     });
//     fetchData({
//       method: "GET",
//       url: "https://api.le-systeme-solaire.net/rest/bodies/",
//       async: true,
//       callback: RenderCounter,
//       index: 2,
//     });
//     fetchData({
//       method: "GET",
//       url: "https://api.nasa.gov/DONKI/FLR?startDate=2024-01-01&endDate=2024-01-31&api_key=IiXIh24lEiBsGC0fzOEjuVdezSV84o4ZaM1bVOY8",
//       async: true,
//       callback: RenderCounter,
//       index: 3,
//     });
//   }
// };
