type NoteType = 'default' | 'protected';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  type: NoteType;
}

class TodoList {
  private notes: Note[] = [];
  private nextId: number = 1;

  addNote(title: string, content: string, type: NoteType = 'default'): Note {
    if (!title.trim() || !content.trim()) {
      throw new Error('Назва та зміст не можуть бути порожніми');
    }

    const newNote: Note = {
      id: this.nextId++,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
      type
    };

    this.notes.push(newNote);
    return newNote;
  }

  removeNote(id: number): boolean {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex === -1) return false;

    const note = this.notes[noteIndex];

    if (note.type === 'protected') {
      const confirmDelete = confirm(`Ви впевнені, що хочете видалити "${note.title}"?`);
      if (!confirmDelete) return false;
    }

    this.notes.splice(noteIndex, 1);
    return true;
  }

  editNote(id: number, title: string, content: string): boolean {
    const note = this.notes.find(note => note.id === id);
    if (!note) return false;

    if (note.type === 'protected') {
      const confirmEdit = confirm(`Ви впевнені, що хочете змінити "${note.title}"?`);
      if (!confirmEdit) return false;
    }

    note.title = title;
    note.content = content;
    note.updatedAt = new Date();
    return true;
  }

  markAsCompleted(id: number): boolean {
    const note = this.notes.find(note => note.id === id);
    if (!note) return false;

    note.completed = true;
    return true;
  }

  getNote(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  getAllNotes(): Note[] {
    return [...this.notes];
  }

  getStats(): { total: number; remaining: number } {
    const total = this.notes.length;
    const remaining = this.notes.filter(note => !note.completed).length;
    return { total, remaining };
  }

  searchNotes(query: string): Note[] {
    return this.notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
  }

  sortNotes(by: 'status' | 'date'): Note[] {
    return [...this.notes].sort((a, b) => {
      if (by === 'status') return Number(a.completed) - Number(b.completed);
      if (by === 'date') return a.createdAt.getTime() - b.createdAt.getTime();
      return 0;
    });
  }
}

const todo = new TodoList();
todo.addNote('Купити хліб', 'Не забути купити батон', 'default');
todo.addNote('Зробити ДЗ', 'Виконати задачу з TypeScript', 'protected');

console.log(todo.getAllNotes());
console.log(todo.getStats());

