const express = require("express");
const Book_router = express.Router();
const  BookController  = require("../controller/Book_Controller");
const validateBookData = require("../middleware/Addbook_middleware");
const validateUpdate = require("../middleware/Update_middleware");



Book_router.get("/",BookController.getbooks); 
Book_router.post('/',validateBookData,BookController.addbooks);
Book_router.put('/:id',validateUpdate,BookController.updatebook);
Book_router.delete('/:id',BookController.deletebook);


 




module.exports = Book_router