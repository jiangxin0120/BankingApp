const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connection URI could be from a cloud provider or localhost
    const conn = await mongoose.connect(process.env.MONGO_URI, {

          });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
