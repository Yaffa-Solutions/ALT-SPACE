document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});

const renderHome = () => {
  let main = document.querySelector("main");
  main.appendChild(renderHeroSection());
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

const getRandomSpaceFact = () => {
  const getRandomDate = () => {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
  };

  const date = getRandomDate();
  const apiKey = 'DEMO_KEY';
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      renderRandomFactSection(data);
    } else {
      alert('Failed to fetch space fact.');
    }
  };

  xhr.send();
};
const renderRandomFactSection = (data) => {
  const main = document.querySelector('main');
  main.innerHTML = '';

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
  main.appendChild(section);
};