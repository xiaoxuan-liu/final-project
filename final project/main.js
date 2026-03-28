// main.js — entry point, wires everything together
// Citations:
// - ES Modules (import/export): MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
//   Used to split code across multiple files for better organization.
// - addEventListener and the Event object: MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
//   Used to listen for button clicks and access event properties (e.g. e.type).
// - setInterval: MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/API/setInterval
//   Used to trigger pet stat decay every 30 seconds to simulate time passing.
// - Numeric separator (30_000): MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators
//   Used for readability — 30_000 is equivalent to 30000.
// - Initial file structure and scaffold assisted by Claude (Anthropic, claude.ai).

import { Pet } from "./pet.js";
import { fetchWeather } from "./weather.js";
import { updatePetDisplay, updateWeatherDisplay, showMessage } from "./ui.js";

const myPet = new Pet("Zen");

// Initial render
updatePetDisplay(myPet);

document.getElementById("btn-feed").addEventListener("click", (e) => {
  myPet.feed();
  updatePetDisplay(myPet);
  showMessage(`${myPet.name} enjoyed a snack! (triggered by: ${e.type})`);
});

document.getElementById("btn-play").addEventListener("click", () => {
  myPet.play();
  updatePetDisplay(myPet);
  showMessage(`${myPet.name} had fun playing!`);
});

document.getElementById("btn-rest").addEventListener("click", (e) => {
  myPet.rest();
  updatePetDisplay(myPet);
  showMessage(`${myPet.name} is resting...`);
});


async function initWeather() {
  const weather = await fetchWeather();
  updateWeatherDisplay(weather);
  myPet.applyWeatherEffect(weather.condition);
  updatePetDisplay(myPet);
}

initWeather();

setInterval(() => {
  myPet.tick();
  updatePetDisplay(myPet);
}, 30_000);