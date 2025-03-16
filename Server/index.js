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

app.delete('/delete/:id', async (req, res) => {
    try {
        const result = await TodoModel.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully', deletedTodo: result });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

