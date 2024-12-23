interface Author {
  id: string;
  name: string;
  surname: string;
  birthYear: number;
  birthCountry: string;
}

interface Book {
  id: string;
  title: string;
  genre: string;
  year: number;
  authorId: string;
}

interface IBookService {
  getBooks(): Book[];
  getBookById(bookId: string): Book | null;
  getAuthors(): Author[];
  getAuthorById(authorId: string): Author | null;
  getBooksByAuthor(authorIdentifier: string): Book[];
  getAuthorByBookId(bookId: string): Author | null;
  search(query: string): (Book | Author)[];
}

class BookService implements IBookService {
  private books: Book[] = [
    {
      id: "b1",
      title: "The Alchemist",
      genre: "Fantasy",
      year: 1988,
      authorId: "a1",
    },
    {
      id: "b2",
      title: "The Second World War",
      genre: "Historical",
      year: 1948,
      authorId: "a2",
    },
    {
      id: "b3",
      title: "The Three-Body Problem",
      genre: "Science Fiction",
      year: 2008,
      authorId: "a3",
    },
  ];

  private authors: Author[] = [
    { id: "a1", name: "Paulo", surname: "Coelho", birthYear: 1947, birthCountry: "Brazil" },
    { id: "a2", name: "Winston", surname: "Churchill", birthYear: 1874, birthCountry: "United Kingdom" },
    { id: "a3", name: "Liu", surname: "Cixin", birthYear: 1963, birthCountry: "China" },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(bookId: string): Book | null {
    return this.books.find(book => book.id === bookId) || null;
  }

  getAuthors(): Author[] {
    return this.authors;
  }

  getAuthorById(authorId: string): Author | null {
    return this.authors.find(author => author.id === authorId) || null;
  }

  getBooksByAuthor(authorIdentifier: string): Book[] {
    const author = this.authors.find(
      a =>
        a.id === authorIdentifier ||
        a.name.toLowerCase() === authorIdentifier.toLowerCase() ||
        a.surname.toLowerCase() === authorIdentifier.toLowerCase()
    );
    return author ? this.books.filter(book => book.authorId === author.id) : [];
  }

  getAuthorByBookId(bookId: string): Author | null {
    const book = this.getBookById(bookId);
    return book ? this.getAuthorById(book.authorId) : null;
  }

  search(query: string): (Book | Author)[] {
    const lowerCaseQuery = query.toLowerCase();
    const bookResults = this.books.filter(
      book =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.genre.toLowerCase().includes(lowerCaseQuery) ||
        book.year.toString() === query
    );
    const authorResults = this.authors.filter(
      author =>
        author.name.toLowerCase().includes(lowerCaseQuery) || author.surname.toLowerCase().includes(lowerCaseQuery)
    );
    return [...bookResults, ...authorResults];
  }
}
