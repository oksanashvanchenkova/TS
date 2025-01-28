function fetchData(): unknown {
  return { name: "John Doe", age: 30 };
}

type Person = {
  name: string;
  age: number;
};

function isPerson(data: unknown): data is Person {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "age" in data &&
    typeof (data as any).name === "string" &&
    typeof (data as any).age === "number"
  );
}

function printPersonInfo(person: Person): void {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
}

const data = fetchData();

if (isPerson(data)) {
  const person: Person = data;
  printPersonInfo(person);
} else {
  console.error("Invalid data format");
}
