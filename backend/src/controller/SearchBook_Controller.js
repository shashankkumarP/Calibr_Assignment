const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

const SearchBook_Controller= {
    getBook:async (req, res) => {
        try {
          const { query } = req.query;
          const result = await client.search({
            index: 'books',
            body: {
              query: {
                multi_match: {
                  query,
                  fields: ['title', 'author', 'description'], 
                  fuzziness: 'AUTO', 
                },
              },
            },
          });
      
          const books = result.body.hits.hits.map(hit => hit._source);
          res.status(200).send(books);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}
module.exports= SearchBook_Controller;