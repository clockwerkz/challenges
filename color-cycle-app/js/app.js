const inputForm = document.querySelector(".color__form");
inputForm.addEventListener("submit", handleFormSubmit);


function handleFormSubmit(event) {
    event.preventDefault();
    const input = document.querySelector(".color__input").value;
    if (input === "") {
        return;
    }
    setBoxColor("#" + input);
}

function setBoxColor(color) {
    //check if color is a valid hex or rgb color
    const regex = /^#[a-fA-F0-9]{6}|[a-fA-F0-9]{3}/;
    const validatedColor = color.match(regex);
    if (!validatedColor || validatedColor[0].length !== color.length) {
        return false;
    }
    const box = document.querySelector(".color__box");
    box.style.backgroundColor = color;
    return true;
}