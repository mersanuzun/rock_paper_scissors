const assert = require('assert');
const expect = require('chai').expect;
const sinon = require("sinon");
const helper = require("../src/helper");

describe("Helper", () => {
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("getComputerChoice", () => {
        it("should return one of the 'rock, paper, scissors'", () => {
            const computerChoice = helper.getComputerChoice();

            expect(["rock", "paper", "scissors"]).include(computerChoice)
        });
    });

    describe("getUserChoice", () => {
        const readline = require("readline");
        let lineReader, consoleSpy;

        beforeEach(() => {
            lineReader = {
                on: sandbox.stub(),
                close: sandbox.stub()
            };
            consoleSpy = sandbox.stub(console, "info");
            sandbox.stub(readline, "createInterface").returns(lineReader);
        });

        it("should call 'on' method of lineReader", () => {
            helper.getUserChoice();

            sandbox.assert.calledOnce(lineReader.on);
        });

        it("should return 'rock' and close the lineReader if user enters '1'", (done) => {
            const userChoice = helper.getUserChoice();

            const callback = lineReader.on.getCall(0).args[1];
            callback("1"); // user enters '1'

            userChoice.then(res => {
                expect(res).equal("rock");
                sandbox.assert.calledOnce(lineReader.close);
                done()
            });
        });
        
        it("should log and wait for re-enter new input if user enters different from '1,2 or 3'", () => {
            const userChoice = helper.getUserChoice();

            const callback = lineReader.on.getCall(0).args[1];
            callback("none"); // user enters 'none'

            const infoLogForWrongInput = consoleSpy.getCall(1).args[0];

            expect(infoLogForWrongInput).equal("Please enter 1, 2 or 3");
        })
            
    });

    describe("decideWon", () => {
        it("should return 0 if user and computer decision are same", () => {
            const won = helper.decideWon("same", "same");

            expect(won).equal(0);
        });

        it("should return 1 if user's decision is paper and computer's decision is rock", () => {
            const won = helper.decideWon("paper", "rock");

            expect(won).equal(1);
        });

        it("should return 2 if user's decision is rock and computer's decision is paper", () => {
            const won = helper.decideWon("rock", "paper");

            expect(won).equal(2);
        });
    });
});