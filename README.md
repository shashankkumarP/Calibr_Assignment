# Book Management Application

This is a full-stack book management application built using Node.js, MongoDB, Elasticsearch, and Next.js. The application allows users to manage and search a collection of books. This README provides an overview of the project and instructions for setting it up and running it.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Elasticsearch Setup](#elasticsearch-setup)
- [Running the Application](#running-the-application)

## Features

- Create, read, update, and delete (CRUD) operations for books.
- Elasticsearch integration for efficient book searching.
- User-friendly web interface for managing and searching books.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed.
- Mongoose installed and running in your local.
- Elasticsearch cluster set up (docker Image).
  
## API


  ### For CRUD Operation : http://localhost:8080/books
  
   #### Fetching all books: request-> get, api: http://localhost:8080/books
   #### Fetching a book: request-> get, api: http://localhost:8080/books/:id
   #### Fetching updating: request-> put, api: http://localhost:8080/books/:id
   #### Fetching delete: request-> delete, api: http://localhost:8080/books/:id

  ### For ElasticSearch : http://localhost:9200

  ### For Searching of ElasticSearch : http://localhost:8080/books/search?q=`${query}`
  
      - const { Client } = require("@elasticsearch/elasticsearch");
      - const client = new Client({ node: "http://localhost:9200" });
   
   #### FrontEnd: api: http://localhost:3000

   
 ## ElasticSearch Feature: 

   - On creation of a book it is also created on elasticsearch.
   - On updation of a book it will  be updated on elasticsearch.
   - On Deletion of a book it will be also deleted from elasticsearch

## FrontEnd Feature:

   ### Add Book 

  
  - When you Click on Add Book A modal will be open where you have fill data, Some of fields are mandatory to fill.
    
     

     
  ### Search Book

  - On Clicking it will redirect you to /pages/search route
  - Here in input box you can search for a query
  -  debouncing is applied and delay is of 2sec/2000ms  
  -  Home button is there to redirect you to home page

  ### Edit Book

  - On Clicking of it a modal will open where you can Edit the text.

 ### Delete Book

 - On Clicking of it, that book will be deleted.


## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:shashankkumarP/Calibr_Assignment.git
   



## 🔗  Deployments


- [Github-Repo](https://github.com/shashankkumarP/Calibr_Assignment)

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- I take all the responsibility for every single line of code.
- Connect with me on Mail Id: madhav131ex@gmail.com
[Connect-Me-On-LinkedIn](https://www.linkedin.com/in/shashank-kumar-83008122b/)
