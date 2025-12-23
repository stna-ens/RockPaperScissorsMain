// Rock Paper Scissors game made with JavaScript by Enes Kış 2025
// No loops allowed

// AI State
const transitionMatrix = {
  Rock: { Rock: 0, Paper: 0, Scissors: 0 },
  Paper: { Rock: 0, Paper: 0, Scissors: 0 },
  Scissors: { Rock: 0, Paper: 0, Scissors: 0 },
};
let lastUserMove = null;

async function fetchFeedback(userMove, computerMove, result) {
  try {
    // Determine API URL: If served from port 3001, use relative path.
    // Otherwise (Live Server, file://, etc.), assume backend is at http://localhost:3001
    const API_URL = window.location.origin.includes(":3001")
      ? "/api/chat"
      : "http://127.0.0.1:3001/api/chat";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMove,
        computerMove,
        result,
      }),
    });
    if (!response.ok) throw new Error("Server error");
    const data = await response.json();
    return data; // Return full object { result_text, insult }
  } catch (error) {
    console.error(error);
    // Return a mocked object structure for the catch block in playRound to handle
    if (typeof window.generateOfflineResponse === "function") {
      console.log("Using offline generator...");
      return window.generateOfflineResponse(result, userMove, computerMove);
    } else {
      return {
        result_text: "(Connection Error)",
        insult: `My cognitive circuits are offline. Error: ${error.message}`,
      };
    }
  }
}

function getComputerChoice() {
  if (!lastUserMove) {
    return getRandomChoice();
  }

  const prevStats = transitionMatrix[lastUserMove];
  let predictedMove = null;
  let maxCount = -1;

  for (const move in prevStats) {
    if (prevStats[move] > maxCount) {
      maxCount = prevStats[move];
      predictedMove = move;
    }
  }

  if (maxCount === 0) {
    return getRandomChoice();
  }

  if (predictedMove === "Rock") return "Paper";
  if (predictedMove === "Paper") return "Scissors";
  if (predictedMove === "Scissors") return "Rock";
}

