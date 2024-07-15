chrome.runtime.onInstalled.addListener(() => {
  const defaultImageUrl = "/UserBG/image.png";
  chrome.storage.local.get(["selectedBackground", "uploadedBackgrounds"], (data) => {
    const imageUrl = data.selectedBackground || defaultImageUrl;
    const uploadedBackgrounds = data.uploadedBackgrounds || [];
    chrome.storage.local.set({ imageUrl, uploadedBackgrounds });
  });

  chrome.storage.local.get("images", (data) => {
    if (!data.images) {
      const defaultImageList = [defaultImageUrl];
      chrome.storage.local.set({ images: defaultImageList });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setBackgroundImage") {
    chrome.storage.local.set({ imageUrl: request.imageUrl });
  } else if (request.action === "getUploadedBackgrounds") {
    chrome.storage.local.get("uploadedBackgrounds", (data) => {
      const uploadedBackgrounds = data.uploadedBackgrounds || [];
      chrome.runtime.sendMessage({ action: "updateUploadedBackgrounds", uploadedBackgrounds });
    });
  } else if (request.action === "updateUploadedBackgrounds") {
    chrome.storage.local.get("uploadedBackgrounds", (data) => {
      const uploadedBackgrounds = data.uploadedBackgrounds || [];
      chrome.runtime.sendMessage({ action: "updateUploadedBackgrounds", uploadedBackgrounds });
    });
  } else if (request.action === "saveImage") {
    saveImage(request.uploadedBackgroundName, request.data);
    updateImagesList(request.uploadedBackgroundName);
  }
});

function saveImage(uploadedBackgroundName, data) {
  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const filePath = `/UserBG/${uploadedBackgroundName}`;

  chrome.storage.local.get("uploadedBackgrounds", (data) => {
    const uploadedBackgrounds = data.uploadedBackgrounds || [];
    if (!uploadedBackgrounds.includes(filePath)) {
      uploadedBackgrounds.push(filePath);
      chrome.storage.local.set({ uploadedBackgrounds });
    }
  });

  chrome.storage.local.get("images", (data) => {
    const images = data.images || [];
    if (!images.includes(filePath)) {
      images.push(filePath);
      chrome.storage.local.set({ images });
    }
  });
}

function updateImagesList(newImagePath) {
  chrome.storage.local.get("images", (data) => {
    const images = data.images || [];
    if (!images.includes(newImagePath)) {
      images.push(newImagePath);
      chrome.storage.local.set({ images });
    }
  });
}

function copyImageToUserBG(imageUrl) {
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onload = function () {
        const data = reader.result.split(',')[1];
        const filename = imageUrl.split('/').pop();
        saveImage(filename, data);
        chrome.runtime.sendMessage({ action: "setBackgroundImage", imageUrl });
      };
      reader.readAsDataURL(blob);
    });
}
