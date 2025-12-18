// Rock Paper Scissors game made with JavaScript by Enes Kış 2025
// No loops allowed

const buttons = document.createElement("div");
buttons.classList.add("buttons");
const rockBtn = document.createElement("button");
const paperBtn = document.createElement("button");
const scissorsBtn = document.createElement("button");

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
  }
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

//End of the line
