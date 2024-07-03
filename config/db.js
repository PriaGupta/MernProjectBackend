const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
