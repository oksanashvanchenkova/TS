import { describe, it, expect, jest } from '@jest/globals';


import { DeprecatedMethod, MinLength, MaxLength, Email } from './decorators5ts';

describe('DeprecatedMethod', () => {
  it('should log a warning when the method is called', () => {
    console.warn = jest.fn();
    
    class TestClass {
      @DeprecatedMethod('Use another method', 'newMethod')
      oldMethod() {
        return 'old';
      }
    }
    
    const instance = new TestClass();
    instance.oldMethod();
    
    expect(console.warn).toHaveBeenCalledWith("Method 'oldMethod' is deprecated. Use another method");
    expect(console.warn).toHaveBeenCalledWith("Use 'newMethod' instead.");
  });
});

// Тесты для MinLength
describe('MinLength', () => {
  it('should throw an error if the string is too short', () => {
    expect(() => {
      class TestClass {
        @MinLength(5)
        shortString = 'abc';
      }
      new TestClass();
    }).toThrow('shortString must be at least 5 characters long.');
  });
  
  it('should allow a valid string', () => {
    class TestClass {
      @MinLength(5)
      validString = 'valid';
    }
    expect(() => new TestClass()).not.toThrow();
  });
});

// Тесты для MaxLength
describe('MaxLength', () => {
  it('should throw an error if the string is too long', () => {
    expect(() => {
      class TestClass {
        @MaxLength(5)
        longString = 'abcdef';
      }
      new TestClass();
    }).toThrow('longString must be at most 5 characters long.');
  });
  
  it('should allow a valid string', () => {
    class TestClass {
      @MaxLength(5)
      validString = 'valid';
    }
    expect(() => new TestClass()).not.toThrow();
  });
});

// Тесты для Email
describe('Email', () => {
  it('should throw an error if the email is invalid', () => {
    expect(() => {
      class TestClass {
        @Email
        invalidEmail = 'not-an-email';
      }
      new TestClass();
    }).toThrow('invalidEmail must be a valid email address.');
  });
  
  it('should allow a valid email', () => {
    class TestClass {
      @Email
      validEmail = 'test@example.com';
    }
    expect(() => new TestClass()).not.toThrow();
  });
});

// Тесты для класса User
describe('User class', () => {
  it('should create a valid user', () => {
    expect(() => new User('validUser', 'user@example.com')).not.toThrow();
  });
  
  it('should throw an error for an invalid username', () => {
    expect(() => new User('usr', 'user@example.com')).toThrow('username must be at least 5 characters long.');
  });
  
  it('should throw an error for an invalid email', () => {
    expect(() => new User('validUser', 'invalid-email')).toThrow('email must be a valid email address.');
  });
});
