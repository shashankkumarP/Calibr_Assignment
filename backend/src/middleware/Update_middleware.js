function validateUpdate(req, res, next) {
    const { updatedKey, updatedValue } = req.body;
  
  
    const validFields = ['Title', 'Description', 'PublicationYear']; 
  
    if (!validFields.includes(updatedKey)) {
      return res.status(400).send({ message: 'Invalid field provided' });
    }
  
    
    next();
  }

  module.exports = validateUpdate

