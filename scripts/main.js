const myImage = document.querySelector("img");

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/google.png") {
        myImage.setAttribute("src", "images/firefox-icon.png")
    } else {
        myImage.setAttribute("src", "images/google.png")
    }
};

const myButton = document.querySelector("button");
const myHeading = document.querySelector("h1");

function setUserName() {
    const input = prompt("请输入你的姓名：");

    // “取消”返回 null。提前结束函数，保留原来的姓名。
    if (input === null) {
        return;
    }

    const myName = input.trim();
    if (myName === "") {
        return;
    }

    localStorage.setItem("name", myName);
    myHeading.textContent = `欢迎你，${myName}！`;
}

// 初次访问显示默认标题，用户点击按钮后才询问姓名。
const storedName = localStorage.getItem("name");
if (storedName) {
    myHeading.textContent = `欢迎你，${storedName}！`;
}

myButton.onclick = function () {
    setUserName();
};
