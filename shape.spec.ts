import { describe, it, expect, jest } from '@jest/globals';

import { Circle, Ellipse, Rectangle, Square, Triangle } from './shape';

describe('Circle', () => {
  it('should calculate area correctly', () => {
    const circle = new Circle('red', 10);
    expect(circle.calculateArea()).toBeCloseTo(314.159, 3);
  });

  it('should calculate perimeter correctly', () => {
    const circle = new Circle('red', 10);
    expect(circle.calculatePerimeter()).toBeCloseTo(62.832, 3);
  });
});

describe('Ellipse', () => {
  it('should calculate area correctly', () => {
    const ellipse = new Ellipse('blue', 10, 5);
    expect(ellipse.calculateArea()).toBeCloseTo(157.08, 2);
  });

  it('should calculate perimeter correctly', () => {
    const ellipse = new Ellipse('blue', 10, 5);
    expect(ellipse.calculatePerimeter()).toBeCloseTo(48.442, 3);
  });
});

describe('Rectangle', () => {
  it('should calculate area correctly', () => {
    const rectangle = new Rectangle('green', 10, 5);
    expect(rectangle.calculateArea()).toBe(50);
  });

  it('should calculate perimeter correctly', () => {
    const rectangle = new Rectangle('green', 10, 5);
    expect(rectangle.calculatePerimeter()).toBe(30);
  });
});

describe('Square', () => {
  it('should calculate area correctly', () => {
    const square = new Square('yellow', 4);
    expect(square.calculateArea()).toBe(16);
  });

  it('should calculate perimeter correctly', () => {
    const square = new Square('yellow', 4);
    expect(square.calculatePerimeter()).toBe(16);
  });
});

describe('Triangle', () => {
  it('should calculate area correctly', () => {
    const triangle = new Triangle('purple', 3, 4, 5);
    expect(triangle.calculateArea()).toBeCloseTo(6, 3);
  });

  it('should calculate perimeter correctly', () => {
    const triangle = new Triangle('purple', 3, 4, 5);
    expect(triangle.calculatePerimeter()).toBe(12);
  });

  it('should determine triangle type', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const equilateral = new Triangle('purple', 5, 5, 5);
    equilateral.printTriangleType();
    expect(consoleSpy).toHaveBeenCalledWith('Equilateral Triangle');
    consoleSpy.mockRestore();
  });
});
