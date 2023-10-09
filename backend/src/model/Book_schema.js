const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const {
  indexBookInElasticsearch,
  updateBookInElasticsearch,
  removeBookFromElasticsearch,
} = require("../ElasticSeach");

const Book_schema = new Schema({
  Title: {
    type: String,
    required: [true, "Please give Title"]
  },
  Author: { type: String, required: true },
  PublicationYear: { type: Number, required: true },
  custom_id:{type:String,required:true,unique:true},
  Isbn: {
    type: String,
    default: () => {
      const str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let string = "";

      for (let i = 0; i < 10; i++) {
        const indexRandom = crypto.randomInt(0, str.length);
        string += characters.charAt(indexRandom);
      }

      return string;
    },
    unique: true,
  },
  Description: {
    type: String,
    minlength: 10,
    default: "NO Description Available",
  },
});
Book_schema.post("findOneAndUpdate", (doc) => {
  
  console.log('update',doc.custom_id)
  updateBookInElasticsearch(doc.custom_id, doc);
  console.log(doc, "updated in elasticsearch");
});

Book_schema.post("save", (doc) => {
    console.log('create',doc)
  indexBookInElasticsearch(doc);
  console.log(doc, "added in elasticsearch");
});

// Book_schema.pre("deleteOne", (doc,next) => {
//   console.log(doc,'here form schema delete');
//   removeBookFromElasticsearch(a);
// console.log(doc,this, "removed from elasticsearch");
// next();
  
// });
module.exports = model("book", Book_schema);
