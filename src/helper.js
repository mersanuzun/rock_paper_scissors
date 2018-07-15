const readline = require('readline');
require("colors");

const choices = ["rock", "paper", "scissors"];

// 1: Player one won
// 2: Player two won
const gameRule = {
    "paper_rock": 1,
    "rock_paper": 2,
    "scissors_paper": 1,
    "paper_scissors": 2,
    "rock_scissors": 1,
    "scissors_rock": 2
};

function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
};

function getUserChoice() {
    const lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.info(
        "Choose one of them: " +
        "1".green + "=Rock," +
        "2".green + "=Paper," +
        "3".green + "=Scissors"
    );

    return new Promise((res, rej) => {
        lineReader.on('line', (line) => {
            const userChoiceIndex = parseInt(line);
            if (userChoiceIndex >= 1 && userChoiceIndex <= 3) {
                lineReader.close();
                res(choices[userChoiceIndex - 1]);
            } else {
                console.info("Please enter 1, 2 or 3");
            }
        });
    });
};

function decideWon(userChoice, computerCoice) {
    if (userChoice === computerCoice) {
        return 0;
    }

    return gameRule[`${userChoice}_${computerCoice}`];
}

module.exports = {
    getUserChoice,
    getComputerChoice,
    decideWon
}