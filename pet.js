// pet.js — defines the Pet class
// Citations:
// - Optional chaining (?.) and nullish coalescing (??): MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
//   Used to safely read saved localStorage data without crashing when no save file exists.
// - localStorage API: MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
//   Used to persist pet stats across page refreshes.
// - JSON.parse / JSON.stringify: MDN Web Docs
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
//   Used to convert objects to strings for localStorage storage and back.
// - Initial file structure and scaffold assisted by Claude (Anthropic, claude.ai).

const STORAGE_KEY = "zenpet_state";

const DEFAULT_STATS = {
  hunger: 80, 
  mood: 80,
  energy: 80,
};

export class Pet {
  constructor(name) {
    this.name = name;

    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;

    this.hunger = parsed?.hunger ?? DEFAULT_STATS.hunger;
    this.mood   = parsed?.mood   ?? DEFAULT_STATS.mood;
    this.energy = parsed?.energy ?? DEFAULT_STATS.energy;
  }

  // --- Actions ---

  feed() {
    this.hunger = Math.min(100, this.hunger + 20);
    this.energy = Math.min(100, this.energy + 5);
    this.save();
  }

  play() {
    this.mood   = Math.min(100, this.mood + 20);
    this.hunger = Math.max(0,   this.hunger - 10);
    this.energy = Math.max(0,   this.energy - 15);
    this.save();
  }

  rest() {
    this.energy = Math.min(100, this.energy + 30);
    this.mood   = Math.min(100, this.mood + 5);
    this.save();
  }

  // Called over time to slowly decrease stats (optional: call with setInterval)
  tick() {
    this.hunger = Math.max(0, this.hunger - 2);
    this.mood   = Math.max(0, this.mood - 1);
    this.energy = Math.max(0, this.energy - 1);
    this.save();
  }

  applyWeatherEffect(condition) {
    const moodDelta =
      condition === "Rain"  ? -10 :
      condition === "Clear" ?  10 :
      condition === "Snow"  ?  -5 : 0;

    this.mood = Math.min(100, Math.max(0, this.mood + moodDelta));
    this.save();
  }

  getMoodLabel() {
    const avg = (this.hunger + this.mood + this.energy) / 3;
    return avg > 70 ? "Happy 😊" : avg > 40 ? "Okay 😐" : "Sad 😢";
  }

  save() {
    const state = {
      hunger: this.hunger,
      mood:   this.mood,
      energy: this.energy,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}