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


const createElem = (tag, classes = '', text = "") => {
  let element = document.createElement(tag);
 element.className = classes;
  element.textContent = text;
  return element;
};
const appendParent = (parent, child) => {
    parent.appendChild(child);
};

