const express = require("express");
const sql = require("mssql");
const booksController = require("./controllers/booksController")
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser")
const validateBook = require("./middlewares/validateBook")

const app = express()
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public"); // Path to the public folder
// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling
app.use(staticMiddleware)   

app.get("/books", booksController.getAllBooks)
app.get("/books/:id", booksController.getBookById)
app.post("/books", validateBook, booksController.createBook)
app.put("/books/:id", validateBook, booksController.updateBook)
app.delete("/books/:id", booksController.deleteBook)


app.listen(port, async() => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection success")
    }
    catch (err) {
        console.error("Database connection error", err)
        //terminate process
        process.exit(1);
    }

    console.log(`Server listening on port ${port}`)
})

process.on("SIGINT", async() => {
    console.log("Server shutting down gracefully")
    //clean up tasks
    await sql.close()
    console.log("Database connection closed")
    process.exit(0) //code 0 is successful shutdown
})
