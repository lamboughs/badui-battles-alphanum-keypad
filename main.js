const $ = (q, multiple = false) =>
  multiple ? document.querySelectorAll(q) : document.querySelector(q);
let activeKeys=[];
let activeKeyIndex = 0;
let activeInput = null;
let keyTimeout;


window.onload = () => {
  console.log("ready...");
  
  const usernameInput = $("#username-in");
  const passwordInput = $("#password-in");

  activeInput = usernameInput;
  
  renderKeys();
}

function renderKeys() {
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

const handleKeyPress = (keyData) => {
  
  if(activeKeys.join("") === keyData) {
    activeKeyIndex = ++activeKeyIndex % activeKeys.length;
    changeActiveKey();
  } else {
    activeKeyIndex = 0;
    activeKeys = keyData.split("");
    $(".input-preview").innerHTML = getKeysPreviewHTML(activeKeys);
  }
  
  clearTimeout(keyTimeout);
  keyTimeout = setTimeout(selectActiveKey, 500);
}

const changeActiveKey = () => {
  $(".preview-key.active")?.classList.remove("active");
  $(".preview-key", true)[activeKeyIndex].classList.add("active");
}

const getKeysPreviewHTML = (keys) => {
  return keys.map((key, i) => `<div class="preview-key ${i === 0? 'active':''}">${key}</div>`).join("");
}

const selectActiveKey = () => {
  if(activeInput != null) {
    activeInput.value += activeKeys[activeKeyIndex];
  }

  activeKeyIndex = 0;
}