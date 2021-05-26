const body = document.querySelector('body');
const comHand = document.getElementById('com-choice');
const playerHand = document.getElementById('player-choice');
const playerChoice = document.querySelectorAll('.choice');
const playerScore = document.querySelector('.player-score');
playerScore.innerHTML = 0;
const comScore = document.querySelector('.com-score');
comScore.innerHTML = 0;
const result = document.querySelector('.round')
const resultNum = document.querySelector('.round-num');
resultNum.innerHTML = 1;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.style.disabled = false);

const refresh = document.querySelector('.submit-button');

const choiceArr = [
    'far fa-hand-rock fa-3x', 
    'far fa-hand-paper fa-3x', 
    'far fa-hand-scissors fa-3x'
];

function randomChoice() {
    let choice = Math.floor(Math.random() * choiceArr.length);
    return choiceArr[choice];
}

function compare(playerChoice) {
    let comChoice = randomChoice();
    switch(playerChoice) {
        case comChoice:
            draw(comChoice, playerChoice);
            break;

        case 'far fa-hand-rock fa-3x':
            if (comChoice == 'far fa-hand-paper fa-3x') {
                lose(comChoice, playerChoice);
            } else {
                win(comChoice, playerChoice);
            }
            break;

        case 'far fa-hand-paper fa-3x':
            if (comChoice == 'far fa-hand-scissors fa-3x') {
                lose(comChoice, playerChoice);
            } else {
                win(comChoice, playerChoice);
            }
            break;

        case 'far fa-hand-scissors fa-3x':
            if (comChoice == 'far fa-hand-rock fa-3x') {
                lose(comChoice, playerChoice);
            } else {
                win(comChoice, playerChoice);
            }
    }
}

function showHands(com, player) {
    comHand.className = com;
    playerHand.className = player;
}

function draw(com, player) {
    body.style.backgroundColor = 'whitesmoke';
    showHands(com, player);
    resetRound();
}

function lose(com, player) {
    body.style.backgroundColor = 'rgb(139, 36, 36)';
    showHands(com, player);
    comScore.innerHTML++;
    resetRound();
}

function win(com, player) {
    body.style.backgroundColor = 'rgb(104, 199, 104)';
    showHands(com, player);
    playerScore.innerHTML++;
    resetRound();
}

function resetRound() {
    console.log('Next round in 2 secs...')
    buttons.forEach(button => button.style.disabled = true);
    setTimeout(() => {
        if (resultNum.innerHTML == 5) {
            endGame();
        } else {
            body.style.backgroundColor = 'rgb(145, 171, 194)';
            comHand.className = 'far fa-hand-rock fa-3x';
            playerHand.className= 'far fa-hand-rock fa-3x';
            buttons.forEach(button => button.style.disabled = false);
            resultNum.innerHTML++;
        }
    }, 2000);
}

function endGame() {
    refresh.classList.add('show-submit');
    if (comScore.innerHTML > playerScore.innerHTML) {
        result.innerHTML = 'YOU LOSE';
        body.style.backgroundColor = 'rgb(139, 36, 36)';
    } else if (comScore.innerHTML < playerScore.innerHTML) {
        result.innerHTML = 'YOU WIN';
        body.style.backgroundColor = 'rgb(104, 199, 104)';
    } else {
        result.innerHTML = 'DRAW';
        body.style.backgroundColor = 'whitesmoke';
    }
}

function playGame(e) {
    this.currentTime = 0;
    if (e.target.classList.contains('fa-hand-rock')) {
        compare('far fa-hand-rock fa-3x');
    } else if (e.target.classList.contains('fa-hand-paper')) {
        compare('far fa-hand-paper fa-3x');
    } else {
        compare('far fa-hand-scissors fa-3x');
    }
}

function refreshPage() {
    window.location.reload(); //refreshes page
}

playerChoice.forEach(button => {
    button.addEventListener('click', playGame);
});

refresh.addEventListener('click', refreshPage);