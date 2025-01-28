type DeepMutable<T> = {
    -readonly [P in keyof T]: T[P] extends object
      ? DeepMutable<T[P]>
      : T[P];
  };

  type PickByValueType<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
  };

  type OmitByValueType<T, ValueType> = {
    [K in keyof T as T[K] extends ValueType ? never : K]: T[K];
  };

  type CustomReturnType<T> = T extends (...args: any[]) => infer R ? R : never;


  type ExtendedCustomReturnType<T> = T extends (...args: infer P) => infer R ? [R, P] : never;
  interface User {
    readonly name: string;
    readonly age: number;
    address?: {
      city: string;
      street: string;
    };
  }
  
  type MutableUser = DeepMutable<User>; 
  
  type UsersByName = PickByValueType<User, string>; 
  type UsersByAge = PickByValueType<User, number>;

  type UsersWithoutAge = OmitByValueType<User, number>; 
  type UsersWithoutName = OmitByValueType<User, string>; 
  
  type GetNameReturnType = CustomReturnType<() => string>;
  type GetAgeReturnType = CustomReturnType<() => number>;
  
  type AddNumbersReturnType = ExtendedCustomReturnType<(a: number, b: string) => undefined>;