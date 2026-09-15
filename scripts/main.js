const imageSwitcher = document.querySelector("#image-switcher");
const brandImage = document.querySelector("#brand-image");

const images = [
    {
        src: "images/google.png",
        alt: "Google 标志"
    },
    {
        src: "images/firefox-icon.png",
        alt: "Firefox 标志"
    },
    {
        src: "images/baidu.webp",
        alt: "Baidu 标志"
    }

];

let currentIndex = 0;

function renderImage() {
    const currentImage = images[currentIndex]

    brandImage.src = currentImage.src
    brandImage.alt = currentImage.alt
}

imageSwitcher.addEventListener("click", () => {
    currentIndex = currentIndex + 1

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    renderImage();
});

renderImage();


const nameForm = document.querySelector("#name-form");
const nameInput = document.querySelector("#name-input");
const nameMessage = document.querySelector("#name-message");
const myHeading = document.querySelector("h1");


function readName() {
    try {
        return localStorage.getItem("name");
    } catch (error) {
        console.error("读取姓名失败：", error);
        nameMessage.textContent = "无法读取已保存的姓名，你仍可以输入姓名。";
        return null;
    }
}

function saveName(name) {
    try {
        localStorage.setItem("name", name);
        return true;
    } catch (error) {
        console.error("保存姓名失败：", error);
        return false;
    }
}

const storeName = readName();

if (storeName) {
    myHeading.textContent = `欢迎你，${storeName}`;
    nameInput.value = storeName;
}

nameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const myName = nameInput.value.trim();

    if (myName == "") {
        nameMessage.textContent = "请输入姓名，不能只填空格。";
        nameInput.setAttribute("aria-invalid", "true");
        nameInput.focus();
        return;
    }

    nameInput.removeAttribute("aria-invalid");

    const saved = saveName(myName);
    myHeading.textContent = `欢迎你，${myName}`;
    nameInput.value = myName;

    if (saved) {
        nameMessage.textContent = "姓名已保存，刷新页面后仍会保留";
    } else {
        nameMessage.textContent = "姓名已在本页更新，但保存失败，刷新后可能无法保留。";
    }

});


const learningForm = document.querySelector("#learning-form");
const learningInput = document.querySelector("#learning-input");
const learningList = document.querySelector("#learning-list");
const learningMessage = document.querySelector("#learning-message");

const learningPlans = [];

function renderLearningPlans() {
    learningList.replaceChildren();

    learningPlans.forEach((plan, index) => {
        const item = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = plan;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "删除";
        deleteButton.className = "delete-button";
        deleteButton.setAttribute("aria-label", `删除计划${plan}`);

        deleteButton.addEventListener("click", () => {
            learningPlans.splice(index, 1);

            renderLearningPlans();

            learningMessage.textContent = `已删除计划：${plan}`;
            learningInput.focus();
        });

        item.append(text, deleteButton);
        learningList.append(item);
    });
}

learningForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const learningText = learningInput.value.trim();

    if (learningText === "") {
        learningMessage.textContent = "请输入具体的学习内容。";
        learningInput.focus();
        return;
    }

    learningPlans.push(learningText);

    renderLearningPlans();

    learningInput.value = "";
    learningInput.focus();

    learningMessage.textContent = "已添加一项学习任务。";
});

renderLearningPlans();
