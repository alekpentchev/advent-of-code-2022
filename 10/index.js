const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf-8").split("\n");

class SignalStrengths {
  constructor() {
    this.cycle = 0;
    this.x = 1;
    this.strengths = Array(6).fill(0);
  }

  calculateSignalStrength() {
    if (this.cycle === 20) {
      this.strengths[0] = this.cycle * this.x;
    } else if (this.cycle === 60) {
      this.strengths[1] = this.cycle * this.x;
    } else if (this.cycle === 100) {
      this.strengths[2] = this.cycle * this.x;
    } else if (this.cycle === 140) {
      this.strengths[3] = this.cycle * this.x;
    } else if (this.cycle === 180) {
      this.strengths[4] = this.cycle * this.x;
    } else if (this.cycle === 220) {
      this.strengths[5] = this.cycle * this.x;
    }
  }

  updateSignalStrengths() {
    if ([20, 60, 100, 140, 180, 220].includes(this.cycle)) {
      this.calculateSignalStrength();
    }
  }

  getSignalStrengthsSum() {
    return this.strengths.reduce((acc, val) => acc + val, 0);
  }

  tick(howMany, val) {
    this.cycle += 1;
    this.updateSignalStrengths();

    if (howMany > 1) {
      return this.tick(howMany - 1, val);
    }

    this.x = this.x + val;
  };
}

const getSignalStrengths = (data) => {
  const Strengths = new SignalStrengths();

  for (let idx = 0; idx < data.length; idx++) {
    const operation = data[idx];

    if (operation === "noop") {
      Strengths.cycle += 1;
      Strengths.updateSignalStrengths();
    } else if (operation.startsWith("addx")) {
      const xVal =  Number(operation.split(" ")[1])
      Strengths.tick(2, xVal);
    }
  }

  return Strengths.getSignalStrengthsSum();
};

console.log(getSignalStrengths(data));
