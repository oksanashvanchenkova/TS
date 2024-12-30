abstract class Shape {
  public readonly name: string;
  public readonly color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;

  public printInfo(): void {
    console.log(`Shape: ${this.name}, Color: ${this.color}`);
  }
}

class EllipticalShape extends Shape {
  protected readonly majorAxis: number;
  protected readonly minorAxis: number;

  constructor(name: string, color: string, majorAxis: number, minorAxis: number) {
    super(name, color);
    this.majorAxis = majorAxis;
    this.minorAxis = minorAxis;
  }

  public calculateArea(): number {
    return Math.PI * this.majorAxis * this.minorAxis;
  }

  public calculatePerimeter(): number {
    const a = this.majorAxis;
    const b = this.minorAxis;
    return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  }

  public printDiameter(): void {
    console.log(`Major Diameter: ${this.majorAxis * 2}, Minor Diameter: ${this.minorAxis * 2}`);
  }
}

class Circle extends EllipticalShape {
    private readonly radius: number;

    constructor(color: string, radius: number) {
      super("Circle", color, radius, radius);
      this.radius = radius;
    }
  
    public calculateArea(): number {
      return Math.PI * this.radius ** 2;
    }
  
    public calculatePerimeter(): number {
      return 2 * Math.PI * this.radius;
    }
}

class Ellipse extends EllipticalShape {
    constructor(color: string, majorAxis: number, minorAxis: number) {
      super("Ellipse", color, majorAxis, minorAxis);
    }
  
    public calculateArea(): number {
      return Math.PI * this.majorAxis * this.minorAxis;
    }
  
    public calculatePerimeter(): number {
      const a = this.majorAxis;
      const b = this.minorAxis;
      return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
    }
  }


abstract class Polygon extends Shape {
  protected readonly sides: number[];
  constructor(name: string, color: string, sides: number[]) {
    super(name, color);
    this.sides = sides;
  }

  public getNumberOfSides(): number {
    return this.sides.length;
  }

  public calculatePerimeter(): number {
    return this.sides.reduce((sum, side) => sum + side, 0);
  }

  public abstract printAreaFormula(): void;
}

class Rectangle extends Polygon {
    private readonly width: number;
    private readonly height: number;
  
    constructor(color: string, width: number, height: number) {
      super("Rectangle", color, [width, height, width, height]);
      this.width = width;
      this.height = height;
    }
  
    public calculateArea(): number {
      return this.width * this.height;
    }
  
    public printAreaFormula(): void {
      console.log("Area formula: width * height");
    }
  }

  class Square extends Rectangle {
    constructor(color: string, side: number) {
      super(color, side, side); 
    }
  }
  
  

  class Triangle extends Polygon {
    constructor(color: string, side1: number, side2: number, side3: number) {
      super("Triangle", color, [side1, side2, side3]);
    }
  
    public calculateArea(): number {
      const s = this.calculatePerimeter() / 2;
      const [a, b, c] = this.sides;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
  
    public printAreaFormula(): void {
      console.log("Area formula: sqrt(s * (s-a) * (s-b) * (s-c))");
    }
  
    public printTriangleType(): void {
      const [a, b, c] = this.sides;
      if (a === b && b === c) {
        console.log("Equilateral Triangle");
      } else if (a === b || b === c || a === c) {
        console.log("Isosceles Triangle");
      } else {
        console.log("Scalene Triangle");
      }
    }
  
    public calcHeight(baseIndex: number): number {
      const area = this.calculateArea();
      const base = this.sides[baseIndex];
      return (2 * area) / base;
    }
  }

