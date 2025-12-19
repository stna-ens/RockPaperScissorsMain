// Rock Paper Scissors game made with JavaScript by Enes Kış 2025
// No loops allowed

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

function getComputerChoice() {
  let selectorPC = Math.random();
  if (selectorPC < 0.3) {
    return "Rock";
  } else if (selectorPC >= 0.3 && selectorPC < 0.6) {
    return "Paper";
  } else if (selectorPC >= 0.6 && selectorPC <= 1) {
    return "Scissors";
  }
}
let computerScore = 0;
let userScore = 0;
function playRound(userChoice, computerChoice) {
  userChoice = userChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();
  if (userScore >= 5 || computerScore >= 5) {
    return;
  } else if (userChoice == "rock" && computerChoice == "paper") {
    computerScore += 1;
    results.textContent = "You Lose! Paper swallows the rock!";
  } else if (userChoice == "rock" && computerChoice == "scissors") {
    userScore += 1;
    results.textContent = "You Won! Rock breaks scissors!";
  } else if (userChoice == "paper" && computerChoice == "scissors") {
    computerScore += 1;
    results.textContent = "You lose! Scissors cut the paper!";
  } else if (userChoice == computerChoice) {
    results.textContent = "Draw";
  } else if (userChoice == "paper" && computerChoice == "rock") {
    userScore += 1;
    results.textContent = "You Win! Paper swallows the rock!";
  } else if (userChoice == "scissors" && computerChoice == "rock") {
    computerScore += 1;
    results.textContent = "You Lost! Rock breaks the scissors!";
  } else if (userChoice == "scissors" && computerChoice == "paper") {
    userScore += 1;
    results.textContent = "You Win! Scissors cut the paper!";
  }
  if (userScore >= 5 || computerScore >= 5) {
    if (userScore > computerScore) {
      results.textContent =
        "You Won! Technology is not advenced enough to beat u!";
    } else if (computerScore > userScore) {
      results.textContent =
        "You Lost! You are less intelligent than a fuckin computer!";
    } else {
      results.textContent =
        "I can't believe you have the same intelligence level as your fucking 4 gb ram trashbox. Stupid ahh.";
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
});
