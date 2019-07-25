const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {List,Task} = require('./db/models/models')
const {mongoose} = require('./db/mongoose')


app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  


app.get('/lists',(req,res)=>{
    List.find({
        _userId:req.user_id
    })
    .then((list)=>{
        res.send(list)
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.post('/lists',(req,res)=>{
    let title = req.body.title

    let newList = new List({
        title,
        _userId: req.user_id
    })
    newList.save().then((listDoc)=>{
        res.send(listDoc)
    })
})

app.patch('/lists/:id',(req,res)=>{
    List.findOneAndUpdate(
        {_id:req.params.id, _userId:req.user_id},
        {$set:req.body}
        )
        .then(()=>{
            res.send({'message':'updated successfully'})
        })
})

app.delete('/lists/:id',(req,res)=>{
    List.findOneAndRemove({
        _id:req.params.id,
        _userId: req.user_id
    })
    .then((removedListDoc)=>{
        res.send(removedListDoc)

        // deleteTakssFromList(removedListDoc._id)
    })
})

app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({
        _listId: req.params.listId
    })
    .then((tasks)=>{
        res.send(tasks)
    })
})

app.post('/lists/:listId/tasks',(req,res)=>{
    List.findOne({
        _id:req.params.listId,
        _userId:req.user_id
    })
    .then((list)=>{
        if(list){
            return true
        }
        else{
            return false
        }
    })
    .then((canCreateTask)=>{
        if(canCreateTask){
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            })
            newTask.save().then((newTaskDoc)=>{
                res.send(newTaskDoc)
            })
        }
            else{
                res.sendStatus(404)
            }
        
    })
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
  
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
         
            return true;
        }

 
        return false;
    }).then((canUpdateTasks) => {
        if (canUpdateTasks) {
           
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

app.delete('/lists/:listId/tasks/:taskId',(req, res) => {

    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
           
            return true;
        }

        return false;
    }).then((canDeleteTasks) => {
        
        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
});


app.listen(3000,()=>{
    console.log("Server has started on port 3000")
})