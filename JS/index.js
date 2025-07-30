document.addEventListener("DOMContentLoaded", () => {
  document.body.prepend(renderNavbar());
  renderHome();

});


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



const fetch =({method,url,async, callback, index})=>{
  
  const xhr = new XMLHttpRequest();
  xhr.open(method,url,async);
  xhr.onreadystatechange =()=>{
    if(xhr.readyState == 4 && xhr.status ==200){
        try{      
            const response = JSON.parse(xhr.responseText);
            console.log(response); 

            let fisrtFoundArray = null;

          if(!Array.isArray(response)){
           for(const key in response){
              if(Array.isArray(response[key])){
                fisrtFoundArray = response[key];
                break;
              }
            }
          }else{
            fisrtFoundArray = response;
          }
          
            !(index)? callback(fisrtFoundArray) : callback(fisrtFoundArray.length,index);
        }catch(er){
           console.error('Error while parsing response:',er);
      }           
    }
}
xhr.send();
}



 let countLst = 6;
 let showAll = true;
const renderListNews = (lst) => {
  
  const main = getElemnt('#app'); 

  const sectionHerader_card= createHtmlElement('section','','',{id:"sectionNews"});
  const sectionHeader = createHtmlElement('div', 'd-flex justify-content-between align-items-center mb-4');
  const container_cards = createHtmlElement('section','row justify-content-center');
  const sectionTitle = createHtmlElement('h2', 'fw-bold text-white py-4 m-0 text-start', '📡 Space News');
  const viewMoreBtn = createHtmlElement('button', 'btn btn-outline-info',showAll ? ' View More' : 'View less');
  customAppendChild(sectionHeader, sectionTitle);
  customAppendChild(sectionHeader, viewMoreBtn);

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

  lst.slice(0,countLst).forEach((i) => {
    const col = createHtmlElement('div', 'col-12 col-md-4  mb-4 d-flex');
    const card = createHtmlElement('div', 'card border-primary bg-dark text-white  py-2 px-2 mb-3 h-100 position-relative');
    const badge = createHtmlElement('div','position-absolute top-0 start-0 translate-middle-y badge bg-info text-white px-2 py-1 rounded-start-2 d-flex justify-content-center align-items-center', 'News');
    badge.style.width = '60px';
    badge.style.height = '30px';
    const cardBody = createHtmlElement('div', 'card-body d-flex flex-column');
    customAppendChild(card, badge);

    const link = createHtmlElement('a', 'btn btn-outline-primary mt-auto align-self-start', 'Read More', {href: i.link });
    const title = createHtmlElement('h5', 'fw-bold', `${i.title}`);
    const description=createHtmlElement('p', 'text-secondary', `${i.description.slice(0,100)+'...'}`) ;
    const pubDate=createHtmlElement('p', 'text-start pt-2 text-secondary  mb-0', `${i.pubDate}`);

    customAppendChild(cardBody,title ,description, link ,  pubDate);
    customAppendChild(card, cardBody);
    customAppendChild(col,card );
    customAppendChild(container_cards, col );
   
  });

  customAppendChild(sectionHerader_card , sectionHeader);
  customAppendChild(sectionHerader_card , container_cards);
  customAppendChild(main, sectionHerader_card);
   renderInitialCounter('Number of astronauts');
   renderInitialCounter('Number of bodies');
   renderInitialCounter('Number of flares');
};



let index = 0;

const main = getElemnt('#app'); 
const container_counters = createHtmlElement('section','d-flex justify-content-center gap-4 flex-wrap p-2 mt-100'); 
const renderInitialCounter=(content)=>{
  index +=1;
  const divCounter_content = createHtmlElement('div', 'd-flex flex-column align-items-center justify-content-center text-center p-3');  
  const counterText = createHtmlElement('h2','text-white','0',{id:`counter-${index}`});
  const titleCounter = createHtmlElement('h5','fw-bold text-white  text-center',content);

   customAppendChild(divCounter_content , counterText);
   customAppendChild(divCounter_content,titleCounter); 
   customAppendChild(container_counters , divCounter_content);
   customAppendChild(main,container_counters);
}

const RenderCounter=(counter , index)=>{
  
  let currentCount = 0;
  const animationSpeed = 15;
  const intervalId=setInterval(()=>{
      if(currentCount < counter){
        currentCount++;
        getElemnt(`#counter-${index}`).textContent = currentCount;
      }else{
        clearInterval(intervalId);
      }
  },animationSpeed);

}

 

const renderRoute = () => {
  const main = document.querySelector("main");
  const hash = window.location.hash.replace("#", "") || "/";
  main.innerHTML = "";

  switch (hash) {
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


fetch({method:'GET',url:'https://api.rss2json.com/v1/api.json?rss_url=https://www.nasa.gov/news-release/feed/',async:true,callback:renderListNews});

 let dataFetched = false;

window.onscroll=()=>{
  const sectionHeader=getElemnt('#sectionNews').getBoundingClientRect().top;

  if (!dataFetched && sectionHeader < window.innerHeight) {
    dataFetched = true;
  fetch({method:'GET',url:'http://api.open-notify.org/astros.json',async:true,callback:RenderCounter,index:1});
  fetch({method:'GET',url:'https://api.le-systeme-solaire.net/rest/bodies/',async:true,callback:RenderCounter,index:2});
  fetch({method:'GET',url:'https://api.nasa.gov/DONKI/FLR?startDate=2024-01-01&endDate=2024-01-31&api_key=IiXIh24lEiBsGC0fzOEjuVdezSV84o4ZaM1bVOY8',async:true,callback:RenderCounter,index:3})
}

}