const express = require('express');
const router = express.Router();
const { Client } = require('@elastic/elasticsearch');
const SearchBook_Controller = require('../controller/SearchBook_Controller');
const client = new Client({ node: 'http://localhost:9200' });

router.get('/', SearchBook_Controller.getBook);

module.exports = router;
