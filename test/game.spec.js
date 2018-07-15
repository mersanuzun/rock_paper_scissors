const assert = require('assert');
const expect = require('chai').expect;
const sinon = require("sinon");
const game = require("../src/game");
const helper = require("../src/helper");

describe("Game", () => {
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    describe("play", () => {
        let consoleSpy;
        beforeEach(() => {
            consoleSpy = sandbox.stub(console, "info");
            sandbox.stub(helper, "getUserChoice").returns(Promise.resolve("1"));    
            sandbox.stub(helper, "getComputerChoice").returns("paper");
        });

        it("should log 'You WIN!!!', if user wins", async () => {
            sandbox.stub(helper, "decideWon").returns(1); // 1 indicates user

            await game.play();

            const gameResult = consoleSpy.getCall(2).args[0];

            expect(gameResult).include("You WON!!!");
        });

        it("should log 'Computer WIN!!!', if computer wins", async () => {
            sandbox.stub(helper, "decideWon").returns(2); // 1 indicates computer

            await game.play();

            const gameResult = consoleSpy.getCall(2).args[0];

            expect(gameResult).include("Computer WON!!!");
        });

        it("should log 'Scoreless!!!', if user and computer decision are same", async () => {
            sandbox.stub(helper, "decideWon").returns(0); // 0 indicates decisions are same

            await game.play();

            const gameResult = consoleSpy.getCall(2).args[0];

            expect(gameResult).include("Scoreless!!!");
        });
    });
});