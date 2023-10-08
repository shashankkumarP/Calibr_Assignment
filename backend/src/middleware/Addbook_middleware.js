async function validateBookData(req, res, next) {
    const { Title, Author, PublicationYear, Isbn, Description } = req.body;
  
  
    if (typeof Title !== 'string' || Title.length < 5) {
      return res.status(400).json({ message: 'Invalid Title' });
    }
  
    if (typeof Author !== 'string') {
      return res.status(400).json({ message: 'Invalid Author' });
    }
  
    if (typeof PublicationYear !== 'number') {
      return res.status(400).json({ message: 'Invalid Publication Year' });
    }
    if (!Description) {
        req.body.Description = 'No description available';
      }
    if (Isbn.length<10) {
        delete req.body[Isbn];
    }


  
    next();
  }

  module.exports = validateBookData