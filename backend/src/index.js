const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json())
const mongoose = require("mongoose");
const Book_router = require("./router/Book");
const MongoURL = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.use("/books", Book_router);
app.use('/book/search',require('./router/Search'))

app.get("/", async (req, res) => {
  return res.send({ message: "hello" });
});

app.listen(PORT || "8080", async () => {
  await mongoose.connect(`${MongoURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
   });
  console.log("listening");
});


