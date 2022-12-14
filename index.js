const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
var session = require('express-session');
const cookieParser = require('cookie-parser');
const multer=require('multer');
var fileExtension=require('file-extension');
// var MongoStore = require('connect-mongo')(session);

const mongoose= require('./db');
const Recipe= require('./recipe')
const Register=require('./models/register')
// const routes=require('./routes')
const userroutes=require('./routes/userroutes')
const adminroutes=require('./routes/adminroutes')


app.use(session({ secret: 'key', cookie: {maxAge:120000}}))
app.use(express.json());
app.use(cors({orgin:'http://localhost:4200/'}))


app.use('/userside',userroutes);
app.use('/adminside', adminroutes);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server starts at http://localhost:${port}`);
});
