const helper = require("./helper");
require("colors");

async function play() {
    const userChoice = await helper.getUserChoice();
    const computerChoice = helper.getComputerChoice();
    const won = helper.decideWon(userChoice, computerChoice);

    console.info("\nYour choice    : ".cyan + userChoice.green);
    console.info("Computer choice: ".cyan + computerChoice.green + "\n");
    if (won === 1) {
        console.info("You WON!!!".green);
    } else if (won === 2) {
        console.info("Computer WON!!!".red);
    } else {
        console.info("Scoreless!!!".yellow)
    }
};

module.exports = {
    play
}