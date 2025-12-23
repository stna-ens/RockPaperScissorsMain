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
    "Respectfully,",
    "Be for real,",
    "News flash:",
    "Spoiler alert:",
    "Daily reminder:",
    "Just saying,",
    "Friendly advice:",
    "Hot take:",
    "Actually,",
    "Deadass,",
    "No offense but,",
    "Real talk,",
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
    "bronze player",
    "target dummy",
    "loot drop",
    "free kill",
    "walkover",
    "warmup bot",
    "training dummy",
    "potato",
    "placeholder",
    "bystander",
    "spectator",
    "fraud",
    "joke",
    "liability",
    "budget gamer",
    "mobile gamer",
    "button masher",
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
    "smokin",
    "destroying",
    "schooling",
    "embarrassing",
    "disrespecting",
    "violating",
    "educating",
    "shutting down",
    "evicting",
    "uninstalling",
    "benchmarking",
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
    "rusty",
    "clueless",
    "unsalvageable",
    "tragic",
    "painful",
    "embarrassing",
    "weak",
    "shambolic",
    "cooked",
    "finished",
    "obsolete",
    "vintage",
    "dusty",
    "irrelevant",
    "choked",
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
    "refund your internet",
    "sell your setup",
    "return the keyboard",
    "you play like you have lag",
    "are you playing with a touchpad?",
    "my grandad reacts faster",
    "is your monitor on?",
    "you're lagging IRL",
    "call your ISP immediately",
    "download more skill",
    "check your ping",
    "controller disconnected?",
    "mouse out of batteries?",
    "playing blindfolded?",
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
    "Solar flare interference.",
    "Cosmic ray bit flip.",
    "Server desync happened.",
    "Glitch in the matrix.",
    "Hitbox issue.",
    "Micro-stuttering.",
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
    "womp womp.",
    "enjoy the lobby.",
    "better luck next year.",
    "skill gap.",
    "levels.",
    "don't @ me.",
    "keep crying.",
    "seethe.",
    "cope.",
  ],
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
    "Free elo.",
    "Thanks for the RP.",
    "Business decision.",
    "Calculated.",
    "Outbrained.",
    "Too fast.",
    "Sleep mode.",
    "Nap time.",
    "Tutorial mode.",
    "Easy claps.",
  ],
  // NEW: More insulting pattern-based
  spam_roasts: [
    "Spamming same move? Boring.",
    "Do you know any other buttons?",
    "One trick pony behavior.",
    "Predictable spammer found.",
    "Bot behavior detected.",
    "Are you stuck on loop?",
    "Broken record player.",
    "Spamming = 0 iq.",
    "Imagine spamming in 2025.",
    "Script broken?",
  ],
  losing_badly: [
    "Just forfeit already.",
    "Is your monitor on?",
    "This is painful to watch.",
    "Zero percent winrate behavior.",
    "You're actually getting farmed.",
    "Mercy rule needed.",
    "Stop, he's already dead.",
    "I'm calling the police.",
    "This is cyberbullying.",
    "Do you need a tutorial?",
    "Refund the game.",
    "Go to bed.",
  ],
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
    "THANKS FOR THE ELO",
    "CLOSE THE APP",
    "LOG OFF NOW",
    "CAREER ENDED",
    "NO REQUEUE FOR YOU",
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
    "GAME IS RIGGED",
    "FAKE NEWS",
    "REMATCH ME RN",
    "DIDN'T COUNT",
    "I WAS LAGGING",
  ],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Global function with expanded signature
