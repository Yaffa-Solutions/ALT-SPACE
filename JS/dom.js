const createHtmlElement = (
  tag,
  className = "",
  content = "",
  attributes = {},
  events = {}
) => {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (content && tag !== "img" && tag !== "input") {
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

const getElemnt=(elem)=> document.querySelector(elem);
const fetchDataWithXHR = (url, onSuccess, onError, method) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    if (xhr.status === 200) {
      try {
        const data = JSON.parse(xhr.responseText);
        onSuccess(data);
      } catch (e) {
        onError(e);
      }
    } else {
      onError(new Error(`Request failed with status ${xhr.status}`));
    }
  };

  xhr.send();
};

