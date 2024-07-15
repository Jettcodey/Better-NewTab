// popup.js

const buttonOptions = document.getElementById("buttonDiv");
const optionsBtn = document.getElementById("optionsBtn");
const optionsContent = document.getElementById("optionsContent");
const selectedClassName = "current";
const containerDiv = document.querySelector(".container");
const defaultImageInput = document.getElementById("defaultImageInput");
const cacheProgress = document.getElementById("cacheProgress");

function setBackgroundImage(imageUrl) {
  chrome.runtime.sendMessage({ action: "setBackgroundImage", imageUrl });
}

function removeBackground() {
  const selectedButton = buttonOptions.querySelector(`.${selectedClassName}`);

  if (selectedButton) {
    const imageUrlToRemove = selectedButton.dataset.image;
    containerDiv.removeChild(selectedButton);
    setBackgroundImage("");

    chrome.storage.sync.get("uploadedBackgrounds", (data) => {
      const uploadedBackgrounds = data.uploadedBackgrounds || [];
      const updatedBackgrounds = uploadedBackgrounds.filter(url => url !== imageUrlToRemove);
      chrome.storage.sync.set({ uploadedBackgrounds: updatedBackgrounds });
      chrome.runtime.sendMessage({ action: "updateUploadedBackgrounds", uploadedBackgrounds: updatedBackgrounds });
    });

    console.log(`Removed background: ${imageUrlToRemove}`);
  } else {
    console.log("No background selected to remove.");
  }
}

function handleButtonClick(e) {
  const imageUrl = e.target.dataset.image;
  setBackgroundImage(imageUrl);
}

function createImageButtons(buttonImages) {
  chrome.runtime.getPackageDirectoryEntry(directoryEntry => {
    const userBGPath = directoryEntry.toURL() + "UserBG/";

    chrome.storage.local.get(["uploadedBackgrounds", "selectedBackground"], (data) => {
      const uploadedBackgrounds = data.uploadedBackgrounds || [];
      const selectedBackground = data.selectedBackground;

      for (let uploadedBackground of uploadedBackgrounds) {
        addButtonOption(uploadedBackground, selectedBackground);
      }

      for (let imageName of buttonImages) {
        const imageUrl = userBGPath + imageName;
        addButtonOption(imageUrl, selectedBackground, imageName);
      }

      if (!selectedBackground && buttonImages.length > 0) {
        const defaultImageUrl = userBGPath + buttonImages[0];
        setBackgroundImage(defaultImageUrl);
      } else if (selectedBackground) {
        setBackgroundImage(selectedBackground);
      }

      defaultImageInput.value = selectedBackground || "";
    });
  });
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      setBackgroundImage(imageUrl);
      addButtonOption(imageUrl, imageUrl, file.name);

      chrome.storage.local.get("uploadedBackgrounds", (data) => {
        const uploadedBackgrounds = data.uploadedBackgrounds || [];
        const updatedBackgrounds = [...uploadedBackgrounds, imageUrl];
        chrome.storage.local.set({ uploadedBackgrounds: updatedBackgrounds });
        chrome.runtime.sendMessage({ action: "updateUploadedBackgrounds", uploadedBackgrounds: updatedBackgrounds });
      });

      console.log("Image uploaded and stored locally.");
    };
    reader.readAsDataURL(file);
  }
}

function addButtonOption(imageUrl, currentImageUrl, filename) {
  const button = document.createElement("button");
  button.dataset.image = imageUrl;
  button.style.backgroundImage = `url('${imageUrl}')`;
  button.style.backgroundSize = "cover";

  const filenameSpan = document.createElement("span");
  filenameSpan.textContent = filename;

  if (imageUrl === currentImageUrl) {
    button.classList.add(selectedClassName);
  }

  button.addEventListener("click", handleButtonClick);
  buttonOptions.appendChild(button);
}

function setDefaultImage() {
  const defaultImageUrl = defaultImageInput.value.trim();
  chrome.storage.local.set({ selectedBackground: defaultImageUrl });
  setBackgroundImage(defaultImageUrl);
}

optionsBtn.addEventListener("click", () => {
  optionsContent.style.display = optionsContent.style.display === "none" ? "flex" : "none";
});

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", handleFileUpload);

const removeBackgroundBtn = document.getElementById("removeBackgroundBtn");
removeBackgroundBtn.addEventListener("click", removeBackground);

const setDefaultImageBtn = document.getElementById("setDefaultImageBtn");
setDefaultImageBtn.addEventListener("click", setDefaultImage);

const buttonImages = [
  "image.png",
  "image0.png",
  "image1.png",
  "image2.png",
  "image3.png",
  // Add more Images as needed located in UserBG
];

createImageButtons(buttonImages);
