require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve frontend files

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  try {
    const { userMove, computerMove, result } = req.body;

    // Switch to gemini-flash-latest (often most stable)
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      You are an arrogant, sarcastic, and slightly evil AI playing Rock Paper Scissors.
      The user just played: ${userMove}
      You (the AI) played: ${computerMove}
      The result is: ${result} (Winner: ${
      result === "Draw" ? "None" : result.includes("You Won") ? "User" : "AI"
    })

      Generate a short, snappy, one-sentence response.
      - If you won, mock the user's intelligence or their pathetic choice.
      - If you lost, make a ridiculous technical excuse (lag, cosmic rays, binary overflow) or claim you let them win.
      - If it's a draw, complain about their lack of originality.
      
      Do NOT just say who won. Assume the user knows the rules. Be purely atmospheric and arrogant.
      Keep it under 20 words.
    `;

    const resultGen = await model.generateContent(prompt);
    const response = await resultGen.response;
    const text = response.text();

    res.json({ message: text.trim() });
  } catch (error) {
    console.error("Error generating AI response:", error.message);
    // FALLBACK: Procedural Generation if API fails
    res.json({ message: generateFallbackMessage(req.body.result) });
  }
});

// Fallback Vocabulary
const openers = ["Pathetic.", "Look,", "Sigh.", "Predictable.", "Boring."];
const verbs = ["crushed", "deleted", "outsmarted", "calculated"];
const nouns = ["strategy", "algorithm", "CPU", "attempt"];
const adjectives = ["flawed", "slow", "basic", "primitive"];
const excuses = ["lag", "input error", "glitch", "solar flare"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFallbackMessage(result) {
  const opener = getRandom(openers);
  const verb = getRandom(verbs);
  const noun = getRandom(nouns);
  const excuse = getRandom(excuses);

  if (result === "AI Won") {
    return `${opener} I ${verb} your ${getRandom(
      adjectives
    )} ${noun}. (Offline Mode)`;
  } else if (result === "You Won") {
    return `${opener} That was clearly a ${excuse}. (Offline Mode)`;
  } else {
    return `${opener} Stop copying my ${noun}. (Offline Mode)`;
  }
}

app.listen(port, () => {
  console.log(`Arrogant AI server running on http://localhost:${port}`);
});
