const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('✗ Error: MONGODB_URI is not defined in environment variables');
      console.error('  Please create a .env file in the backend directory with MONGODB_URI');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('✗ Database connection error:', error.message);
    console.error('  Please check your MONGODB_URI in .env file');
    console.error('  Make sure MongoDB is running or MongoDB Atlas connection string is correct');
    process.exit(1);
  }
};

module.exports = connectDB;
