require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        
        if (!uri) {
            throw new Error('MONGODB_URI no está definida en las variables de entorno');
        }

        await mongoose.connect(uri, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            }
        });
        
        console.log('MongoDB Atlas conectado exitosamente');
    } catch (error) {
        console.error('Error conectando a MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectDB; 