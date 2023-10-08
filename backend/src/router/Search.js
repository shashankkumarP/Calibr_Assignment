const express = require('express');
const router = express.Router();
const SearchBook_Controller = require('../controller/SearchBook_Controller');

router.get('/', SearchBook_Controller.getBook);

module.exports = router;
