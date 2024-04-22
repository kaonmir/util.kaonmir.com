import {CronTime} from "cron";

function testUnitRange(index: number, value: number): boolean {
  const NUMBERS = [
    [0, 59],
    [0, 23],
    [1, 31],
    [1, 12],
    [0, 6],
  ];

  return value >= NUMBERS[index][0] && value <= NUMBERS[index][1];
}

export class CronTimeExt extends CronTime {
  // @return number
  //   -1: non-specific error
  //   0: valid
  //   bit 1: error on minute
  //   bit 2: error on hour
  //   bit 3: error on day of month
  //   bit 4: error on month
  //   bit 5: error on day of week
  static verify(text: string): number {
    const arr = text.split(" ").filter((v) => v !== "");

    let errors = Array(5).fill(false);

    if (arr.length > 5) return -1;
    else if (arr.length < 5) {
      for (let i = arr.length; i < 5; i++) {
        errors[i] = true;
      }
    }

    const result = arr.map((value, index) => {
      if (value === "*") return true;
      return value.split(",").forEach((v) => {
        const numbers = v.split("-");
        if (numbers.length > 2) errors[index] = true;
        else if (numbers.length === 2) {
          // Range case
          const [a, b] = numbers.map((v) => parseInt(v));
          if (isNaN(a) || isNaN(b)) errors[index] = true;
          else if (!testUnitRange(index, a) || !testUnitRange(index, b))
            errors[index] = true;
          else if (a > b) errors[index] = true;
        } else {
          // Single case
          const k = parseInt(v);
          if (isNaN(k) || !testUnitRange(index, k)) errors[index] = true;
        }
      });
    });

    return errors.reduce((acc, cur, index) => {
      if (cur) return acc | (1 << index);
      return acc;
    }, 0);
  }

  constructor(text: string) {
    super(text);
  }
}
