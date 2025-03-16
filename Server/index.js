const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/todos');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

    app.get('/', (req, res) => {
        TodoModel.find().then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
    });

app.post('/add', (req, res) => {
    const task = req.body.task;
    // console.log(task);
    TodoModel.create(
        {
            task: task
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

