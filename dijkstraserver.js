// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dijkstra = require('./dijkstra'); // Import your Dijkstra function

const app = express();
const PORT = 5000;

const cors = require('cors');

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Endpoint for Dijkstra's algorithm
app.post('/api/dijkstra', (req, res) => {
    try {
        const { graph, start } = req.body;
        if (!graph || !start) {
            return res.status(400).json({ message: 'Graph and start node are required.' });
        }
        const result = dijkstra(graph, start);
        res.json({ result });
    } catch (error) {
        console.error("Error in Dijkstra's algorithm:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
