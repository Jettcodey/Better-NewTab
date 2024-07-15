// newtab.js

function refreshSpotifynowPlaying() {
  var img = document.getElementById('spotifyImage');
  var currentTime = new Date().getTime();
  img.src = 'https://spotify-github-profile.kittinanx.com/api/view?uid=SPOTIFY_USERID&cover_image=true&theme=natemoo-re&show_offline=true&background_color=121212&interchange=true&bar_color=00ffe1&bar_color_cover=false&_=' + currentTime;
}
setInterval(refreshSpotifynowPlaying, 10000); 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "setBackgroundImage") {
    setBackgroundImage(request.imageUrl);
  } else if (request.action === "updateUploadedBackgrounds") {
    const uploadedBackgrounds = request.uploadedBackgrounds || [];
    updateUploadedBackgrounds(uploadedBackgrounds);
  }
});

function setBackgroundImage(imageUrl) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

function updateUploadedBackgrounds(uploadedBackgrounds) {

}

chrome.storage.local.get("selectedBackground", (data) => {
  const selectedBackground = data.selectedBackground || "";
  setBackgroundImage(selectedBackground);
});

