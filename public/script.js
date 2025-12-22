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
    const response = await fetch("/api/chat", {
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
    return data.message;
  } catch (error) {
    console.error(error);
    return "My cognitive circuits are offline, but I still despise you.";
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

  results.textContent = "AI Assessing...";

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
  const feedback = await fetchFeedback(
    userChoice,
    computerChoice,
    outcomeDescription
  );

  results.innerHTML = `${roundResultText}<br><div style="margin-top: 10px; font-style: italic; color: #ffeb3b;">"${feedback}"</div>`;

  if (userScore >= 5 || computerScore >= 5) {
    if (userScore > computerScore) {
      results.textContent =
        "You Won! Technology is not advenced enough to beat u!";
    } else if (computerScore > userScore) {
      results.textContent =
        "You Lost! You are less intelligent than a computer!";
    } else {
      results.textContent =
        "I can't believe you have the same intelligence level as your 4 gb ram PC.";
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
  lastUserMove = null;
});
