const myImage = document.querySelector("img");

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/google.png") {
        myImage.setAttribute("src", "images/firefox-icon.png")
    } else {
        myImage.setAttribute("src", "images/google.png")
    }
};

let myButton = document.querySelector("button")
let myHeading = document.querySelector("h1")

function setUserName() {
    const myName = prompt("Place enter you name.");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Mozilla is coll,${myName}`;
    }
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storeName = localStorage.getItem("name");
    myHeading.textContent = `Mozilla is coll,${storeName}`;
}

myButton.onclick = function () {
    setUserName();
}