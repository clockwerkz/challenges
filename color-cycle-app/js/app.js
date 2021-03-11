const inputForm = document.querySelector(".color__form");
let currentInterval = null;

inputForm.addEventListener("submit", handleFormSubmit);
const inputBoxes = document.querySelectorAll(".color__input");
inputBoxes.forEach(box => box.addEventListener("focus", ()=>toggleErrorMessage()));

function handleFormSubmit(event) {
    event.preventDefault();
    if (currentInterval !== null) {
        document.querySelector(".btn > .fas.fa-play").classList.remove("hide");
        document.querySelector(".btn > .fas.fa-pause").classList.add("hide");
        clearInterval(currentInterval);
        currentInterval = null;
        inputBoxes.forEach(box => box.disabled = false);
        return;
    }
    const r = document.querySelector(".color__input--r").value;
    const g = document.querySelector(".color__input--g").value;
    const b = document.querySelector(".color__input--b").value; 
    if (!r || !g || !b) {
        toggleErrorMessage(true);
        return;
    }
    let newColor = r + g + b;
    if (!isValidHexCode(newColor)) {
        toggleErrorMessage(true);
        return;
    }
    inputBoxes.forEach(box => box.disabled = true);
    document.querySelector(".btn > .fas.fa-play").classList.add("hide");
        document.querySelector(".btn > .fas.fa-pause").classList.remove("hide");
    currentInterval = setInterval(()=>{
        newColor = incrementHexValue(newColor, 3);
        setBoxColor(newColor);
    }, 250);
}

function setBoxColor(color) {
    const box = document.querySelector(".color__box");
    box.style.backgroundColor = "#" + color;
    return true;
}

function isValidHexCode(hexcode) {
    const regex = /[a-fA-F0-9]{6}|[a-fA-F0-9]{3}/;
    const validatedColor = hexcode.match(regex);
    if (!validatedColor || validatedColor[0].length !== hexcode.length) {
        return false;
    }
    return true;
}

function hexCodeValue(hexDigit) {
    const hex = ['a','b','c', 'd', 'e', 'f'];
    const index = hex.indexOf(hexDigit.toLowerCase());
    return index == -1 ? parseInt(hexDigit) : 10 + index;
}

function incrementHexValue(hexCode, increment) {
    if (hexCode.length == 3) {
        hexCode = hexCode.split("").map(ltr => ltr + ltr).join('');
    }
    const hexValues = hexCode.match(/[a-fA-F0-9]{2}/g);
    incrementedHexVal = ''
    hexValues.forEach(val => {
        let dec = convertHexToDec(val);
        decInc = convertDecToHex((dec + increment) % 255);
        incrementedHexVal+= decInc.length > 1 ? decInc : "0" + decInc;
    });
    return incrementedHexVal;
}


function convertHexToDec(hexCode){
 return hexCode.split("").reverse().reduce((acc, el, i)=> acc += i > 0 ? hexCodeValue(el) * (16 * i) : hexCodeValue(el), 0);
};

function convertDecToHex(decimal) {
    if (decimal == 0) return "0";
    const hex = ['a','b','c', 'd', 'e', 'f'];
    let conversion = '';
    while (decimal > 0) {
        let currentDigit = decimal % 16;
        conversion = (currentDigit < 10 ? currentDigit : hex[currentDigit - 10]) + conversion;
        decimal = parseInt(decimal / 16);
    }  
    return conversion;
}

function toggleErrorMessage(revealMsg = false) {
    const errorMsg = document.querySelector(".color__error-msg");
    if (revealMsg) {
        errorMsg.classList.remove("hide");
    } else {
        errorMsg.classList.add("hide");
    }
}