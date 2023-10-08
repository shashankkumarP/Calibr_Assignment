function validateUpdate(req, res, next) {
    const { Title,Author,PublicationYear,Isbn,Description } = req.body;

    if(!Title || !Author || !PublicationYear || !Isbn || !Description){
      return res.status(400).json({"message":"Provide all document"})
    }
  
    if(req.param.id){
      return res.status(400).send({ message: 'provide  id' });
    }
   
  
    
    next();
  }

  module.exports = validateUpdate

