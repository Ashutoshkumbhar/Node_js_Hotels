// console.log("Hello world")

// const { json } = require("express");
// const _ = require("lodash");
// function add(a,b){
//     return a+b;
// }

// var add = function(a,b){
//     return a+b;
// }

//arrow
// var add = (a,b) =>{
//     return a+b;
// }

// var add = (a,b) => a+b;

// let result = add(4,5)
// console.log("a + b is:",result);

// (function(){
//     console.log(add)
//     console.log("Hi Ashutosh");
// })();

//Arrow fn
// function callback(){
//     console.log("Ashutosh");
// }
// const add = function(a,b,callback){
//     var result = a+b;
//     console.log("result is :"+result);//main fn complete 
//     callback();//at last call callback
// }
// add(3,4,callback);//also pass call back

//****after this core models of js**** 
//file system fs and OS

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile("greeting.txt","Hi"+user.username+"!\n",()=>{
//     console.log("File created successfully");
// });

//import file
// const notes = require("./notes.js");
// var age = notes.age;
// console.log(age);//undefined to print age export from original file module.export{age}

// var result = notes.addnumber(2,3);

// console.log(result);

// const jsonstring = '{"name" : "Ashu" , "age" : 20,"city": "Pune"}';
// const jsonobj = JSON.parse(jsonstring);
// console.log(jsonobj);  

// console.log(typeof(jsonobj));  

// const objtostring = {
//     name:"Ashu",
//     age : 20
// }
// const stringfromobj = JSON.stringify(objtostring);
// console.log(typeof(stringfromobj));

//after endpoint apis and creating server
const express = require("express");
const app = express();//app is like blueprint instance for server creation
const db = require("./db");//add always to start

const bodyparser = require("body-parser");
app.use(bodyparser.json());//stores in req.body



//methods to share data get, post, patch, delete
//get used for getting info only

//req:request res:respond
app.get('/', (req, res) => {
  res.send('Hello Users Welcome to our Hotel')
})
//we need to send list of items to server.
// app.get('/paneer',(req,res)=>{
//     var paneer = {
//         name : "paneer",
//         type : "paneer_tikka",
//         is_spicy :true
//     }
//     res.send(paneer);
// })



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});

// app.listen(3000,()=>{
//     console.log("paneer served");
// })


//express router for good organization of endpoints
//routes for update --put method /patch


//import Router person and worktype from routes
const personRoutes = require('./routes/personroutes');
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuroutes');
app.use('/menu',menuItemRoutes);

