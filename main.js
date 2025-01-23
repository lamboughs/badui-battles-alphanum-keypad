const $ = (q, multiple = false) =>
  multiple ? document.querySelectorAll(q) : document.querySelector(q);
let activeKeys=[];
let activeKeyIndex = 0;
let activeInput = null;
let keyTimeout;
let isCapslockOn;


window.onload = () => {
  console.log("ready...");
  
  const capslockHint = $(".capslock-hint");
  const [usernameInput, passwordInput, capslockInput] = $("input", true);
  const keypad = $(".keypad");

  activeInput = usernameInput;

  $("#backspace-btn").onclick = () => {
    activeInput.value = activeInput.value.substr(0, activeInput.value.length - 1);
    activeKeyIndex = 0;
  }
  $("#capslock-btn").onclick = () => {
    capslockInput.checked = !capslockInput.checked;
    renderKeys(keypad, capslockInput.checked);
    
    if(capslockInput.checked) {
      capslockHint.classList.remove("hidden");
    } else {
      capslockHint.classList.add("hidden");
    }
  }
  $("#done-btn").onclick = () => {
    if(activeInput === usernameInput) {
      activeInput = passwordInput;
      usernameInput.classList.remove("active");
      passwordInput.classList.add("active");
    }
  }
  
  renderKeys(keypad, false);
}

function renderKeys(keypad, isCapslockOn) {
  keypad.innerHTML = "";

  keys
    .map(key => {
      if(isCapslockOn) {
        return {
          ... key,
          alpha: key.alpha.toUpperCase()
        }
      }
      return key;
    })
    .forEach(key => {
      console.log
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
  clearTimeout(keyTimeout);
  
  if(activeKeys.join("") === keyData) {
    activeKeyIndex = ++activeKeyIndex % activeKeys.length;
    changeActiveKey();
  } else {
    if(activeKeys.length > 0) {
      selectActiveKey();
    }

    activeKeyIndex = 0;
    activeKeys = keyData.split("");
    $(".input-preview").innerHTML = getKeysPreviewHTML(activeKeys);
  }

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
  activeKeys = [];
}