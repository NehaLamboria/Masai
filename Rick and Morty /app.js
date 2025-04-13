let currentPage = 1;
const fetchCharacters = async (page) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await response.json();
  return data.results;
};
const renderCharacters = async (page) => {
  const characters = await fetchCharacters(page);
  const gridContainer = document.getElementById('character-grid');
  gridContainer.innerHTML = '';
  characters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('character-card');
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>${character.species}</p>
      <p>Status: ${character.status}</p>
      <a href="character-detail.html?id=${character.id}" target="_blank">View Details</a>
    `;
    gridContainer.appendChild(card);
  });
};
const nextPage = () => {
  currentPage++;
  renderCharacters(currentPage);
};
const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    renderCharacters(currentPage);
  }
};
const updateClock = () => {
  const clock = document.getElementById('footer-clock');
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
  const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  clock.textContent = `${formattedTime} ${formattedDate}`;
};
setInterval(updateClock, 1000);
renderCharacters(currentPage);
const getCharacterIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
};
const fetchCharacterDetail = async (id) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await response.json();
  return data;
};
const renderCharacterDetail = async () => {
  const characterId = getCharacterIdFromURL();
  const character = await fetchCharacterDetail(characterId);
  document.getElementById('character-detail').innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h3>${character.name}</h3>
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>Type: ${character.type || 'N/A'}</p>
    <p>Gender: ${character.gender}</p>
    <p>Origin: ${character.origin.name}</p>
    <p>Current Location: ${character.location.name}</p>
    <p>Episodes: ${character.episode.length}</p>
  `;
};
if (window.location.pathname.includes('character-detail.html')) {
  renderCharacterDetail();
}
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }
});
const randomBtn = document.getElementById("random-btn");
randomBtn.addEventListener("click", async () => {
  const randomId = Math.floor(Math.random() * 826) + 1; // total characters in API
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
    const character = await response.json();
    showCharacterPopup(character);
  } catch (error) {
    console.error("Failed to load random character:", error);
  }
});
function showCharacterPopup(character) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <div class="popup-content">
      <span class="close">&times;</span>
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Origin:</strong> ${character.origin.name}</p>
    </div>
  `;
  document.body.appendChild(popup);
  popup.querySelector(".close").addEventListener("click", () => {
    popup.remove();
  });
}
