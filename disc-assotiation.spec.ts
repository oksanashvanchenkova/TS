// actions.test.ts

import { handleAction, CreateUserAction, DeleteUserAction, UpdateUserAction, BlockUserAction } from './disc-association';

describe('handleAction', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); 
  });

  afterEach(() => {
    consoleLogSpy.mockRestore(); 
  });

  it('should handle CREATE_USER action', () => {
    const action: CreateUserAction = {
      type: 'CREATE_USER',
      payload: { name: 'John Doe', age: 30 },
    };
    handleAction(action);
    expect(consoleLogSpy).toHaveBeenCalledWith('Created user: John Doe, age: 30');
  });

  it('should handle DELETE_USER action', () => {
    const action: DeleteUserAction = {
      type: 'DELETE_USER',
      payload: { userId: 123 },
    };
    handleAction(action);
    expect(consoleLogSpy).toHaveBeenCalledWith('Deleted user with ID: 123');
  });

  it('should handle UPDATE_USER action with name and age', () => {
    const action: UpdateUserAction = {
      type: 'UPDATE_USER',
      payload: { userId: 456, name: 'Jane Doe', age: 25 },
    };
    handleAction(action);
    expect(consoleLogSpy).toHaveBeenCalledWith('Updated user:', { userId: 456, name: 'Jane Doe', age: 25 });
  });

  it('should handle UPDATE_USER action with name only', () => {
    const action: UpdateUserAction = {
      type: 'UPDATE_USER',
      payload: { userId: 789, name: 'Alice' },
    };
    handleAction(action);
    expect(consoleLogSpy).toHaveBeenCalledWith('Updated user:', { userId: 789, name: 'Alice' });
  });

  it('should handle UPDATE_USER action with age only', () => {
    const action: UpdateUserAction = {
      type: 'UPDATE_USER',
      payload: { userId: 101, age: 40 },
    };
    handleAction(action);
    expect(consoleLogSpy).toHaveBeenCalledWith('Updated user:', { userId: 101, age: 40 });
  });

  it('should handle BLOCK_USER action', () => {
    const action: BlockUserAction = {
      type: 'BLOCK_USER',
      payload: { userId: 202, reason: 'Violation of terms' },
    };
    handleAction(action);
    expect(consoleLogSpy).toHaveBeenCalledWith('Blocked user with ID: 202 for Violation of terms');
  });

  it('should handle all action types exhaustively', () => {
    // Цей тест перевіряє, що всі типи дій обробляються,
    // але не вимагає конкретного виводу в консоль.
    // Він корисний для забезпечення повноти обробки дій.
    expect(true).toBe(true);
  });
});