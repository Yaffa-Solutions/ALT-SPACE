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

const getElemnt = (elem) => document.querySelector(elem);

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

const showToast = (message, type = "info") => {
  const toast = createHtmlElement(
    "div",
    `toast show align-items-center text-white bg-${type} border-0`,
    "",
    {
      style: "position: fixed; bottom: 20px; right: 20px; z-index: 9999;",
    }
  );

  const toastBody = createHtmlElement("div", "toast-body", message);

  const closeButton = createHtmlElement(
    "button",
    "btn-close btn-close-white me-2 m-auto",
    "",
    {
      type: "button",
      "data-bs-dismiss": "toast",
      "aria-label": "Close",
    }
  );

  const toastContent = createHtmlElement("div", "d-flex");
  customAppendChild(toastContent, toastBody, closeButton);
  toast.appendChild(toastContent);
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

const showInputDialog = ({
  title = "Enter input",
  placeholder = "",
  onConfirm,
  onCancel,
}) => {
  const overlay = createHtmlElement("div", "dialog-overlay", "", {
    style: `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
      z-index: 10000;
    `,
  });

  const dialog = createHtmlElement(
    "div",
    "dialog-box bg-dark text-light p-4 rounded shadow",
    "",
    {
      style: "width: 370px; max-width: 90vw;",
    }
  );

  const titleEl = createHtmlElement("h3", "mb-3", title);

  const input = createHtmlElement("input", "form-control mb-3", "", {
    type: "text",
    placeholder,
  });

  const btnContainer = createHtmlElement(
    "div",
    "d-flex justify-content-end gap-2"
  );

  const cancelBtn = createHtmlElement(
    "button",
    "btn btn-secondary",
    "Cancel",
    {},
    {
      click: () => {
        if (onCancel) onCancel();
        overlay.remove();
      },
    }
  );

  const okBtn = createHtmlElement(
    "button",
    "btn btn-primary",
    "OK",
    {},
    {
      click: () => {
        const val = input.value.trim();
        if (val === "") {
          input.focus();
          return;
        }
        if (onConfirm) onConfirm(val);
        overlay.remove();
      },
    }
  );

  customAppendChild(btnContainer, cancelBtn, okBtn);
  customAppendChild(dialog, titleEl, input, btnContainer);
  customAppendChild(overlay, dialog);
  customAppendChild(document.body, overlay);
};

const showConfirmDialog = ({
  message = "Are you sure?",
  onConfirm,
  onCancel,
}) => {
  const overlay = createHtmlElement("div", "dialog-overlay", "", {
    style: `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
      z-index: 10000;
    `,
  });

  const dialog = createHtmlElement(
    "div",
    "dialog-box bg-dark text-light p-4 rounded shadow",
    "",
    {
      style: "width: 300px; max-width: 90vw;",
    }
  );

  const msgEl = createHtmlElement("p", "mb-4", message);

  const btnContainer = createHtmlElement(
    "div",
    "d-flex justify-content-end gap-2"
  );

  const cancelBtn = createHtmlElement(
    "button",
    "btn btn-secondary",
    "Cancel",
    {},
    {
      click: () => {
        if (onCancel) onCancel();
        overlay.remove();
      },
    }
  );

  const yesBtn = createHtmlElement(
    "button",
    "btn btn-danger",
    "Yes",
    {},
    {
      click: () => {
        if (onConfirm) onConfirm();
        overlay.remove();
      },
    }
  );

  customAppendChild(btnContainer, cancelBtn, yesBtn);
  customAppendChild(dialog, msgEl, btnContainer);
  customAppendChild(overlay, dialog);
  customAppendChild(document.body, overlay);
};

const renderDetailError = () => {
  const icon = createHtmlElement("i", "fas fa-exclamation-triangle fs-1 mb-3");
  const heading = createHtmlElement("h2", "h4", "Failed to load media details");
  const paragraph = createHtmlElement("p", "mb-0", "Please try again later");

  const cardBody = createHtmlElement("div", "card-body text-center py-5");
  customAppendChild(cardBody, icon, heading, paragraph);

  const card = createHtmlElement(
    "div",
    "card bg-dark text-danger border-danger",
    null,
    cardBody
  );
  const container = createHtmlElement("div", "container py-5", null, card);

  app.innerHTML = "";
  app.appendChild(container);
};
