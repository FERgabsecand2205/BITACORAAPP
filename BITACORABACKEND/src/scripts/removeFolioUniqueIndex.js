const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    await mongoose.connection.collection('bitacoras').dropIndex('folio_1');
    console.log('Índice único en folio eliminado');
    process.exit(0);
  } catch (err) {
    console.error('Error eliminando el índice:', err);
    process.exit(1);
  }
}

run(); 