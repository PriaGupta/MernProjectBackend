const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
    res.send("Server is running");
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Use Routes
app.use('/api', authRoutes);
app.use('/', productRoutes);
app.use('/', paymentRoutes);

app.listen(PORT, () => console.log("Server is running at port:" + PORT));
