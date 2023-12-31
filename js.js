let beginBtn = document.querySelector('#game-start-btn');
beginBtn.addEventListener("click", beginMatch);

playerScore = 0;
computerScore = 0;
roundNum = 0;

const scorePlayerNode = document.createElement("div");
scorePlayerNode.classList.add("score-player");
scorePlayerNode.textContent = `Your score is 0.`;

const scoreComputerNode = document.createElement("div");
scoreComputerNode.classList.add("score-computer");
scoreComputerNode.textContent = `Computer score is 0.`;

const matchResultDiv = document.createElement("div");
matchResultDiv.classList.add("match-result-div");

const roundContainer = document.createElement("div");
roundContainer.classList.add('round-container');

const footer = document.querySelector('.footer');


function beginMatch() {
    playerScore = 0;
    computerScore = 0;
    roundNum = 0;

    const headerRulesDiv = document.querySelector(".header-rules");
    if (headerRulesDiv) {
        headerRulesDiv.remove();
    }
    

    const weaponDiv = document.createElement("div");
    weaponDiv.classList.add("weapon");
    document.body.insertBefore(weaponDiv, footer);
    const weaponDivText = document.createElement("div");
    weaponDivText.textContent = "Choose your weapon";
    weaponDivText.classList.add("weapon-div-text");
    // weaponDiv.append(weaponDivText);
    document.body.insertBefore(weaponDivText, weaponDiv);

    beginBtn.remove();

    divsDelete = document.querySelectorAll('.round');
    divsDelete.forEach((div) => div.remove());

    matchResultDiv.remove();
    scorePlayerNode.textContent = `Player score: ${playerScore}`;
    scoreComputerNode.textContent = `Computer score: ${computerScore}`;

    const weapons = ["Rock", "Paper", "Scissors"];

    weapons.forEach((weapon) => {
        const btn = document.createElement("button");
        btn.id = weapon.toLocaleLowerCase();
        btn.textContent = weapon;
        weaponDiv.append(btn);
        btn.addEventListener("click", handleClick)
    })


    document.body.insertBefore(scorePlayerNode, footer);

    document.body.insertBefore(scoreComputerNode, footer);
    document.body.insertBefore(roundContainer, footer);
}


function handleClick(e) {
    roundNum += 1;
    let computerChoice = getComputerChoice();
    let playerChoice = e.target.id;

    const roundDiv = document.createElement("div");
    roundDiv.classList.add(`round`);
    roundDiv.classList.add(`r${roundNum}`);

    const roundTextDiv = document.createElement("div");
    roundTextDiv.classList.add('round-text');
    
    const playerChoiceDiv = document.createElement("div");
    playerChoiceDiv.classList.add("player-choice");

    const computerChoiceDiv = document.createElement("div");
    computerChoiceDiv.classList.add("computer-choice");

    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("results");

    const previousRoundDiv = document.querySelector(`.r${roundNum-1}`);

  
    if (previousRoundDiv) {
        roundContainer.insertBefore(roundDiv, previousRoundDiv);
    }
    if (!previousRoundDiv) {
        roundContainer.append(roundDiv);
    }

    // document.body.append(roundDiv);
    roundDiv.append(roundTextDiv);
    roundDiv.append(playerChoiceDiv);
    roundDiv.append(computerChoiceDiv);
    roundDiv.append(resultsDiv);

    playerChoiceDiv.textContent = `You chose ${playerChoice.toUpperCase()}.`;
    computerChoiceDiv.textContent = `Computer chose ${computerChoice.toUpperCase()}.`;
    resultsDiv.textContent = playRound(playerChoice, computerChoice);
    roundTextDiv.textContent = `Round ${roundNum} results:`;
}


function updateScore() {
    if (playerScore == 3 || computerScore == 3) {
        document.body.insertBefore(matchResultDiv, roundContainer);
        const weaponDiv = document.querySelector('div.weapon');
        weaponDiv.remove();
        const weaponDivText = document.querySelector('div.weapon-div-text');
        weaponDivText.remove();

        beginBtn = document.createElement('button');
        beginBtn.textContent = 'Begin new match';
        beginBtn.id = 'game-start-btn';
        document.body.insertBefore(beginBtn, scorePlayerNode);
        beginBtn.addEventListener("click", beginMatch);
        const headerRulesDiv = document.createElement("div");
        headerRulesDiv.classList.add('header-rules');
        headerRulesDiv.textContent = 'Win 3 rounds to win the match';
        document.body.insertBefore(headerRulesDiv, beginBtn);
        

    
        if (playerScore == 3) {
            matchResultDiv.textContent = "Congratulations! You win the match!";
        }
        else if (computerScore == 3) {
            matchResultDiv.textContent = "Computer wins the match!"
        }
    }

    scorePlayerNode.textContent = `Player score: ${playerScore}`;
    scoreComputerNode.textContent = `Computer score: ${computerScore}`;
}


function getComputerChoice () {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    
    if (computerChoice === 1) {
        return "rock"
    }
    else if (computerChoice ===2) {
        return "paper"
    }
    else 
        return "scissors"
}


function playRound (playerSelection='rock', getComputerChoice) {    

    if (playerSelection.toLowerCase() === getComputerChoice) {
        
        return "Draw";
    }

    else if ((playerSelection.toLowerCase() === "rock" || getComputerChoice === "rock") && (playerSelection.toLowerCase() === "scissors" || getComputerChoice === "scissors")){
        if (playerSelection.toLowerCase() === "rock") {
            playerScore += 1;
            updateScore();
            return "Rock beats Scissors. You win!";
        }
        else
            computerScore += 1;
            updateScore();
            return "Rock beats Scissors. You lose!";
    }

    else if ((playerSelection.toLowerCase() === "rock" || getComputerChoice === "rock") && (playerSelection.toLowerCase() === "paper" || getComputerChoice === "paper")){
        if (playerSelection.toLowerCase() === "rock") {
            computerScore += 1;
            updateScore();
            return "Paper beats Rock. You lose!";
        }
        else
            playerScore += 1;
            updateScore();
            return "Paper beats Rock. You win!";
    }

    else if ((playerSelection.toLowerCase() === "paper" || getComputerChoice === "paper") && (playerSelection.toLowerCase() === "scissors" || getComputerChoice === "scissors")){
        if (playerSelection.toLowerCase() === "paper") {
            computerScore += 1;
            updateScore();
            return "Scissors beat Paper. You lose!";
        }
        else
            playerScore += 1;
            updateScore();
            return "Scissors beat Paper. You win!";
    }
    
    else
        playerScore -= 1; 
        updateScore();
        return "This move is illegal! Taking one point from the player."
}
