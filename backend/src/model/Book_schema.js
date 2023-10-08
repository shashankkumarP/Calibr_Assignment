const {Schema,model} = require('mongoose');
const crypto = require('crypto');

 
const Book_schema = new Schema({
    Title:{type:String,required:[true,"Please give Title"],minlength:[5,"length of title should be minimun 5"]},
    Author:{type:String,required:true},
    PublicationYear:{type:Number,required:true},
    Isbn:{type:String,default:()=>{ 
       
        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let string = '';

        for (let i = 0; i < 10; i++) {
            const indexRandom = crypto.randomInt(0, str.length);
            string += characters.charAt(indexRandom);
        }

        return string;
    },unique:true},
    Description:{type:String,minlength:10,default:"NO Description Available"}

})
Book_schema.post('init',)
Book_schema.post('save');
Book_schema.post('deleteOne', function(doc) {
    console.log('%s has been deleted', doc._id);
  });
module.exports= model("book",Book_schema)