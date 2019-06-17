const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(bodyParser.json())

let todos = [{id: 0, todo:`Teach Jonah Crud and rest!`, completed:false}];
let id = 1;

app.get('/api/todo', (req,res,next)=>{
    console.log(`sent todos`)
    res.send(todos)
})
app.post('/api/todo', (req,res,next)=>{
    req.body.id = id
    id++;
    req.body.completed = false;
    todos.push(req.body)
    console.log(`added todo`)
    res.send(todos)
})
app.put('/api/todo', (req,res,next)=>{
    todos = todos.map((e)=>{
        if(req.body.id === e.id){
            e.completed = true;
        }
        return e;
    })
    console.log(`completed todo`)
    res.send(todos)
})
app.delete('/api/todo/:id', (req,res,next)=>{

    todos= todos.filter((e)=>{
        return e.id !== Number(req.params.id);
    })
    console.log(`deleted todo`)
    res.send(todos)
})

const port = process.env.PORT || 8050
app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})