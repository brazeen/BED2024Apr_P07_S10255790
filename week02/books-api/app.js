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
    
 })