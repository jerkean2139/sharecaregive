const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Mock locations data
const locations = [
  {
    id: 1,
    city: "Conway",
    state: "Arkansas",
    coordinates: [-92.4426, 35.0887]
  },
  {
    id: 2,
    city: "Amarillo", 
    state: "Texas",
    coordinates: [-101.8313, 35.2220]
  }
];

app.get('/', (req, res) => {
  res.send('Share Care Give API Server');
});

app.get('/api/locations', (req, res) => {
  res.json(locations);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});