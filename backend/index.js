require('dotenv').config();  // Load .env variables
const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require('mongoose');

connection();

app.use(express.json());
app.use(cors());

// Root route: added to avoid "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Backend is working!'); // Simple message to confirm backend is running
});

// Health check endpoints
app.get('/healthz', (req, res) => {
    res.status(200).send('Healthy');
});

// Readiness check to see if the server is ready to serve requests
let lastReadyState = null;
app.get('/ready', (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected !== lastReadyState) {
        console.log(`Database readyState: ${mongoose.connection.readyState}`);
        lastReadyState = isDbConnected;
    }

    if (isDbConnected) {
        res.status(200).send('Ready');
    } else {
        res.status(503).send('Not Ready');
    }
});

// Startup check to ensure the server has started correctly
app.get('/started', (req, res) => {
    res.status(200).send('Started');
});

// Routes
app.use("/api/tasks", tasks);

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
