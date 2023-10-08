const Book_model  = require("../model/Book_schema");
 const {indexBookInElasticsearch,updateBookInElasticsearch,removeBookFromElasticsearch} = require('../ElasticSeach')


const BookController = {
   
    getbooks:async(req,res)=>{
       

       try{
           const book = await Book_model.find();
           if(!book){return res.status(400).send({"message":"liabrary is Empty"})}
           return res.status(200).send({"message":book})

       }
       catch(e){
           console.log(e);
           return res.status(500).send({"message":e.message})
       }
       
      
   },
   addbooks:async(req,res)=>{
      
       try{
           let newBook=new Book_model(req.body);
           await newBook.save();
           await indexBookInElasticsearch(newBook);
           return res.status(201).send({'message':'Book Added Successfully'});

       }catch(e){

           return res.status(500).send({"error":e.message});
       }
   },
   getbook:async(req,res)=>{
    let id = req.params.id

    try{
        const book = await Book_model.findOne({_id:id});
        if(!book){return res.status(400).send({"message":"Something Went Wrong"})}
        return res.status(200).send({"message":book})

    }catch(e){
        console.log("Error", e)
        return res.status(500).send({"message":e.message})

    }
   },
   updatebook: async (req, res) => {
    let id = req.params.id
    let { updatedKey ,updatedValue} = req.body;
    try{
        let result =  await Book_model.findByIdAndUpdate({ _id : id },{ $set:{[updatedKey]:updatedValue}});
        if (!result ) {
            throw Error('No record found');
        }
        await updateBookInElasticsearch(req.params.id, result);
        return res.status(200).send({"message":"Modification done successfully"})


    }catch(e){
        console.log("Error", e)
        return res.status(500).send({"message":e.message})

    }
   },
   deletebook:async (req, res) => {
    let id = req.params.id;
    try{
        let result =  await Book_model.deleteOne({ _id : id });
        await removeBookFromElasticsearch(req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No record found' });
          }
        
          return res.status(200).send({ message: 'Modification done successfully' });


    }catch(e){
        console.log("Error", e)
        return res.status(500).send({"message":e.message})

    }
   }
}

module.exports = BookController;