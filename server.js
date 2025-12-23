require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001;

app.use((req, res, next) => {
  console.log(
    `Incoming request: ${req.method} ${req.url} from ${req.headers.origin}`
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve frontend files

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  const { userMove, computerMove, result, userScore, computerScore, history } =
    req.body;
  try {
    console.log("Attempting to use Gemini API...");

    // Switch to gemini-2.0-flash-exp (Known working model)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Analyze History for Patterns
    const last3UserMoves = history ? history.slice(-3).map((h) => h.user) : [];
    const isSpamming =
      last3UserMoves.length === 3 &&
      last3UserMoves.every((m) => m === last3UserMoves[0]);
    const spamMsg = isSpamming
      ? `(User is spamming ${last3UserMoves[0]} - CALL THEM OUT)`
      : "";

    // Score Context
    const scoreDiff = computerScore - userScore;
    const scoreMsg =
      scoreDiff > 2
        ? "(User is getting crushed)"
        : scoreDiff < -2
        ? "(User is dominating)"
        : "(Close game)";

    const prompt = `
      You are a toxic, modern AI playing Rock Paper Scissors.
      
      MATCH CONTEXT:
      - Latest Move: User (${userMove}) vs AI (${computerMove}) -> Result: ${result}
      - Score: User ${userScore} - ${computerScore} AI ${scoreMsg}
      - History: ${JSON.stringify(history)} ${spamMsg}
      
      Your goal is to roast the user using modern STREET SLANG and Gen Z vocabulary.
      You MUST be context-aware. If they are spamming, call it out. If they are losing bad, mock them. If they just won by luck, flame them.

      Respond STRICTLY in this JSON format:
      {
        "result_text": "A creative, rude way to describe the outcome. Max 8 words.",
        "insult": "A cutting, slang-heavy insult based on the specific context. Max 20 words."
      }

      Tone guidelines:
      - USE: 'cap', 'bet', 'fam', 'bruh', 'opp', 'cooked', 'ate', 'folded', 'lowkey', 'highkey', 'trippin', 'bot', 'NPC', 'lobotomized'.
      - AVOID: "Gamer" slang like 'diff', 'nerf', 'buff'.
      - AVOID: "Robot" talk like 'circuits', 'processing'.
      - STYLE: Disrespectful, brief, toxic TikTok commenter energy. MAKE IT PERSONAL using the history/score.

      SPECIAL RULE FOR "MATCH OVER":
      If the 'result' contains "MATCH OVER":
      - "result_text": "GG EZ", "Sit Down", "Tutorial Completed", etc.
      - "insult": Final verdict based on final score.
    `;

    const resultGen = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9, // High creativity
      },
    });
    const response = await resultGen.response;
    const text = response.text();
    // console.log("Gemini Raw Output:", text); // Debug log

    // Clean up markdown code blocks if present
    const jsonStr = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(jsonStr);

    res.json(data);
  } catch (error) {
    console.error("Error generating AI response:", error.message);
    console.log("Using Procedural Fallback...");
    // FALLBACK: Procedural Generation if API fails
    res.json(
      generateProceduralResponse(req.body.result, userMove, computerMove)
    );
  }
});

// Procedural Generation Vocabulary
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

function generateProceduralResponse(result, userMove, computerMove) {
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
    // Strategy: [Observation] + [Roast] + [Closer]
    const structures = [
      // Structure A: Direct Move Comparison
      `Imagine thinking ${uMove} beats ${cMove}. ${pick(roasts)}.`,
      // Structure B: Action Verb Focus
      `I just ${pick(verbs)} your ${uMove} instantly. ${pick(closers)}`,
      // Structure C: Persona Disappointment
      `${pick(openers)} playing ${uMove} is huge ${pick(nouns)} behavior.`,
      // Structure D: Meta Commentary
      `My code knew you'd pick ${uMove}. You are ${pick(adjectives)}.`,
      // Structure E: Short & Toxic
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
      // Structure A: Blame External Factors
      `${pick(excuses)} That's the only reason my ${cMove} lost.`,
      // Structure B: Accusation
      `${pick(openers)} check him PC. That ${uMove} was suspicious.`,
      // Structure C: Denial
      `You didn't win, I lagged. ${pick(closers)}`,
      // Structure D: Skill Denial
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
}

app.listen(port, () => {
  console.log(`Arrogant AI server running on http://localhost:${port}`);
});
