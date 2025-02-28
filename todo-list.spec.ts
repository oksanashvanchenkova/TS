import { describe, it, expect, jest } from '@jest/globals';
import { TodoList } from './todo-list';

describe('TodoList', () => {
  let todo: TodoList;

  beforeEach(() => {
    todo = new TodoList();
  });

  it('should add a new note', () => {
    const note = todo.addNote('Test title', 'Test content');
    expect(note).toHaveProperty('id');
    expect(note.title).toBe('Test title');
    expect(note.content).toBe('Test content');
  });

  it('should not add a note with empty title or content', () => {
    expect(() => todo.addNote('', 'Content')).toThrow('Назва та зміст не можуть бути порожніми');
    expect(() => todo.addNote('Title', '')).toThrow('Назва та зміст не можуть бути порожніми');
  });

  it('should remove a note', () => {
    const note = todo.addNote('To be deleted', 'Content');
    expect(todo.removeNote(note.id)).toBe(true);
    expect(todo.getNote(note.id)).toBeUndefined();
  });

  it('should not remove a non-existent note', () => {
    expect(todo.removeNote(999)).toBe(false);
  });

  it('should edit a note', () => {
    const note = todo.addNote('Title', 'Content');
    expect(todo.editNote(note.id, 'New Title', 'New Content')).toBe(true);
    expect(todo.getNote(note.id)?.title).toBe('New Title');
  });

  it('should mark a note as completed', () => {
    const note = todo.addNote('Task', 'Content');
    expect(todo.markAsCompleted(note.id)).toBe(true);
    expect(todo.getNote(note.id)?.completed).toBe(true);
  });

  it('should return correct stats', () => {
    todo.addNote('Task 1', 'Content');
    todo.addNote('Task 2', 'Content');
    todo.markAsCompleted(1);
    const stats = todo.getStats();
    expect(stats.total).toBe(2);
    expect(stats.remaining).toBe(1);
  });
});
