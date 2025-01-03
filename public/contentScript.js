const observer = new MutationObserver((mutations, obs) => {
  const headerContainer = document.querySelector(
    ".flex.w-full.justify-between .flex.items-center"
  );
  console.log("Script loaded");
  if (headerContainer) {
    const extensionButton = document.createElement("button");
    extensionButton.id = "open-notes-extension";
    extensionButton.textContent = "Show Solutions";
    extensionButton.style.cssText = `
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 10px;
      cursor: pointer;
      font-size: 16px;
      z-index: 9999;
      position: fixed;
      bottom: 50px;
      right: 30px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;
    extensionButton.addEventListener("click", () => {
      const currentUrl = window.location.href;
      const match = currentUrl.match(/problems\/([^/]+)/);
      const problemName = match ? match[1].replace(/-/g, " ") : null;
      if (problemName) {
        showSolution(problemName);
      } else {
        alert("No problem name found.");
      }
    });
    document.body.appendChild(extensionButton);
    obs.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
const showSolution = async (problemName) => {
  const youtubeApiKey = "AIzaSyAwiICFIXrfVMRvTV15tRePLtLj1Mc4McA";
  const googleApiKey = "AIzaSyAwiICFIXrfVMRvTV15tRePLtLj1Mc4McA";
  const googleCseId = "356a6279c1ab14cb7";
  const fetchYouTubeResults = async (query) => {
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
      query
    )}&key=${youtubeApiKey}&maxResults=5`;
    try {
      const response = await fetch(youtubeApiUrl);
      const data = await response.json();
      if (data.items) {
        return data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch YouTube results:", error);
    }
    return [];
  };
  const fetchGoogleResults = async (query) => {
    const googleApiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&key=${googleApiKey}&cx=${googleCseId}&num=5`;
    try {
      const response = await fetch(googleApiUrl);
      const data = await response.json();
      if (data.items) {
        return data.items.map((item) => ({
          title: item.title,
          link: item.link,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch Google results:", error);
    }
    return [];
  };
  const query = `leetcode ${problemName} solution`;
  const youtubeResults = await fetchYouTubeResults(query);
  const googleResults = await fetchGoogleResults(query);
  displaySolution(youtubeResults, googleResults, problemName);
};
const displaySolution = (youtubeResults, googleResults, problemName) => {
  const solutionContainer = document.createElement("div");
  solutionContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: white;
    padding: 10px;
    z-index: 9999;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 50%; 
    max-height: 70%; 
    overflow-y: auto; 
    cursor: move; 
  `;
  const title = document.createElement("h1");
  title.textContent = `Solutions for: ${problemName}`;
  title.style.color = "black";
  title.style.fontSize = "15px";
  title.style.fontWeight = "bold";
  solutionContainer.appendChild(title);
  const youtubeSection = document.createElement("section");
  youtubeSection.innerHTML = '<h2 style="color: black;">YouTube Videos:</h2>';
  youtubeResults.forEach((video) => {
    const videoElement = document.createElement("div");
    videoElement.style.marginBottom = "10px";
    videoElement.innerHTML = `
      <h3>${video.title}</h3>
      <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
    youtubeSection.appendChild(videoElement);
  });
  solutionContainer.appendChild(youtubeSection);
  const googleSection = document.createElement("section");
  googleSection.innerHTML = `<h2 style="color: black;font-size:"15px;">Solutions for: ${problemName}</h2>`;
  googleResults.forEach((result) => {
    const resultElement = document.createElement("div");
    resultElement.style.marginBottom = "10px";
    resultElement.innerHTML = `
  <h2 style="background-color: #ddd; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
    <a href="${result.link}" target="_blank" style="text-decoration: none; color: #1a73e8;">
      ${result.title}
    </a>
  </h2>
`;

    googleSection.appendChild(resultElement);
  });
  solutionContainer.appendChild(googleSection);
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.cssText = `
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size:"15px";
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  `;
  closeButton.addEventListener("click", () => {
    solutionContainer.remove();
  });
  solutionContainer.appendChild(closeButton);
  document.body.appendChild(solutionContainer);
  let isDragging = false;
  let offsetX, offsetY;
  solutionContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - solutionContainer.offsetLeft;
    offsetY = e.clientY - solutionContainer.offsetTop;
    solutionContainer.style.cursor = "grabbing";
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      solutionContainer.style.left = `${e.clientX - offsetX}px`;
      solutionContainer.style.top = `${e.clientY - offsetY}px`;
    }
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
    solutionContainer.style.cursor = "move";
  });
};
