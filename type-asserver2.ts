function fetchData(): unknown {
    return {
      name: "John Doe",
      age: 30,
    };
  }
  
  // 1. Type Assertion
  const person1 = fetchData() as { name: string; age: number };
  console.log(person1.name); // John Doe
  
  // 2. User-Defined Type Guard
  function isPerson(obj: unknown): obj is { name: string; age: number } {
    return typeof obj === "object" && obj !== null && "name" in obj && "age" in obj;
  }
  
  const person2: { name: string; age: number } = fetchData() as { name: string; age: number };
  if (isPerson(person2)) {
    console.log(person2.name);
  }
  
  // 3. Generic Type Assertion
  function printPersonInfo<T extends { name: string; age: number }>(person: T) {
    console.log(`Name: ${person.name}, Age: ${person.age}`);
  }
  
  printPersonInfo(fetchData() as { name: string; age: number });
  
  // 4. Signature Assertion
  function printPersonInfo2(person: { name: string; age: number }) {
    console.log(`Name: ${person.name}, Age: ${person.age}`);
  }
  