function fetchData(): unknown {
    return { name: "John Doe", age: 30 };
  }
  
  type Person = {
    name: string;
    age: number;
  };
  
  const data = fetchData(); 
  
  if (typeof data === "object" && data !== null && "name" in data && "age" in data) {
    const person: Person = data as Person;
  
    function printPersonInfo(person: Person): void {
      console.log(`Name: ${person.name}, Age: ${person.age}`);
    }
  
    printPersonInfo(person);
  } else {
    console.error("Invalid data format");
  }