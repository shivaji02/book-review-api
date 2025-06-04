require('dotenv').config();
const express = require('express');
const ConnectDB = require('./src/config/index');
const cors = require('cors');

const bookRoutes = require('./src/routes/bookRoutes');
const userRoutes = require('./src/routes/userRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const app = express();



const PORT = process.env.PORT || 3000;
ConnectDB();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('api/users',userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT,()=>{
    console.log(`>>>>>Server is running on port ${PORT}`);
})

