const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const SearchBook_Controller = {
  getBook: async (req, res) => {
    console.log(req.query);
    try {
      const { query } = req.query;

      const result = await client.search({
        index: "books",
        from:0,
        size:20,
        body: {
          query: {
            multi_match: {
              query: `*${query}*`,
              fields: ["Title", "Author", "Description"],
              fuzziness: "AUTO",
            },
            
          },
        }, 
      });
       console.log(result);
       if (result.body.hits && result.body.hits.hits.length > 0) {
        const books = result.body.hits.hits.map((hit) => hit._source);
        return res.status(200).json(books); // Simplify response
      } else {
        // No matching documents found
        return res.status(200).json([]); // Return an empty array
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
module.exports = SearchBook_Controller;
