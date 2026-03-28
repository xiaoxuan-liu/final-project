// weather.js — fetches live weather data
// Citations:
// - Open-Meteo API (free, no API key required): https://open-meteo.com/
//   Used to fetch real-time weather data based on coordinates.
// - WMO weather interpretation codes: Open-Meteo documentation
//   https://open-meteo.com/en/docs — used to map numeric codes to readable conditions.
// - async/await and try/catch pattern: MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
//   Used to handle asynchronous fetch calls and gracefully catch network errors.
// - Initial file structure and scaffold assisted by Claude (Anthropic, claude.ai).

// Free API — no key needed for basic use
// Docs: https://open-meteo.com/

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current_weather=true";

// Citation: WMO code mapping from open-meteo docs
function interpretWeatherCode(code) {
  if (code === 0)               return "Clear";
  if (code >= 1  && code <= 3)  return "Cloudy";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain";
  return "Unknown";
}

export async function fetchWeather() {
  try {
    const response = await fetch(WEATHER_URL);

    if (!response.ok) {
      throw new Error(`Weather fetch failed: ${response.status}`);
    }

    const data = await response.json();

    const code = data?.current_weather?.weathercode ?? -1;
    const temp = data?.current_weather?.temperature  ?? "?";

    const condition = interpretWeatherCode(code);
    return { condition, temp };

  } catch (err) {
    console.error("Could not load weather:", err);
    return { condition: "Unknown", temp: "?" };
  }
}