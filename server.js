const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const empoyeeRoutes = require('./routes/employeeRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');
dotenv.config();
mongoose.connect(process.env.MONGO_DB_URI)
.then(() =>{
    console.log("connected to mongoDB sucessfully");
})
.catch((err) => {
    console.log("connection failed",err);
})
 const app = express();
 const PORT = process.env.PORT || 5000;
 app.use(bodyParser.json());
 app.use(cors());

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
const {MongoClient} = require('mongodb');

MongoClient.connect(process.env.MONGO_DB_URI)
  .then(() => {
console.log("connected to mongoDb rams" );
})
.catch((err) => {
    console.log("error connecting to mongoDb", err);
});
const port = 5000;
// console.log(process.env);
app.use('/employees',empoyeeRoutes); 
app.use('/signups', signupRoutes);
app.use('/api', loginRoutes);

app.listen(port,() =>{
    console.log('server started at port '+ port);
})const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const empoyeeRoutes = require('./routes/employeeRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
dotenv.config();
mongoose.connect(process.env.MONGO_DB_URI)
.then(() =>{
    console.log("connected to mongoDB sucessfully");
})
.catch((err) => {
    console.log("connection failed",err);
})
 const app = express();
 const PORT = process.env.PORT || 5000;
 app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
const {MongoClient} = require('mongodb');

MongoClient.connect(process.env.MONGO_DB_URI)
  .then(() => {
console.log("connected to mongoDb rams" );
})
.catch((err) => {
    console.log("error connecting to mongoDb", err);
});
const port = 5000;
// console.log(process.env);
app.use('/employees',empoyeeRoutes); 
app.use('/signups', signupRoutes);
app.use('/api', loginRoutes);

app.listen(port,() =>{
    console.log('server started at port '+ port);
})