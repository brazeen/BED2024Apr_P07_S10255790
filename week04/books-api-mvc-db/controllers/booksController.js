const Book = require("../models/book")

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks()
        res.json(books)
    }
    catch(error) {
        console.error(error)
        res.status(500).send("Error retrieving books")
    }
}

const getBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
      const book = await Book.getBookById(bookId);
      if (!book) {
        return res.status(404).send("Book not found");
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving book");
    }
  };

const createBook = async (req, res) => {
    const newBook = req.body;
    try {
        const createdBook = await Book.createBook(newBook)
        res.status(201).json(createdBook)
    }
    catch(error) {
        res.status(500).send("Error creating book")
    }
}

const updateBook = async (req, res) => {
    const bookId = req.params.id;
    const newBookData = req.body;
    try {
        const book = await Book.updateBook(bookId, newBookData);
        if (!book) {
          return res.status(404).send("Book not found");
        }
        
    }
    catch(error) {
        console.error(error)
        res.status(500).send("EError updating book")
    }
}

const deleteBook = async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book.deleteBook(bookId);
        if (!book) {
          return res.status(404).send("Book not found");
        }
        res.status(204).send()
    }
    catch(error) {
        console.error(error)
        res.status(500).send("Error updating book")
    }
}



module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}