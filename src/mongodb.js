const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'avance-dev01';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  db.collection('users').insertOne({
    Name:'Mani',
    Email: 'manikanchan@gmail.com',
    Text: 'Sameple text!!'
  })

  client.close();
  return 'done.';
}

main()