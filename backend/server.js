const express = require('express');
const chats= require('./data');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userroutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware')
const chatRoutes = require('./routes/chatRoutes')

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); //to accept JSON Data

app.use('/api/user', userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`);
})