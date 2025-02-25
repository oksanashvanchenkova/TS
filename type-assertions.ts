// function fetchData(): unknown {
//   return { name: "John Doe", age: 30 };
// }

// type Person = {
//   name: string;
//   age: number;
// };


// function isPerson(data: unknown): data is Person {
//   return (
//     typeof data === "object" &&
//     data !== null &&
//     "name" in data &&
//     "age" in data &&
//     typeof (data as any).name === "string" &&
//     typeof (data as any).age === "number"
//   );
// }

// // Метод printPersonInfo із Signature Assertion
// function printPersonInfo(person: Person): void {
//   console.log(`Name: ${person.name}, Age: ${person.age}`);
// }

// // Виклик fetchData та затвердження типу
// const data = fetchData();

// if (isPerson(data)) {
//   const person: Person = data; // Тип тепер уточнений до Person
//   printPersonInfo(person); // Передаємо перевірений об'єкт у printPersonInfo
// } else {
//   console.error("Invalid data format"); // Виведення помилки, якщо об'єкт не відповідає типу Person
// }
