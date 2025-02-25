// // Task 1

// type Result<T> = { status: "success"; data: T } | { status: "error"; error: string };

// function handleResult<T>(result: Result<T>): T {
//   if (result.status === "success") {
//     return result.data;
//   } else {
//     throw new Error(result.error);
//   }
// }

// const successResult: Result<number> = { status: "success", data: 42 };
// const errorResult: Result<number> = { status: "error", error: "Something went wrong" };

// handleResult(successResult);
// handleResult(errorResult);

//  // Task 2
//  class Queue<T> {
//     private items: T[] = [];
  
//     enqueue(item: T): void {
//       this.items.push(item);
//     }
  
//     dequeue(): T | undefined {
//       return this.items.shift();
//     }
  
//     peek(): T | undefined {
//       return this.items[0];
//     }
  
//     size(): number {
//       return this.items.length;
//     }
//   }
  
//   const queue = new Queue<number>();
//   queue.enqueue(10);
//   queue.enqueue(20);
//   console.log(queue.peek()); // 10
//   console.log(queue.dequeue()); // 10
//   console.log(queue.size()); // 1


//   // Task 3

//   function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
//     return [...arr].sort(compareFn); 
//   }
  
//   const numbers = [5, 3, 8, 1];
//   const sortedNumbers = sortArray(numbers, (a, b) => a - b);
//   console.log(sortedNumbers); // [1, 3, 5, 8]


//   // Task 4
//   function extractProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
//   }
  
//   const user = { id: 1, name: "John Doe" };
//   const userId = extractProperty(user, "id"); // 1
//   const userName = extractProperty(user, "name"); // "John Doe"


//   // Task 5
//   interface Identifiable {
//     id: string;
//   }
  
//   class Repository<T extends Identifiable> {
//     private items: T[] = [];
  
//     add(item: T): void {
//       if (this.items.some(i => i.id === item.id)) {
//         throw new Error("Item with the same id already exists");
//       }
//       this.items.push(item);
//     }
  
//     getById(id: string): T | undefined {
//       return this.items.find(item => item.id === id);
//     }
  
//     removeById(id: string): boolean {
//       const index = this.items.findIndex(item => item.id === id);
//       if (index !== -1) {
//         this.items.splice(index, 1);
//         return true;
//       }
//       return false;
//     }
  
//     getAll(): T[] {
//       return [...this.items];
//     }
//   }
  
//   interface User extends Identifiable {
//     name: string;
//   }
  
//   interface Product extends Identifiable {
//     title: string;
//     price: number;
//   }
  
//   const userRepository = new Repository<User>();
//   userRepository.add({ id: "1", name: "John Doe" });
//   console.log(userRepository.getById("1")); // { id: "1", name: "John Doe" }
//   console.log(userRepository.removeById("1")); // true
//   console.log(userRepository.getAll()); // []
  
//   const productRepository = new Repository<Product>();
//   productRepository.add({ id: "101", title: "Laptop", price: 1500 });
//   console.log(productRepository.getById("101")); // { id: "101", title: "Laptop", price: 1500 }
  