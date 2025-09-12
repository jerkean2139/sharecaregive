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

// Sample locations data for Arkansas and Texas
// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Check credentials (default: admin / admin123)
  if (username === 'admin' && password === 'admin123') {
    // Generate a simple token (in production, use JWT or proper auth)
    const token = 'admin_token_' + Date.now();
    res.json({
      success: true,
      token: token,
      user: {
        username: 'admin',
        role: 'administrator'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid username or password'
    });
  }
});

app.get('/api/locations', (req, res) => {
  const locations = [
    {
      id: 'ark-1',
      title: 'Little Rock Food Bank',
      address: '4301 W 65th St, Little Rock, AR 72209',
      phone: '(501) 565-8121',
      url: 'https://www.arkansasfoodbank.org',
      tags: ['nonprofit', 'food'],
      lat: 34.6857,
      lng: -92.3426,
      img: '/activmap.2.1.2/images/thumb.png',
      icon: '/activmap.2.1.2/images/icons/marker-heart.png'
    },
    {
      id: 'ark-2',
      title: 'Arkansas Community Foundation',
      address: '1400 W Markham St, Little Rock, AR 72201',
      phone: '(501) 372-1116',
      url: 'https://www.arcf.org',
      tags: ['nonprofit', 'community'],
      lat: 34.7465,
      lng: -92.2896,
      img: '/activmap.2.1.2/images/thumb.png',
      icon: '/activmap.2.1.2/images/icons/marker-star.png'
    },
    {
      id: 'tx-1',
      title: 'Houston Food Bank',
      address: '535 Portwall St, Houston, TX 77029',
      phone: '(713) 223-3700',
      url: 'https://www.houstonfoodbank.org',
      tags: ['nonprofit', 'food'],
      lat: 29.7372,
      lng: -95.3103,
      img: '/activmap.2.1.2/images/thumb.png',
      icon: '/activmap.2.1.2/images/icons/marker-heart.png'
    },
    {
      id: 'tx-2',
      title: 'Communities Foundation of Texas',
      address: '5500 Caruth Haven Ln, Dallas, TX 75225',
      phone: '(214) 750-4222',
      url: 'https://www.cftexas.org',
      tags: ['nonprofit', 'community'],
      lat: 32.8205,
      lng: -96.7836,
      img: '/activmap.2.1.2/images/thumb.png',
      icon: '/activmap.2.1.2/images/icons/marker-star.png'
    }
  ];

  res.json(locations);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});