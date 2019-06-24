const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(bodyParser.json())

let todos = [{id: 0, todo:`Teach Jonah Crud and rest!`, completed:false}];
let id = 1;

app.get('/api/todo', (request,response,next)=>{
    console.log(`sent todos`)
    response.send(todos)
})

app.post('/api/todo', (request,response,next)=>{
    request.body.id = id
    id++;
    request.body.completed = false;
    todos.push(request.body)
    console.log(`added todo`)
    response.send(todos)
})

app.put('/api/todo', (request,response,next)=>{
    todos = todos.map((e)=>{
        if(request.body.id === e.id){
            e.completed = true;
        }
        return e;
    })
    console.log(`completed todo`)
    response.send(todos)
})

app.delete('/api/todo/:id', (request,response,next)=>{

    todos= todos.filter((e)=>{
        return e.id !== Number(request.params.id);
    })
    console.log(`deleted todo`)
    response.send(todos)
})

const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`Running on port ${port}`)
})