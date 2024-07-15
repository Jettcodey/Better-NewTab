<!--
##########################################
#             Better-NewTab              #
#           Made by Jettcodey            #
#                © 2024                  #
#           DO NOT REMOVE THIS           #
##########################################
-->
# Better NewTab

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <!--<li><a href="#installation">Installation</a></li>-->
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contribute">Contribute</a></li>
    <li><a href="#report-a-bug">Report a Bug</a></li>
  </ol>
</details>

### Built With
[md-block](https://github.com/leaverou/md-block) and [spotify-github-profile](https://github.com/kittinan/spotify-github-profile).

Please Checkout these Amazing Repos of [@leaverou](https://github.com/leaverou/) and [@kittinan](https://github.com/kittinan/).

<p align="right"><a href="#readme-top">Back to top</a></p>

<!-- ABOUT THE PROJECT -->
## About The Project

Just a simple Chromium extension for a custom New Tab page displaying your currently playing song in Spotify, with the ability to set a custom background image and without unnecessary elements seen on Google's New Tab page.

I originally developed this extension back in 2021/22 and recently rediscovered it on my old HDD, deciding to publish it.

>[!NOTE]
>Since I wrote this back in 2021/22, the code is a bit messy and not well-written. There are certainly better ways to write something like this.

If you have any questions about the extension, DM me on Discord: `jettcodey`.

<p align="right"><a href="#readme-top">Back to top</a></p>

<!-- Installation 
## Installation

<p align="right"><a href="#readme-top">Back to top</a></p>-->

<!-- Usage -->
## Usage

1. Download the repo:
   - Clone via `git clone https://github.com/Jettcodey/Better-NewTab`
   - Or download as a zip file.
2. Open your Chromium-based browser and navigate to the Extension Settings. Enable Developer Mode.
3. Visit [this repo](https://github.com/kittinan/spotify-github-profile) and click the `Connect With Spotify` button.
4. After connecting your Spotify account, you will be redirected to a site to create your custom Markdown theme.
5. Select the options `Cover Image`, `Interchange Artist with Song name`, and `Open in Spotify` for the best results.
6. Choose any theme you like; the recommended theme is `natemoo-re`.
7. Open the `newtab.html` file in any editor and replace the links in these lines with the appropriate ones from the Markdown text provided by the website:
    ```html
    <div id="playingnow">
      <md-block rendered="content">
        <a href="https://spotify-github-profile.kittinanx.com/api/view?uid=SPOTIFY_USERID&redirect=true">
          <img id="spotifyImage"
            src="https://spotify-github-profile.kittinanx.com/api/view?uid=SPOTIFY_USERID&cover_image=true&theme=natemoo-re&show_offline=true&background_color=121212&interchange=true&bar_color=00ffe1&bar_color_cover=false"
            alt="Spotify Now Playing">
        </a>
      </md-block>
    </div>
    ```
8. Open the `newtab.js` file in any editor and replace the link in these lines with the appropriate one:
    ```javascript
    function refreshSpotifynowPlaying() {
      var img = document.getElementById('spotifyImage');
      var currentTime = new Date().getTime();
      img.src = 'https://spotify-github-profile.kittinanx.com/api/view?uid=SPOTIFY_USERID&cover_image=true&theme=natemoo-re&show_offline=true&background_color=121212&interchange=true&bar_color=00ffe1&bar_color_cover=false&_=' + currentTime;
    }
    setInterval(refreshSpotifynowPlaying, 10000); 
    ```
9. Select `Load Unpacked` and navigate to the downloaded repo folder. Select it.
10. Open a new tab. You'll receive a popup informing you that the extension has made changes and giving you the option to revert those changes (i.e., to keep Google search). Click `Keep changes` to proceed.

>[!NOTE]
>After adding the extension, an error occurs in the `md-block.js` file, which can be ignored.

<p align="right"><a href="#readme-top">Back to top</a></p>

<!-- ROADMAP -->
## Roadmap

- [ ] Clean up the code.
- [ ] More...

<p align="right"><a href="#readme-top">Back to top</a></p>

<!-- Contribute -->
## Contribute

Contributions are welcome and needed.

<p align="right"><a href="#readme-top">Back to top</a></p>

<!-- Report a bug -->
## Report a Bug

See the [open issues](https://github.com/Jettcodey/Better-NewTab/issues) for a full list of proposed features (and known issues).

### Always report bugs and issues in English! If you report in any other language, your issue will be ignored and closed.

<p align="right"><a href="#readme-top">Back to top</a></p>
