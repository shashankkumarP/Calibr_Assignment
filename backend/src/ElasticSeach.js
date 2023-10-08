const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function indexBookInElasticsearch(book) {
  try {
    await client.index({
      index: 'books',
      body: book,
    });
  } catch (error) {
    console.error('Error indexing book:', error);
  }
}

async function updateBookInElasticsearch(bookId, book) {
  try {
    await client.update({
      index: 'books',
      id: bookId,
      body: { doc: book },
    });
  } catch (error) {
    console.error('Error updating book index:', error);
  }
}

async function removeBookFromElasticsearch(bookId) {
  try {
    await client.delete({
      index: 'books',
      id: bookId,
    });
  } catch (error) {
    console.error('Error removing book index:', error);
  }
}

module.exports = { indexBookInElasticsearch, updateBookInElasticsearch, removeBookFromElasticsearch };
