const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
 const expressValidator = require('express-validator')

 //Import Routes
 const authRoutes = require('./routes/auth');


//Config App
require('dotenv').config();
const app = express();

//Db mongoDB
mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('db connected'))
.catch(() => console.log('not nonnect to the database !'))

//Middlewares
app.use(express.json())
app.use(cors())
 app.use(expressValidator())
//  app.use(cookieParser())


//Routes Middleware

app.use('/api', authRoutes);



const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`app is running on port ${port}`));