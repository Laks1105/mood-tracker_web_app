// Each mood defines the eyes (SVG markup) and the mouth path.
const MOODS = {
  meh: {
    label: "checking in…",
    eyes: `<circle cx="72" cy="88" r="7"></circle><circle cx="128" cy="88" r="7"></circle>`,
    mouth: "M70,132 L130,132",
  },
  sad: {
    label: "feeling a bit low",
    eyes: `<path d="M60,84 Q72,74 84,84" fill="none" stroke-width="5" stroke-linecap="round"></path>
           <path d="M116,84 Q128,74 140,84" fill="none" stroke-width="5" stroke-linecap="round"></path>`,
    mouth: "M68,140 Q100,116 132,140",
  },
  surprised: {
    label: "oh!",
    eyes: `<circle cx="72" cy="88" r="10"></circle><circle cx="128" cy="88" r="10"></circle>`,
    mouth: "M100,122 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0",
  },
  thinking: {
    label: "hmm…",
    eyes: `<path d="M62,88 Q72,80 84,88" fill="none" stroke-width="5" stroke-linecap="round"></path>
           <circle cx="128" cy="88" r="7"></circle>`,
    mouth: "M68,132 Q88,124 100,132 Q112,140 132,132",
  },
  happy: {
    label: "feeling good today",
    eyes: `<path d="M60,86 Q72,72 84,86" fill="none" stroke-width="5" stroke-linecap="round"></path>
           <path d="M116,86 Q128,72 140,86" fill="none" stroke-width="5" stroke-linecap="round"></path>`,
    mouth: "M62,118 Q100,168 138,118",
  },
};

const eyesEl  = document.getElementById("eyes");
const mouthEl = document.getElementById("mouth");
const label   = document.getElementById("mood-label");
const face    = document.getElementById("face");
const cue     = document.getElementById("scrollCue");

function setMood(key) {
  const mood = MOODS[key];
  eyesEl.innerHTML = mood.eyes;
  mouthEl.setAttribute("d", mood.mouth);
  label.textContent = mood.label;
  label.classList.add("show");
}

// sequence: land -> cycle through moods -> settle happy -> reveal scroll cue
const sequence = [
  { at: 950,  mood: "meh" },
  { at: 1550, mood: "sad" },
  { at: 2150, mood: "surprised" },
  { at: 2750, mood: "thinking" },
  { at: 3400, mood: "happy" },
];

sequence.forEach(step => {
  setTimeout(() => setMood(step.mood), step.at);
});

setTimeout(() => {
  face.classList.add("settled");
  cue.classList.add("show");
}, 3400);

cue.addEventListener("click", () => {
  document.getElementById("login").scrollIntoView({ behavior: "smooth" });
});