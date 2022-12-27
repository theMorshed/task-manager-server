const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello from task manager server.");
});

app.listen(port, () => {
    console.log('Task manager server running successfully.');
});