// ui.js — handles all DOM updates
// Citations:
// - DOM manipulation (getElementById, textContent, value): MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
//   Used to update status bars and pet display in real time.
// - setTimeout: MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
//   Used in showMessage() to automatically clear the message after 3 seconds.
// - Initial file structure and scaffold assisted by Claude (Anthropic, claude.ai).

export function updatePetDisplay(pet) {
  // Update status bars
  document.getElementById("bar-hunger").value = pet.hunger;
  document.getElementById("bar-mood").value   = pet.mood;
  document.getElementById("bar-energy").value = pet.energy;

  // Update mood label
  document.getElementById("pet-mood-label").textContent = pet.getMoodLabel();

  // Update sprite based on energy level
  const sprite = pet.energy < 30 ? "😴" : pet.mood < 30 ? "😢" : "🐣";
  document.getElementById("pet-sprite").textContent = sprite;
}

export function updateWeatherDisplay({ condition, temp }) {
  const label =
    condition === "Rain"  ? `🌧️ ${temp}°C — Rainy` :
    condition === "Clear" ? `☀️ ${temp}°C — Clear`  :
    condition === "Snow"  ? `❄️ ${temp}°C — Snowy`  :
    condition === "Cloudy"? `☁️ ${temp}°C — Cloudy` :
                            `🌡️ ${temp}°C`;

  document.getElementById("weather-display").textContent = label;
}

export function showMessage(text) {
  const box = document.getElementById("message-box");
  box.textContent = text;
  setTimeout(() => { box.textContent = ""; }, 3000);
}