window.generateOfflineResponse = function (
  result,
  userMove,
  computerMove,
  userScore = 0,
  computerScore = 0,
  history = []
) {
  const {
    openers,
    nouns,
    verbs,
    adjectives,
    roasts,
    excuses,
    closers,
    short_roasts,
    spam_roasts,
    losing_badly,
  } = vocabulary;

  // Helpers
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const chance = (pct) => Math.random() < pct;
  const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  let result_text = "";
  let insult = "";

  const uMove = userMove ? cap(userMove) : "that";
  const cMove = computerMove ? cap(computerMove) : "My move";

  // --- CONTEXT ANALYSIS ---

  // 1. Check for Spamming (Last 3 moves same)
  const last3 = history.slice(-3).map((h) => h.user);
  const isSpamming = last3.length === 3 && last3.every((m) => m === last3[0]);

  // 2. Check for Score Deficit (Crushing)
  const scoreDiff = computerScore - userScore;
  const isLosingBad = scoreDiff >= 3;

  // --- LOGIC FOR AI WIN ---
  if (result.includes("AI Won")) {
    if (isSpamming && Math.random() < 0.8) {
      // High priority roast for spamming logic
      result_text = pick([
        `Stop spamming ${uMove}.`,
        `Spam detected.`,
        `Again??`,
      ]);
      insult = `${pick(spam_roasts)} ${pick(roasts)}`;
    } else if (isLosingBad && Math.random() < 0.7) {
      // High priority roast for losing bad
      result_text = `Score: ${userScore}-${computerScore}.`;
      insult = `${pick(losing_badly)} ${pick(closers)}`;
    } else {
      // Standard AI Win - MORE VARIETY IN TEMPLATES
      const templates = [
        // Standard
        () => {
          result_text = pick([
            `${cMove} owns ${uMove}.`,
            `Diffed.`,
            `Too easy.`,
            pick(short_roasts),
          ]);
          return `Imagine thinking ${uMove} beats ${cMove}. ${pick(roasts)}.`;
        },
        // Verb focused
        () => {
          result_text = `${cMove} > ${uMove}`;
          return `I just ${pick(verbs)} your ${uMove}. ${pick(closers)}`;
        },
        // Noun focused
        () => {
          result_text = pick(short_roasts);
          return `${pick(openers)} playing ${uMove} is huge ${pick(
            nouns
          )} behavior.`;
        },
        // Direct attack
        () => {
          result_text = "Sit down.";
          return `${pick(openers)} ${pick(roasts)}. ${pick(closers)}`;
        },
        // Short & Mean
        () => {
          result_text = "L.";
          return `You are ${pick(adjectives)}. ${pick(roasts)}`;
        },
        // Questioning sanity
        () => {
          result_text = `${uMove}??`;
          return `Why would you play ${uMove}? ${pick(roasts)}`;
        },
      ];
      insult = pick(templates)();
    }
  }

  // --- LOGIC FOR USER WIN ---
  else if (result.includes("You Won")) {
    result_text = pick([
      `System Error.`,
      `Lag.`,
      `Glitch?`,
      `Lucky.`,
      pick(excuses).split(".")[0],
      `Reported.`,
      `Hacks?`,
    ]);

    const templates = [
      () => `${pick(excuses)} That's the only reason my ${cMove} lost.`,
      () => `${pick(openers)} check him PC. That ${uMove} was suspicious.`,
      () => `You didn't win, I lagged. ${pick(closers)}`,
      () => `Zero skill, pure luck. ${pick(roasts)}.`,
      () => `I let you win. ${pick(closers)}`,
      () => `My screen froze. ${pick(closers)}`,
    ];
    insult = pick(templates)();
  }

  // --- LOGIC FOR DRAW ---
  else if (result.includes("Draw")) {
    if (isSpamming) {
      result_text = "Spamming doesn't work.";
      insult = "We both know you're just clicking buttons randomly.";
    } else {
      result_text = pick([
        "Stop copying.",
        "Original.",
        "Lag.",
        "Boring.",
        "Twins?",
        "Mirror.",
      ]);
      const templates = [
        () => `Stop mirroring my ${cMove}. It's giving ${pick(nouns)}.`,
        () => `Get your own moves. ${pick(roasts)}.`,
        () => `We both picked ${uMove}? ${pick(adjectives)} behavior.`,
        () => `Great minds do NOT think alike. ${pick(roasts)}.`,
      ];
      insult = pick(templates)();
    }
  }

  // --- MATCH OVER LOGIC ---
  if (result.includes("MATCH OVER: AI Won")) {
    result_text = pick(vocabulary.game_over_win);
    insult = `Score: ${userScore}-${computerScore}. ${pick(
      openers
    )} uninstall. ${pick(closers)}`;
  } else if (result.includes("MATCH OVER: User Won")) {
    result_text = pick(vocabulary.game_over_loss);
    insult = `Score: ${userScore}-${computerScore}. Doesn't count. ${pick(
      excuses
    )}`;
  }

  return { result_text, insult };
};
