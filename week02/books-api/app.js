const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//book data database simulation
let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
 ];

 //parse incoming json data in requests
 app.use(express.json());
 //configure bodyparser to allow urlencoded data
 app.use(express.urlencoded({ extended: true })); //extended true for nested objects

 //get all the books
 app.get('/books', (req, res) => {
    res.json(books);
 })

 //post book
 app.post('/books', (req, res) => {
    const newBook = req.body; //get new book data from request body
    newBook.id = books.length + 1; //unique id
    books.push(newBook);
    res.status(201).json(newBook); //send created book with 201 status code
 })

 //get a singular book
 app.get('/books/:id', (req, res) => {
    const foundid = Number(req.params.id); //parse the ID u want to find
    const foundbook = books.filter((book) => book.id === foundid); //filter to find the ID in books array
    
    //if foundbook is not null
    if (foundbook) {
        res.json(foundbook); //load the book into the website page
    }
    else {
        res.status(404).send('Book not found'); //send error code and message if not found
    }
})

//update a book
app.put('/books/:id', (req, res) => {
    const foundid = Number(req.params.id); //parse the ID u want to find
    const updatedbook = req.body;
    const foundbookid = books.findIndex((book) => book.id === foundid); //filter to find the ID in books array

    //if book is found, change its body
    if (foundbookid !== -1) {
        updatedbook.id = foundid; //updated book has the id of the book it wants to change
        books[foundbookid] = updatedbook; //replace the book in the books array
    }
    else {
        res.status(404).send('Book not found'); //send error code and message if not found
    }
})

//delete a book
app.delete('/books/:id', (req, res) => {
    const foundid = Number(req.params.id); //parse the ID u want to find
    const foundbookid = books.findIndex((book) => book.id === foundid); //filter to find the ID in books array

    //if book found, delete from books array
    if (foundbookid !== -1) {
        books.splice(foundbookid, 1); //delete foundbookid index item, deletecount of 1 (only that item)
        res.status(204).send(); //send 204 status (no content)
    }
    else {
        res.status(404).send('Book not found'); //send error code and message if not found
    }
})

//start a localhost server
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
