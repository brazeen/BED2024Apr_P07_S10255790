const books = [
    { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
];

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    static async getAllBooks() {
        //actual GET logic from database here
        return books;
    }

    static async getBookById(id) {
        const books = await this.getAllBooks(); //await the get all books
        const book = books.find((book) => book.id === id); //get book that matches ID
        return book;
    }

    static async createBook(newBookData) {
        const books = await this.getAllBooks(); //await the get all books
        const newBook = new Book(
            books.length + 1,
            newBookData.title,
            newBookData.author
        )
        books.push = newBook;
        return newBook;
    }

    static async updateBook(id, newBookData) {
        const books = await this.getAllBooks(); //await the get all books
        const existingBookIndex = books.findIndex((book) => book.id === id);
        if (existingBookIndex === -1) {
            return null;
        }

        const updatedBook = {
            ...books[existingBookIndex], //copy from the book object of the current book
            ...newBookData, //replace the appropriate parts with the new book data
        }

        books[existingBookIndex] = updatedBook;
        return updatedBook;
    }

    static async deleteBook(id) {
        const books = await this.getAllBooks(); //await the get all booksconst books
        const bookIndex  = books.findIndex((book) => book.id === id);
        if (bookIndex === -1) {
            return false;
        }

        books.splice(bookIndex, 1);
        return true;
    }
}

module.exports = Book;