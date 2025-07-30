function createAlbumHeroSection() {
  const section = createHtmlElement(
    "section",
    "album-hero position-relative py-5 mb-5",
    "",
    {
      style: `
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
        url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
        min-height: 300px;
      `,
    }
  );

  const container = createHtmlElement(
    "div",
    "container position-relative z-index-1 py-5"
  );
  const row = createHtmlElement(
    "div",
    "row justify-content-center text-center"
  );
  const col = createHtmlElement("div", "col-lg-8");

  const title = createHtmlElement(
    "h1",
    "display-4 fw-bold text-white mb-3",
    "Your Space Collections"
  );
  const desc = createHtmlElement(
    "p",
    "lead text-light mb-4",
    "Organize your cosmic discoveries into beautiful albums"
  );
  const btn = createHtmlElement(
    "button",
    "btn btn-primary btn-lg px-4 py-3 rounded-pill shadow-lg",
    "",
    { id: "createAlbumBtn" },
    {
      click: () => handleCreateAlbum(),
    }
  );
  btn.innerHTML = `<i class="fas fa-plus me-2"></i> Create New Album`;

  customAppendChild(col, title, desc, btn);
  customAppendChild(row, col);
  customAppendChild(container, row);
  customAppendChild(section, container);

  return section;
}

function createAlbumsContainer() {
  const section = createHtmlElement("section", "container mb-5");

  const header = createHtmlElement(
    "div",
    "d-flex justify-content-between align-items-center mb-4"
  );
  const title = createHtmlElement(
    "h2",
    "h4 fw-bold text-light mb-0",
    "Your Albums"
  );
  const count = createHtmlElement("div", "text-secondary small", "0 albums", {
    id: "albumsCount",
  });

  const grid = createHtmlElement("div", "", "", {
    id: "albumsGrid",
    class: "row g-4",
  });

  const mediaSection = createHtmlElement("div", "mt-5", "", {
    id: "albumMediaSection",
    style: "display: none;",
  });
  const mediaHeader = createHtmlElement(
    "div",
    "d-flex justify-content-between align-items-center mb-4"
  );
  const currentTitle = createHtmlElement(
    "h2",
    "h4 fw-bold text-light mb-0",
    "",
    { id: "currentAlbumTitle" }
  );
  const itemsCount = createHtmlElement(
    "div",
    "text-secondary small",
    "0 items",
    { id: "albumItemsCount" }
  );

  const mediaGrid = createHtmlElement("div", "row g-4", "", {
    id: "albumMedia",
  });

  customAppendChild(mediaHeader, currentTitle, itemsCount);
  customAppendChild(mediaSection, mediaHeader, mediaGrid);
  customAppendChild(header, title, count);
  customAppendChild(section, header, grid, mediaSection);

  return section;
}

function handleCreateAlbum() {
  showInputDialog({
    title: "Enter album name:",
    placeholder: "Album name",
    onConfirm: (name) => {
      if (!name) return;

      let albums = getAlbums();
      if (albums.some((a) => a.name === name)) {
        showToast("Album with this name already exists", "warning");
        return;
      }

      albums.push({
        name,
        items: [],
        created: new Date().toISOString(),
        cover: getRandomSpaceImage(),
      });

      localStorage.setItem("albums", JSON.stringify(albums));
      renderAlbumsGrid();
      showToast(`"${name}" album created!`, "success");
    },
  });
}

function renderAlbumsGrid() {
  const albumsGrid = document.getElementById("albumsGrid");
  albumsGrid.innerHTML = "";

  const albums = getAlbums();
  document.getElementById(
    "albumsCount"
  ).textContent = `${albums.length} albums`;

  if (!albums.length) {
    const emptyCol = createHtmlElement("div", "col-12");
    const card = createHtmlElement(
      "div",
      "card bg-dark border-secondary text-center p-5"
    );
    const icon = createHtmlElement(
      "i",
      "fas fa-folder-open text-secondary fs-1 mb-3"
    );
    const msg = createHtmlElement(
      "p",
      "text-secondary mb-0",
      "No albums yet. Create one to get started!"
    );
    customAppendChild(card, icon, msg);
    customAppendChild(emptyCol, card);
    customAppendChild(albumsGrid, emptyCol);

    return;
  }

  albums.forEach((album, index) => {
    albumsGrid.appendChild(createAlbumCard(album, index));
  });
  return albumsGrid;
}

function createAlbumCard(album, index) {
  const { name, items, created, cover } = album;

  const col = createHtmlElement("div", "col-12 col-sm-6 col-md-4 col-lg-3");
  const card = createHtmlElement(
    "div",
    "card bg-dark text-light h-100 shadow border-secondary"
  );

  const imgWrapper = createHtmlElement(
    "div",
    "position-relative overflow-hidden",
    "",
    {
      style: "height: 180px;",
    }
  );
  const img = createHtmlElement("img", "w-100 h-100 object-fit-cover", "", {
    src: cover,
    alt: name,
    loading: "lazy",
    style: "transition: transform 0.5s ease;",
  });

  const badge = createHtmlElement(
    "span",
    "badge bg-primary position-absolute top-0 end-0 m-2",
    `${items.length} items`
  );
  customAppendChild(imgWrapper, img, badge);

  const cardBody = createHtmlElement("div", "card-body d-flex flex-column");
  const title = createHtmlElement("h5", "card-title text-primary", name);
  const subtitle = createHtmlElement(
    "p",
    "card-text small text-secondary mb-3",
    `Created on ${new Date(created).toDateString()}`
  );

  const btnGroup = createHtmlElement(
    "div",
    "mt-auto d-flex justify-content-between"
  );
  const viewBtn = createHtmlElement(
    "button",
    "btn btn-outline-primary btn-sm",
    "View",
    {},
    {
      click: () => renderAlbumMedia(index),
    }
  );
  const deleteBtn = createHtmlElement(
    "button",
    "btn btn-outline-danger btn-sm",
    "Delete",
    {},
    {
      click: () => {
        showConfirmDialog({
          message: `Delete album "${name}"?`,
          onConfirm: () => {
            deleteAlbum(index);
          },
        });
      },
    }
  );

  customAppendChild(btnGroup, viewBtn, deleteBtn);
  customAppendChild(cardBody, title, subtitle, btnGroup);
  customAppendChild(card, imgWrapper, cardBody);
  customAppendChild(col, card);

  return col;
}

