let playerDice = [];
let dealerDice = [];

// adds new dice to the displayed array
function newDice() {
    document.getElementById("playerDice").value = "Player Dice: " + playerDice.join(", ");
    document.getElementById("dealerDice").value = "Dealer Dice: " + dealerDice.join(", ");

    document.getElementById("playerScore").value = "Player Score: " + calculateScore(playerDice);
    document.getElementById("dealerScore").value = "Dealer Score: " + calculateScore(dealerDice);
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function initDeal() {
    playerDice = [rollDie(), rollDie(), rollDie()];
    dealerDice = [rollDie(), rollDie()];
    
    newDice();
}   

function calculateScore(dice) {
    return dice.reduce((total, die) => total + die, 0);
}

function playerHit() {
    playerDice.push(rollDie());
    newDice();
    if (calculateScore(playerDice) > 21) {
        alert("Bust! Dealer wins.");
    }
}

function playerStand() {
    let playerScore = calculateScore(playerDice);
    // most casinos have the dealer hold on a soft 17. Only 6 possible "cards" with equal 
    // probability, so the dealer stands on 18 or higher no matter what.
    while (calculateScore(dealerDice) < 18) {
        dealerDice.push(rollDie());
        newDice();
    }
    determineWinner();
}

function determineWinner() {
    let playerScore = calculateScore(playerDice);
    let dealerScore = calculateScore(dealerDice);

    if (playerScore > 21) {
        alert("Player busts! Dealer wins.");
    } else if (dealerScore > 21) {
        alert("Dealer busts! Player wins.");
    } else if (playerScore > dealerScore) {
        alert("Player wins!");
    } else if (dealerScore > playerScore) {
        alert("Dealer wins!");
    } else {
        alert("It's a tie!");
    }
}

function resetGame() {
    playerDice = [];
    dealerDice = [];
    initDeal();
}

// Enter key to hit, backspace to stand, and space to reset the game

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        playerHit();
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Backspace") {
        playerStand();
    }
})

document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        resetGame();
    }
});

