const createHtmlElement = ({
  tag,
  className = '',
  content = '',
  attributes = {},
  events = {},
}) => {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (content && tag !== 'img' && tag !== 'input') {
    element.textContent = content;
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  Object.entries(events).forEach(([eventName, handler]) => {
    element.addEventListener(eventName, handler);
  });

  return element;
};

const customAppendChild = (parent, ...children) => {
  children.forEach((child) => parent.appendChild(child));
};
const fetch = (method, url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      } else {
        console.error(`Error fetching data ${xhr.status} ${xhr.statusText}`);
      }
    }
  };
  xhr.send();
};
const fetchFactsForSameDay = (callback) => {
  const apiKey = 'BBMsCZoVKg5JjsYQZx9s8hYD7a6lqb9unHqF54Ob';
  const dates = getPastDatesSameDay(5);

  dates.forEach((date) => {
    fetch(
      'GET',
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`,
      callback
    );
  });
};

const createFactsSection = () => {
  let section = document.querySelector('#facts-section');

  if (!section) {
    section = document.createElement('section');
    section.id = 'facts-section';
    section.classList.add('container', 'my-5');

    const heading = createHtmlElement(
      'h2',
      'fw-bold text-center mb-5 text-primary',
      'Astronomy Facts'
    );

    const wrapper = createHtmlElement('div', 'row g-4', '', {
      id: 'facts-wrapper',
    });

    customAppendChild(section, heading, wrapper);
    document.body.appendChild(section);
  }

  return section;
};

const renderFactCard = (data) => {
  const wrapper = createFactsSection();

  const col = createHtmlElement('div', 'col-md-6 col-lg-4');

  const card = createHtmlElement(
    'div',
    'card gradient-bg text-white h-100 border-0 shadow-lg rounded-3 overflow-hidden'
  );

  const media =
    data.media_type === 'image'
      ? createHtmlElement('img', 'card-img-top', '', {
          src: data.url,
          alt: data.title,
        })
      : createHtmlElement('iframe', 'card-img-top', '', {
          src: data.url,
          allowfullscreen: true,
          frameborder: 0,
          style: 'height: 250px;',
        });

  const body = createHtmlElement('div', 'card-body text-center p-4');

  const title = createHtmlElement('h5', 'fw-bold mb-2', data.title);
  const date = createHtmlElement('p', 'text-info small mb-3', `${data.date}`);
  const explanation = createHtmlElement('p', 'mb-0 small', data.explanation);

    const toggleBtn = createHtmlElement(
      'button',
      'btn btn-sm btn-outline-light mt-2',
      'See more'
    );

    toggleBtn.addEventListener('click', () => {
      explanation.classList.toggle('clamped-text');
      toggleBtn.textContent = explanation.classList.contains('clamped-text')
        ? 'See more'
        : 'See less';
    });

  customAppendChild(body, title, date, explanation, toggleBtn);
  customAppendChild(card, media, body);
  col.appendChild(card);
  wrapper.appendChild(col);
};