function renderAlbumMedia(index) {
  const album = getAlbums()[index];
  const { name, items } = album;

  const mediaSection = document.getElementById("albumMediaSection");
  const titleEl = document.getElementById("currentAlbumTitle");
  const countEl = document.getElementById("albumItemsCount");
  const mediaGrid = document.getElementById("albumMedia");

  mediaSection.style.display = "block";
  titleEl.textContent = name;
  countEl.textContent = `${items.length} items`;
  mediaGrid.innerHTML = "";

  if (!items.length) {
    const emptyCol = createHtmlElement("div", "col-12");
    const card = createHtmlElement(
      "div",
      "card bg-dark border-secondary text-center p-5"
    );
    const icon = createHtmlElement(
      "i",
      "fas fa-photo-video text-secondary fs-1 mb-3"
    );
    const msg = createHtmlElement(
      "p",
      "text-secondary mb-0",
      "This album is empty"
    );
    customAppendChild(card, icon, msg);
    emptyCol.appendChild(card);
    mediaGrid.appendChild(emptyCol);
    return;
  }

  items.forEach((item) => {
    mediaGrid.appendChild(mediaCardElement(item, index));
  });
}

function mediaCardElement(item, albumIndex) {
  const col = createHtmlElement("div", "col-12 col-sm-6 col-md-4 col-lg-3");

  const card = createHtmlElement(
    "div",
    "card card-hover-effect bg-dark text-light h-100 border-secondary"
  );

  const mediaWrapper = createHtmlElement("div", "position-relative", "", {
    style: "height: 180px; overflow: hidden;",
  });

  const mediaThumb = createHtmlElement(
    "img",
    "w-100 h-100 object-fit-cover",
    "",
    {
      src: item.thumb,
      alt: item.title,
      loading: "lazy",
    }
  );

  const badgeWrapper = createHtmlElement(
    "div",
    "position-absolute top-0 end-0 m-2"
  );

  const badge = createHtmlElement(
    "span",
    `badge ${
      item.type === "image"
        ? "bg-primary"
        : item.type === "video"
        ? "bg-danger"
        : "bg-info"
    }`,
    item.type
  );

  const cardBody = createHtmlElement("div", "card-body d-flex flex-column");
  const title = createHtmlElement(
    "h5",
    "card-title text-primary fs-6",
    item.title
  );

  const actionWrapper = createHtmlElement("div", "mt-auto");
  const btnGroup = createHtmlElement(
    "div",
    "d-flex justify-content-between align-items-center"
  );

  const viewBtn = createHtmlElement("a", "btn btn-sm btn-outline-info", "", {
    href: `#/detail/${item.id}`,
  });
  viewBtn.innerHTML = `<i class="fas fa-expand me-1"></i> View`;

  const removeBtn = createHtmlElement(
    "button",
    "btn btn-sm btn-outline-danger remove-from-album-btn",
    "",
    {},
    {
      click: () => {
        let albums = getAlbums();
        albums[albumIndex].items = albums[albumIndex].items.filter(
          (i) => i.id !== item.id
        );
        localStorage.setItem("albums", JSON.stringify(albums));

        renderAlbumMedia(albumIndex);
        renderAlbumsGrid();

        showToast("Item removed from album", "warning");
      },
    }
  );
  removeBtn.innerHTML = `<i class="fas fa-times me-1"></i> Remove`;

  customAppendChild(badgeWrapper, badge);
  customAppendChild(mediaWrapper, mediaThumb, badgeWrapper);
  customAppendChild(btnGroup, viewBtn, removeBtn);
  customAppendChild(actionWrapper, btnGroup);
  customAppendChild(cardBody, title, actionWrapper);
  customAppendChild(card, mediaWrapper, cardBody);
  col.appendChild(card);

  return col;
}

function deleteAlbum(index) {
  const albums = getAlbums();
  albums.splice(index, 1);
  localStorage.setItem("albums", JSON.stringify(albums));
  renderAlbumsGrid();
  showToast("Album deleted", "danger");
}

function getAlbums() {
  return JSON.parse(localStorage.getItem("albums") || "[]");
}

function getRandomSpaceImage() {
  const images = [
    "photo-1462331940025-496dfbfc7564",
    "photo-1454789548928-9efd52dc4031",
    "photo-1464802686167-b939a6910659",
    "photo-1506318137071-a8e063b4bec0",
    "photo-1451187580459-43490279c0fa",
    "photo-1506443432602-ac2fcd6f54e0",
  ];
  const id = images[Math.floor(Math.random() * images.length)];
  return `https://images.unsplash.com/${id}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`;
}
