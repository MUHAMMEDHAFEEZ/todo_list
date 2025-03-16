import React from 'react';
import axios from 'axios';

function Create(){
    const [task, setTask] = React.useState('')

    const handleAdd = () => {
        axios.post('http://localhost:3001/add', {
            task: task
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
        
        // console.log('Add button clicked')
    }
    return (
        <div>
            <h1>Create a new Todo</h1>
            <form>
                <input type="text" id="" name="" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)}/>
                <button type="button" onClick={handleAdd}>ADD</button>
            </form>
        </div>
    );
};

export default Create;