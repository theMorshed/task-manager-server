const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// taskManagerUser  rif2Rnnomgsejq6R

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://taskManagerUser:rif2Rnnomgsejq6R@cluster0.zkjorm4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const taskCollection = client.db('taskManager').collection('tasks');

        // get all active task 
        app.get('/my-task', async (req, res) => {
            const query = {
                status: 'active'
            };
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        });

        // get all task which is already completed
        app.get('/completetask', async (req, res) => {
            const query = {
                status: 'complete'
            };
            const result = await taskCollection.find(query).toArray();
            res.send(result);
        });

        // add a task in database
        app.post('/addtask', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        // update task
        app.put('/updatetask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    status: 'complete'
                }
            }
            const result = await taskCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        // delete task by admin from mongodb
        app.delete('/deletetask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await taskCollection.deleteOne(filter);
            res.send(result);
        });
    }
    finally {

    }
}
run().catch(err => console.error(err));


app.get("/", (req, res) => {
    res.send("Hello from task manager server.");
});

app.listen(port, () => {
    console.log('Task manager server running successfully.');
});