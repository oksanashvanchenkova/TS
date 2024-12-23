interface ICalculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
  percent(value: number, percentage: number): number;
}

class Calculator implements ICalculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return a / b;
  }

  percent(value: number, percentage: number): number {
    return (value * percentage) / 100;
  }

  calculate(operation: string, ...args: number[]): number {
    switch (operation) {
      case "add":
        return this.add(args[0], args[1]);
      case "subtract":
        return this.subtract(args[0], args[1]);
      case "multiply":
        return this.multiply(args[0], args[1]);
      case "divide":
        return this.divide(args[0], args[1]);
      case "percent":
        return this.percent(args[0], args[1]);
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  }
}