function getRandomChoice() {
  let selectorPC = Math.random();
  if (selectorPC < 0.33) {
    return "Rock";
  } else if (selectorPC < 0.66) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function updateAI(currentUserMove) {
  currentUserMove =
    currentUserMove.charAt(0).toUpperCase() +
    currentUserMove.slice(1).toLowerCase();

  if (lastUserMove) {
    transitionMatrix[lastUserMove][currentUserMove]++;
  }
  lastUserMove = currentUserMove;
}

const buttons = document.createElement("div");
buttons.classList.add("buttons");
const rockBtn = document.createElement("button");
const paperBtn = document.createElement("button");
const scissorsBtn = document.createElement("button");

let userPoint = document.querySelector(".userScore");
let computerPoint = document.querySelector(".computerScore");
const userSelection = document.querySelector(".userSelection");
const computerSelection = document.querySelector(".computerSelection");

rockBtn.textContent = "Rock";
paperBtn.textContent = "Paper";
scissorsBtn.textContent = "Scissors";

buttons.appendChild(rockBtn);
buttons.appendChild(paperBtn);
buttons.appendChild(scissorsBtn);
document.body.appendChild(buttons);

const results = document.createElement("div");
results.classList.add("results");
document.body.appendChild(results);

let computerScore = 0;
let userScore = 0;
async function playRound(userChoice, computerChoice) {
  userChoice = userChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();

  if (userScore >= 5 || computerScore >= 5) {
    return;
  }

  const loadingMessages = [
    "Judging your bad choice...",
    "Generating insult...",
    "Laughing at you...",
    "Reading your tiny mind...",
    "Loading disrespect...",
    "Calculating your failure...",
  ];
  results.textContent =
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  let roundResultText = "";
  let winner = ""; // 'user', 'computer', 'draw'

  if (userChoice == "rock" && computerChoice == "paper") {
    computerScore += 1;
    winner = "computer";
    roundResultText = "(Paper swallows Rock)";
  } else if (userChoice == "rock" && computerChoice == "scissors") {
    userScore += 1;
    winner = "user";
    roundResultText = "(Rock breaks Scissors)";
  } else if (userChoice == "paper" && computerChoice == "scissors") {
    computerScore += 1;
    winner = "computer";
    roundResultText = "(Scissors cut Paper)";
  } else if (userChoice == computerChoice) {
    winner = "draw";
    roundResultText = "(It's a Draw)";
  } else if (userChoice == "paper" && computerChoice == "rock") {
    userScore += 1;
    winner = "user";
    roundResultText = "(Paper swallows Rock)";
  } else if (userChoice == "scissors" && computerChoice == "rock") {
    computerScore += 1;
    winner = "computer";
    roundResultText = "(Rock breaks Scissors)";
  } else if (userChoice == "scissors" && computerChoice == "paper") {
    userScore += 1;
    winner = "user";
    roundResultText = "(Scissors cut Paper)";
  }

  // Get AI Feedback
  const outcomeDescription =
    winner === "draw" ? "Draw" : winner === "user" ? "You Won" : "AI Won";

  let feedbackData;
  try {
    feedbackData = await fetchFeedback(
      userChoice,
      computerChoice,
      outcomeDescription
    );
  } catch (e) {
    feedbackData = {
      result_text: roundResultText, // Fallback to hardcoded
      insult: "My brain is offline, but you still suck.",
    };
  }

  // Use AI generated result text if available, otherwise fallback
  const finalResultText = feedbackData.result_text || roundResultText;
  const finalInsult = feedbackData.insult || feedbackData.message || "Error";

  results.innerHTML = `${finalResultText}<br><div style="margin-top: 10px; font-style: italic; color: #ffeb3b;">"${finalInsult}"</div>`;

  if (userScore >= 5 || computerScore >= 5) {
    const verdict =
      userScore > computerScore ? "MATCH OVER: User Won" : "MATCH OVER: AI Won";

    // Show temporary loading for final verdict
    results.innerHTML = `GAME OVER...<br><div style="margin-top: 10px; font-style: italic; color: #ffeb3b;">"Calculating final judgment..."</div>`;

    // Fetch the final roast
    try {
      const finalData = await fetchFeedback(
        userChoice,
        computerChoice,
        verdict
      );
      const finalResult = finalData.result_text || "GAME OVER";
      const finalInsult =
        finalData.insult || finalData.message || "My circuits are fried.";
      results.innerHTML = `${finalResult}<br><div style="margin-top: 10px; font-style: italic; color: #ff0000;">"${finalInsult}"</div>`;
    } catch (e) {
      results.textContent = "GAME OVER (Connection Failed)";
    }

    replayBtn.style.display = "block";
  }
  userPoint.textContent = "User: " + userScore;
  computerPoint.textContent = "Computer: " + computerScore;
  const userChoiceFirstLetter =
    userChoice.charAt(0).toUpperCase() + userChoice.slice(1);
  const computerChoiceFirstLetter =
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
  userSelection.textContent = "User: " + userChoiceFirstLetter;
  computerSelection.textContent = "Computer: " + computerChoiceFirstLetter;

  // Update AI with the user's latest choice
  updateAI(userChoiceFirstLetter);
}
rockBtn.addEventListener("click", function () {
  let userChoice = "Rock";
  let computerChoice = getComputerChoice();
  playRound(userChoice, computerChoice);
});
paperBtn.addEventListener("click", function () {
  let userChoice = "Paper";
  let computerChoice = getComputerChoice();
  playRound(userChoice, computerChoice);
});
scissorsBtn.addEventListener("click", function () {
  let userChoice = "Scissors";
  let computerChoice = getComputerChoice();
  playRound(userChoice, computerChoice);
});

const header = document.querySelector(".header");

const theGameAndHeader = document.createElement("div");
theGameAndHeader.classList.add("theGameAndHeader");
document.body.appendChild(theGameAndHeader);
theGameAndHeader.appendChild(header);
theGameAndHeader.appendChild(buttons);
theGameAndHeader.appendChild(results);

const footer = document.createElement("div");
footer.classList.add("footer");
document.body.appendChild(footer);
footer.textContent = "Made by Enes Kış";

const score = document.querySelector(".score");
const userAndComputerSelection = document.querySelector(
  ".userAndComputerSelection"
);

//End of the line

const replayBtn = document.createElement("button");
replayBtn.textContent = "Replay";
replayBtn.style.display = "none";
replayBtn.classList.add("replayBtn");
theGameAndHeader.appendChild(replayBtn);

replayBtn.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  userPoint.textContent = "User: " + userScore;
  computerPoint.textContent = "Computer: " + computerScore;
  results.textContent = "";
  userSelection.textContent = "";
  computerSelection.textContent = "";
  replayBtn.style.display = "none";
  // Enable buttons again if we disabled them, but currently we don't disable them.
  // Ideally we should disable game buttons when game ends so user can't keep playing without replaying.
  // The current logic in playRound checks if score >= 5 and returns early, so that's handled.

  // Reset AI memory for the current session (optional, but keeps rounds fair)
  // lastUserMove = null; // DISABLED: User wants AI to remember playing style across replays
});
