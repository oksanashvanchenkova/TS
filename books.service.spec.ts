import { BookService } from "./books.interface";

describe("BookService", () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService();
  });

  it("getBooks() should return all books", () => {
    const books = service.getBooks();
    expect(books.length).toBe(3);
  });

  it("getBookById() should return the correct book", () => {
    const book = service.getBookById("b1");
    expect(book).not.toBeNull();
    expect(book?.title).toBe("The Alchemist");
  });

  it("getBookById() should return null for invalid ID", () => {
    const book = service.getBookById("invalid");
    expect(book).toBeNull();
  });

  it("getAuthors() should return all authors", () => {
    const authors = service.getAuthors();
    expect(authors.length).toBe(3);
  });

  it("getAuthorById() should return the correct author", () => {
    const author = service.getAuthorById("a1");
    expect(author).not.toBeNull();
    expect(author?.name).toBe("Paulo");
  });

  it("getAuthorById() should return null for invalid ID", () => {
    const author = service.getAuthorById("invalid");
    expect(author).toBeNull();
  });

  it("getBooksByAuthor() should return books for a given author ID", () => {
    const books = service.getBooksByAuthor("a1");
    expect(books.length).toBe(1);
    expect(books[0].title).toBe("The Alchemist");
  });

  it("getBooksByAuthor() should return books for an author name", () => {
    const books = service.getBooksByAuthor("Winston");
    expect(books.length).toBe(1);
    expect(books[0].title).toBe("The Second World War");
  });

  it("getBooksByAuthor() should return an empty array for an unknown author", () => {
    const books = service.getBooksByAuthor("Unknown");
    expect(books.length).toBe(0);
  });

  it("getAuthorByBookId() should return the correct author", () => {
    const author = service.getAuthorByBookId("b2");
    expect(author).not.toBeNull();
    expect(author?.surname).toBe("Churchill");
  });

  it("getAuthorByBookId() should return null for an unknown book ID", () => {
    const author = service.getAuthorByBookId("unknown");
    expect(author).toBeNull();
  });

  it("search() should return books and authors matching the query", () => {
    const results = service.search("The");
    expect(results.length).toBeGreaterThan(0);
  });

  it("search() should return an empty array for no matches", () => {
    const results = service.search("Nonexistent");
    expect(results.length).toBe(0);
  });
});
