const express = require('express');
const cors = require('cors');
const apiRouter = require('./api');

const app = express();
const port = 3001;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Use the API router for all API endpoints
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});