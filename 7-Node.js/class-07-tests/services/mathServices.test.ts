import { describe, expect, it, test } from "vitest";
import { subNumbers, sumNumbers } from "./mathServices";

describe("test math functions", () => {
  test("should make a sum 2 + 3 = 5", () => {
    expect(sumNumbers(2, 3)).toEqual(5);
  });
 
  it("should make a sub 2 - 3 = 1", () => {
    expect(subNumbers(3, 2)).toEqual(1);
  });
});
