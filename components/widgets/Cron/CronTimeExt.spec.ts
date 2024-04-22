// sum.test.js
import {expect, test} from "vitest";
import {CronTimeExt} from "./CronTimeExt";

const Cases: [string, number][] = [
  ["1 2 3 4 5", 0],
  ["1 2 3 4", 16],
  ["1 2 3 4 5 6", -1],
  ["1-2 3 4 5 6", 0],
  ["   1    3   4    5 6 ", 0],
  ["4-2 3 4 5 1", 1],
  ["4-2 3 4 5", 17],
  ["4-2 3 4 5 4", 1],
  ["4-2 3 4 5 111", 17],
  ["4-2 3 4 5 11", 17],
  ["s 2 3 4 5", 1],
  ["1,2,3,4-5 1-3 4 p", 8 + 16],
  ["", 31],
  ["     ", 31],
];

for (const [input, expected] of Cases) {
  test(`verify ${input}`, () => {
    expect(CronTimeExt.verify(input)).toBe(expected);
  });
}
