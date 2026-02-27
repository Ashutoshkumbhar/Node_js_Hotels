//imp file *****
//Database connection


//npm install mongoose
const mongoose = require("mongoose");
//connection step by step

//define  mongodb connection url  :'mongodb://localhost:27017/mydatabase'
const mongoURL = 'mongodb://localhost:27017/hotels'

//set up mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/node_tutorial")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error", err));


//get default connection mongoose maintains default connection represent mongodb connection
const db = mongoose.connection;

//define event listeners for connect not connect
db.on('connected',()=>{
    console.log("Connected to mongodb server");
});
db.on('error',()=>{
    console.log("mongodb Connection error");
});
db.on('disconnected',()=>{
    console.log("disConnected from mongodb server");
});

//export database connection 
module.exports = db;

//then what are models:blueprint structure like mysql and schemas: blueprint to define structure and data types
