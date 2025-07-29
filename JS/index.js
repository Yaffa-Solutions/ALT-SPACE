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



//////////////Nada 


const fetch =(url, callback)=>{
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET',url,true);
  xhr.onreadystatechange =()=>{
    if(xhr.readyState == 4 && xhr.status ==200){
        try{      
            const response = JSON.parse(xhr.responseText);
            console.log(response); 
            callback(response.items);
        }catch(er){
                console.error('Error while parsing response:',er);
        }
           
    }else{
        console.error('Failed to fetch Data. Status code:',xhr.status);
    }
   
}
xhr.send();
}


const getElemnt=(elem)=> document.querySelector(elem);
 let countLst = 6;
 let showAll = true;
const renderListNews = (lst) => {
  
  const main = getElemnt('#app'); 

  const sectionHerader_card= createHtmlElement('section');
  sectionHerader_card.id="sectionNews";
  const sectionHeader = createHtmlElement('div', 'd-flex justify-content-between align-items-center mb-4');
  const container_cards = createHtmlElement('section');
  const sectionTitle = createHtmlElement('h2', 'fw-bold text-white py-4 m-0', '📡 Space News');
  const viewMoreBtn = createHtmlElement('button', 'btn btn-outline-info',showAll ? ' View More' : 'View less');
  container_cards.className = 'row justify-content-center';

  
  viewMoreBtn.onclick=()=>{
  getElemnt('#sectionNews').remove();
 
   if(showAll){
   countLst=lst.length 
   }else{
    countLst =6;
  }
     showAll =!showAll;  
     renderListNews(lst);
  }

  appendParent(sectionHeader, sectionTitle);
  appendParent(sectionHeader, viewMoreBtn);
  //appendParent(main, sectionHeader);


  lst.slice(0,countLst).forEach((i) => {
    const col = createHtmlElement('div', 'col-12 col-md-4  mb-4 d-flex');
    const card = createHtmlElement('div', 'card border-primary  py-2 px-2 mb-3 h-100 position-relative');
    const badge = createHtmlElement('div', 'bg-info text-white px-2 py-1 position-absolute rounded-start');
    badge.textContent = 'News';
    badge.style.top = '0';
    badge.style.left = '0';
    badge.style.transform = 'translateY(-50%)';
    const cardBody = createHtmlElement('div', 'card-body d-flex flex-column');
    appendParent(card, badge);
    appendParent(cardBody, createHtmlElement('h5', 'fw-bold', `${i.title}`));
    appendParent(cardBody, createHtmlElement('p', '', `${i.description.slice(0,100)+'...'}`));
    const link = createHtmlElement('a', 'btn btn-outline-primary', 'Read More');
    link.style.alignSelf = 'flex-start';
     link.style.marginTop = 'auto';
    link.href = i.link; 
    appendParent(cardBody, link);
    appendParent(cardBody, createHtmlElement('p', 'text-start pt-2 text-muted  mb-0', `${i.pubDate}`));
    appendParent(card, cardBody);
    appendParent(col, card);
    appendParent(container_cards, col);
  });

  appendParent(sectionHerader_card , sectionHeader);
  appendParent(sectionHerader_card , container_cards);
  appendParent(main, sectionHerader_card);

  // fetch('http://api.open-notify.org/astros.json',RenderCounter);
  RenderCounter([{counter :astronautCount,content:'Number of astronauts'},{counter :200,content:'Number of astronauts2'} , {counter :160,content:'Number of astronauts3'}]);
};







const RenderCounter=(lst)=>{
    const main = getElemnt('#app'); 
  const container_counters = createHtmlElement('section','d-flex justify-content-evenly p-2 mt-18 ');
  container_counters.style.marginTop = '100px';
  lst.forEach((obj,index)=>{


    const {counter , content} = obj;
const divCounter_content = createHtmlElement('div', 'd-flex flex-column align-items-center justify-content-center text-center p-3');   const counterDiv = createHtmlElement('h2','text-white');
  counterDiv.id=`counter-${index}`;

  const titleCounter = createHtmlElement('h5','fw-bold text-white  text-center');
   titleCounter.textContent =content;

   appendParent(divCounter_content , counterDiv);
   appendParent(divCounter_content,titleCounter);

  // appendParent(container_counters,counterDiv); 
  // appendParent(container_counters,titleCounter);

  appendParent(container_counters , divCounter_content);
  appendParent(main,container_counters);
  let currentCount = 0;
 // const targetCount = 100;
  const animationSpeed = 20;

  setInterval(()=>{
      if(currentCount < counter){
        currentCount++;
        getElemnt(`#counter-${index}`).textContent = currentCount;
      }else{
        clearInterval();
      }
  },animationSpeed);

  });
 
}

fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/news-release/feed/',renderListNews);
