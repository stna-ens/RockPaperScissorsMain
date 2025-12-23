// Procedural Generation Vocabulary (Massive Expansion)
const vocabulary = {
  openers: [
    "Bruh,",
    "Look,",
    "Listen,",
    "Honestly,",
    "Not gonna lie,",
    "Fr though,",
    "Yo,",
    "Imagine,",
    "Check this,",
    "Wait,",
  ],
  nouns: [
    "NPC",
    "bot",
    "casual",
    "no-skin",
    "tryhard",
    "script kiddie",
    "opponent",
    "clown",
    "goofy",
    "passenger",
    "tourist",
  ],
  verbs: [
    "folded",
    "cooked",
    "deleted",
    "erased",
    "humbled",
    "exposed",
    "reading",
    "gapping",
    "ratioing",
    "ghosting",
    "resetting",
    "clipping",
    "farming",
  ],
  adjectives: [
    "mid",
    "washed",
    "free",
    "lost",
    "confused",
    "laggy",
    "predictable",
    "basic",
    "slow",
    "trash",
    "cringe",
    "goofy",
    "salty",
    "desperate",
    "shaky",
    "scared",
  ],
  roasts: [
    "stop the cap",
    "you're actually free",
    "uninstall right now",
    "take the L fam",
    "touch grass immediately",
    "it's giving desperate",
    "bro really thought he ate",
    "caught in 4k being bad",
    "absolute brainrot gameplay",
    "go play Roblox",
    "stick to candy crush",
    "you're fighting for your life",
    "hold this L",
    "packwatch initiated",
    "get clipped",
    "skill issue detected",
    "just leave the game",
    "why are you like this",
    "ain't no way",
    "smh my head",
    "you fell off",
    "ratio + L",
    "zero aura",
    "negative rizz functionality",
  ],
  excuses: [
    "Lag switch detected.",
    "My WiFi is literally tweaking.",
    "You got lucky, respectfully.",
    "RNG carried you hard.",
    "The game is buggin for real.",
    "I wasn't even sweating.",
    "Input delay is crazy.",
    "My controller disconnected.",
    "Devs need to nerf you.",
    "I was tabbed out.",
    "Frame drops went crazy.",
    "It's literally scripted.",
    "My cat walked on the keyboard.",
  ],
  closers: [
    "no cap.",
    "fr.",
    "on god.",
    "respectfully.",
    "literally.",
    "deadass.",
    "it's wraps.",
    "cringe.",
    "yikes.",
    "embarrassing.",
    "GGs only.",
    "stay mad.",
    "cry about it.",
    "hold that.",
    "period.",
  ],
  // NEW: Short punchy texts for the 'result_text' field
  short_roasts: [
    "Sit down.",
    "Folded instantly.",
    "Not even close.",
    "Too easy.",
    "Pure luck?",
    "Skill diff.",
    "Gap is huge.",
    "Just quit.",
    "Embarrassing.",
    "Yikes fam.",
    "Unlucky.",
    "Get better.",
    "Hold this L.",
    "Simply outplayed.",
    "Deleted.",
    "Erased.",
    "Clipped.",
    "Farmed.",
  ],
  // NEW: Dedicated Game Over variations
  game_over_win: [
    "GG EZ CLAP",
    "TUTORIAL COMPLETE",
    "EZ + RATIO",
    "YOU ARE FINISHED",
    "PACKWATCH",
    "SENT TO LOBBY",
    "SPEEDRUN COMPLETE",
    "GAME OVER FOR YOU",
    "ABSOLUTELY WASHED",
    "CLIP IT CHAT",
  ],
  game_over_loss: [
    "MATCH FIXED",
    "DEV HACKS",
    "LAG SPIKES",
    "UNFAIR MATCH",
    "STREAM SNIPING",
    "CONTROLLER DIED",
    "NOT COUNTING IT",
    "RNG ABUSE",
    "SYSTEM ERROR",
    "BLAME THE DEVS",
  ],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Make this function global so it can be called from script.js
window.generateOfflineResponse = function (result, userMove, computerMove) {
  const {
    openers,
    nouns,
    verbs,
    adjectives,
    roasts,
    excuses,
    closers,
    short_roasts,
  } = vocabulary;

  // Helpers
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const chance = (pct) => Math.random() < pct;
  const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  let result_text = "";
  let insult = "";

  // Normalize moves for display
  const uMove = userMove ? cap(userMove) : "that";
  const cMove = computerMove ? cap(computerMove) : "My move";

  // --- LOGIC FOR AI WIN ---
  if (result.includes("AI Won")) {
    // 1. Short Result Text (Punchy)
    result_text = pick([
      `${cMove} owns ${uMove}.`,
      `${uMove}?? Really?`,
      `Diffed.`,
      `Read like a book.`,
      `Too easy.`,
      pick(short_roasts),
    ]);

    // 2. Coherent Sentence Construction (Grammar Engine)
    const structures = [
      `Imagine thinking ${uMove} beats ${cMove}. ${pick(roasts)}.`,
      `I just ${pick(verbs)} your ${uMove} instantly. ${pick(closers)}`,
      `${pick(openers)} playing ${uMove} is huge ${pick(nouns)} behavior.`,
      `My code knew you'd pick ${uMove}. You are ${pick(adjectives)}.`,
      `${pick(openers)} ${pick(roasts)}. ${pick(closers)}`,
    ];
    insult = pick(structures);
  }

  // --- LOGIC FOR USER WIN ---
  else if (result.includes("You Won")) {
    result_text = pick([
      `System Error.`,
      `Lag.`,
      `Input delay.`,
      `Glitch?`,
      `Lucky.`,
      pick(excuses).split(".")[0],
    ]);

    const structures = [
      `${pick(excuses)} That's the only reason my ${cMove} lost.`,
      `${pick(openers)} check him PC. That ${uMove} was suspicious.`,
      `You didn't win, I lagged. ${pick(closers)}`,
      `Zero skill, pure luck. ${pick(roasts)}.`,
    ];
    insult = pick(structures);
  }

  // --- LOGIC FOR DRAW ---
  else if (result.includes("Draw")) {
    result_text = pick([
      "Stop copying.",
      "Original.",
      "Lag.",
      "Boring.",
      "Cloned.",
    ]);

    const structures = [
      `Stop mirroring my ${cMove}. It's giving ${pick(nouns)}.`,
      `Get your own moves. ${pick(roasts)}.`,
      `${pick(openers)} be original for once. ${pick(closers)}`,
      `We both picked ${uMove}? ${pick(adjectives)} behavior.`,
    ];
    insult = pick(structures);
  }

  // --- MATCH OVER LOGIC ---
  if (result.includes("MATCH OVER: AI Won")) {
    result_text = pick(vocabulary.game_over_win);
    insult = `${pick(
      openers
    )} uninstall. Your ${uMove} spam didn't work. ${pick(closers)}`;
  } else if (result.includes("MATCH OVER: User Won")) {
    result_text = pick(vocabulary.game_over_loss);
    insult = `Doesn't count. ${pick(excuses)} Rematch me if you're not scary.`;
  }

  return { result_text, insult };
};
