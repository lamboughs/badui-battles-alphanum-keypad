const $ = (q, multiple = false) =>
  multiple ? document.querySelectorAll(q) : document.querySelector(q);

window.onload = () => {
  console.log("ready...");
  
  renderKeys();
  
}

function renderKeys() {
  const keyTemplate = $("#key-tpl");
  const keypad = $(".keypad");
  
  keys.forEach(key => {
    keypad.innerHTML += `<div class="key flex flex-column">
      <div class="numeric">${key.num??""}</div>
      <div class="alpha">${key.alpha??""}</div>
      ${getKeyButtonHTML(key)}
    </div>`
  });
}

const getKeyButtonHTML = (keyData) => {
  const keyDataString = Object.values(keyData).join("");
  return `<button class="key-btn" onclick="handleKeyPress('${keyDataString}')"></button>`;
}

function handleKeyPress(keyData) {
  console.log(keyData);
}