import { Calculator } from "./calculator.interface"; 

describe("Calculator", () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it("adds two numbers correctly", () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  it("subtracts two numbers correctly", () => {
    expect(calculator.subtract(5, 3)).toBe(2);
  });

  it("multiplies two numbers correctly", () => {
    expect(calculator.multiply(4, 3)).toBe(12);
  });

  it("divides two numbers correctly", () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  it("throws an error when dividing by zero", () => {
    expect(() => calculator.divide(10, 0)).toThrow("Division by zero is not allowed.");
  });

  it("calculates percentage correctly", () => {
    expect(calculator.percent(200, 10)).toBe(20);
  });

  it("calculates using the calculate method correctly", () => {
    expect(calculator.calculate("add", 2, 3)).toBe(5);
    expect(calculator.calculate("subtract", 5, 3)).toBe(2);
    expect(calculator.calculate("multiply", 4, 3)).toBe(12);
    expect(calculator.calculate("divide", 10, 2)).toBe(5);
    expect(calculator.calculate("percent", 200, 10)).toBe(20);
  });

  it("throws an error on unsupported operations", () => {
    expect(() => calculator.calculate("modulus", 10, 3)).toThrow("Unsupported operation: modulus");
  });
});
