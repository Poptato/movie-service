const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const Calculator = require("../../src/model/calculator");

const expect = chai.expect;
chai.use(sinonChai);

describe("Calculator", function () {
   describe("add", function() {
      it("should return positive for two positives", function() {
          expect(Calculator.add(5, 4)).to.be.equal(9);
      });

      it("should return negative for two negatives", function() {
          expect(Calculator.add(-5, -4)).to.be.equal(-9);
      });

       it("should return other number if one is 0", function() {
           expect(Calculator.add(5, 0)).to.be.equal(5);
           expect(Calculator.add(0, 4)).to.be.equal(4);
           expect(Calculator.add(-5, 0)).to.be.equal(-5);
       });
   });

    describe("sub", function() {
        it("should add return positive if left operand is bigger", function() {
            expect(Calculator.sub(5, 4)).to.be.equal(1);
        });

        it("should add return negative if right operand is bigger", function() {
            expect(Calculator.sub(4, 5)).to.be.equal(-1);
        });

        it("should return other zero if both operand are equal", function() {
            expect(Calculator.sub(5, 5)).to.be.equal(0);
            expect(Calculator.sub(-5, -5)).to.be.equal(0);
        });
    });

    describe("mul", function() {
        it("should add return positive for two positives", function() {
            expect(Calculator.mul(5, 4)).to.be.equal(20);
        });

        it("should return positive for two negatives", function() {
            expect(Calculator.mul(-5, -4)).to.be.equal(20);
        });

        it("should return negative for one positive one negative", function() {
            expect(Calculator.mul(5, -4)).to.be.equal(-20);
            expect(Calculator.mul(-5, 4)).to.be.equal(-20);
        });

        it("should return 0 number if one is 0", function() {
            expect(Calculator.mul(5, 0)).to.be.equal(0);
            expect(Calculator.mul(0, 4)).to.be.equal(0);
        });
    });
});