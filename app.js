const express = require('express');
const app= express();
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./models/user');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// const userModel = require('./usermodel');

// mongoose.connect("mongodb://127.0.0.1:27017",{
//     dbName: 'learn1',
// })
// .then(()=>console.log('database connected successfully'))
// .catch((err)=>console.log(err));

// const messageSchema = mongoose.Schema({
//     name: String,
//     email: String
// });

// const message = mongoose.model("Message", messageSchema);

// app.get('/add', function(req, res){
//     message.create({name: 'shubham', email: 'shubham@gmail.com'})
//     .then(()=>res.send("hiiii"));
// });



app.get('/', function(req, res){
    // res.send('Hello World!');
    res.render('index');
});

app.get('/read', async (req, res)=>{
    let allusers = await userModel.find();
    res.render('read',{users: allusers});
});

app.get('/delete/:id', async (req, res)=>{
    let allusers = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
    // res.render('read',{users: allusers});
});

app.get('/edit/:id', async (req, res)=>{
    let user = await userModel.findOne({_id: req.params.id});
    res.render('edit',{user: user});
});

app.post('/update/:id', async (req, res)=>{

    let {name,email,image}= req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id},{name,email,image},{new: true});
    res.redirect("/read");
});

app.post('/create', async (req, res)=>{
    let {name,email,image}= req.body;
    await userModel.create({name,email,image});
    // res.send(createdUser);
    res.redirect("/read");
});
/*
app.get('/create', async (req, res)=>{
    let createduser = await userModel.create({
        name: 'John Doeeee',
        email: 'johndoeeee@example.com',
        username: 'Johnnnn'
    })
    res.send(createduser);
});

app.get('/update', async (req, res)=>{
    let updateuser = await userModel.findOneAndUpdate({username: "John"},{name: 'Harry Potter'}, {new: true})
    res.send(updateuser);
});

app.get("/read", async (req, res)=>{
   let users =  await userModel.find();
   res.send(users);
})

app.get('/delete', async (req, res)=>{
    let deleteuser = await userModel.findOneAndDelete({username: "John"})
    res.send(deleteuser);
});
*/

app.listen(3000);