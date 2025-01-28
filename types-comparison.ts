//Task 1 SortArray mathod
function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
function sortArray<T, K extends keyof T>(arr: T[], key: K): T[];
function sortArray<T, K extends keyof T>(arr: T[], keyOrCompareFn: ((a: T, b: T) => number) | K): T[] {
  if (typeof keyOrCompareFn === "function") {
    return [...arr].sort(keyOrCompareFn);
  } else {
    return [...arr].sort((a, b) => {
      const key = keyOrCompareFn as K;
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    });
  }
}

const numbers = [5, 2, 9];
console.log(sortArray(numbers, (a, b) => a - b));
const objects = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
console.log(sortArray(objects, "name"));

//Task 2  DeepReadonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Example = {
  name: string;
  details: {
    age: number;
    location: string;
  };
};

let obj: DeepReadonly<Example> = {
  name: "John",
  details: {
    age: 30,
    location: "New York",
  },
};

//Task 3 DeepRequireReadonly
type DeepRequireReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepRequireReadonly<T[P]> : T[P];
};

type ExampleRequire = {
  name?: string;
  details?: {
    age: number;
    location?: string;
  };
};

let objRequire: DeepRequireReadonly<ExampleRequire> = {
  name: "John",
  details: {
    age: 30,
    location: "New York",
  },
};

//Task4 PartialByKeys
type PartialByKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type ExamplePartial = {
  name: string;
  age: number;
  location: string;
};

type PartialAge = PartialByKeys<ExamplePartial, "age">;

let objPartial: PartialAge = {
  name: "John",
  location: "New York",
};

//Task 5  ReadonlyByKeys
type ReadonlyByKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

type ExampleReadonly = {
  name: string;
  age: number;
  location: string;
};

type ReadonlyName = ReadonlyByKeys<ExampleReadonly, "name">;

let objReadonly: ReadonlyName = {
  name: "John",
  age: 30,
  location: "New York",
};

// Task6: MutableByKeys
type MutableByKeys<T, K extends keyof T> = Omit<T, K> & {
  -readonly [P in K]: T[P];
};

type ExampleMutable = {
  readonly name: string;
  readonly age: number;
  location: string;
};

type MutableAge = MutableByKeys<ExampleMutable, "age">;

const objMutable: MutableAge = {
  name: "John",
  age: 30,
  location: "New York",
};
//   Taks7 UpperCaseKeys

type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

type ExampleUpper = {
  name: string;
  age: number;
};

type UpperCaseExample = UpperCaseKeys<ExampleUpper>;

//  Task 8 ObjectToPropertyDescriptor

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: {
    configurable: boolean;
    enumerable: boolean;
    writable?: boolean;
    value?: T[K];
    get?: () => T[K];
    set?: (value: T[K]) => void;
  };
};

type ExampleDescriptor = {
  name: string;
  age: number;
};

type DescriptorExample = ObjectToPropertyDescriptor<ExampleDescriptor>;
