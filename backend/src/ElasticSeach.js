const { Client } = require('elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function indexBookInElasticsearch(book) {
  let id = book._id.toString()
  let obj = {...book._doc,['_id']:id};
  
  console.log(book,"elastic search saving start")
  console.log('object',obj)
  delete obj._id;
  try {
    await client.index({
      index: 'books',
      body: obj,
    });
  } catch (error) {
    console.error('Error indexing book:', error);
  }
}

async function updateBookInElasticsearch(custom_id, updatedFields) {
  try {
    await client.updateByQuery({
      index: 'books',
      body: {
        script: {
          source: `
            if (ctx._source.custom_id == params.custom_id) {
              // Exclude modifying the _id field
              ctx._source.Title = params.updatedFields.Title;
              ctx._source.Author = params.updatedFields.Author;
              ctx._source.Description=params.updatedFields.Description;
              ctx._source.PublicationYear=params.updatedFields.PublicationYear;
              ctx._source.Isbn=params.updatedFields.Isbn;

            }
          `,
          lang: 'painless',
          params: {
            custom_id: custom_id,
            updatedFields: updatedFields,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error updating book by custom_id', error);
  }
}


async function removeBookFromElasticsearch(fieldName,fieldValue) {
  try {
    await client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          match: {
            [fieldName]: fieldValue,
          },
        },
      },
    });
    
    console.log(`Document with ${fieldName} '${fieldValue}' deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting document with ${fieldName} '${fieldValue}':`, error);
    throw error;
  }
}

module.exports = { indexBookInElasticsearch, updateBookInElasticsearch, removeBookFromElasticsearch };
