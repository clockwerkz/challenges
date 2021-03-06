const inputForm = document.querySelector(".color__form");
inputForm.addEventListener("submit", handleFormSubmit);


function handleFormSubmit(event) {
    event.preventDefault();
    const input = document.querySelector(".color__input").value;
    if (input === "") {
        return;
    }
    let newColor = input;
    setBoxColor(newColor);
    setInterval(()=>{
        newColor = incrementHexValue(newColor, 3);
        setBoxColor(newColor);
    }, 250);
}

function setBoxColor(color) {
    //check if color is a valid hex or rgb color
    const regex = /[a-fA-F0-9]{6}|[a-fA-F0-9]{3}/;
    const validatedColor = color.match(regex);
    if (!validatedColor || validatedColor[0].length !== color.length) {
        return false;
    }
    const box = document.querySelector(".color__box");
    box.style.backgroundColor = "#" + color;
    return true;
}

function hexCodeValue(hexDigit) {
    const hex = ['a','b','c', 'd', 'e', 'f'];
    const index = hex.indexOf(hexDigit.toLowerCase());
    return index == -1 ? parseInt(hexDigit) : 10 + index;
}

function incrementHexValue(hexCode, increment) {
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