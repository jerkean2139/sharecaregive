
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const LOCATIONS_FILE = path.join(DATA_DIR, 'locations.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Initialize data files
async function initializeData() {
  await ensureDataDir();
  
  // Initialize locations file
  try {
    await fs.access(LOCATIONS_FILE);
  } catch {
    const initialLocations = [
      {
        id: '1',
        state: 'Arkansas',
        city: 'Conway',
        latitude: 35.0887,
        longitude: -92.4421,
        nonprofits: [],
        businessCount: 35,
        totalFunding: 12452,
        goalFunding: 1000000,
        lastUpdated: new Date().toISOString(),
        isActive: true
      },
      {
        id: '2',
        state: 'Texas',
        city: 'Amarillo',
        latitude: 35.2220,
        longitude: -101.8313,
        nonprofits: [],
        businessCount: 22,
        totalFunding: 15670,
        goalFunding: 1000000,
        lastUpdated: new Date().toISOString(),
        isActive: true
      }
    ];
    await fs.writeFile(LOCATIONS_FILE, JSON.stringify(initialLocations, null, 2));
  }
  
  // Initialize admins file
  try {
    await fs.access(ADMINS_FILE);
  } catch {
    // Create default admin user (username: admin, password: admin123)
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const initialAdmins = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@sharecaregivefoundation.org',
        password: hashedPassword,
        role: 'dev-admin',
        createdAt: new Date().toISOString(),
        isActive: true
      }
    ];
    await fs.writeFile(ADMINS_FILE, JSON.stringify(initialAdmins, null, 2));
  }
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Middleware to check admin role
function requireAdminRole(req, res, next) {
  if (req.user.role !== 'dev-admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Helper functions
async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

async function writeJSONFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Auth routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admins = await readJSONFile(ADMINS_FILE);
    const admin = admins.find(a => a.username === username && a.isActive);
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username, 
        email: admin.email,
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Public API routes (for frontend)
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await readJSONFile(LOCATIONS_FILE);
    const activeLocations = locations.filter(loc => loc.isActive);
    res.json(activeLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

app.get('/api/locations/:id', async (req, res) => {
  try {
    const locations = await readJSONFile(LOCATIONS_FILE);
    const location = locations.find(loc => loc.id === req.params.id && loc.isActive);
    
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    res.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

// Admin API routes
app.get('/api/admin/locations', authenticateToken, requireAdminRole, async (req, res) => {
  try {
    const locations = await readJSONFile(LOCATIONS_FILE);
    res.json(locations);
  } catch (error) {
    console.error('Error fetching admin locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

app.post('/api/admin/locations', authenticateToken, requireAdminRole, async (req, res) => {
  try {
    const { city, state, latitude, longitude, goalFunding = 1000000 } = req.body;
    
    if (!city || !state || !latitude || !longitude) {
      return res.status(400).json({ error: 'City, state, latitude, and longitude are required' });
    }
    
    const locations = await readJSONFile(LOCATIONS_FILE);
    
    // Check if location already exists
    const existingLocation = locations.find(
      loc => loc.city.toLowerCase() === city.toLowerCase() && 
             loc.state.toLowerCase() === state.toLowerCase()
    );
    
    if (existingLocation) {
      return res.status(409).json({ error: 'Location already exists' });
    }
    
    const newLocation = {
      id: String(Date.now()),
      city,
      state,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      nonprofits: [],
      businessCount: 0,
      totalFunding: 0,
      goalFunding: parseInt(goalFunding),
      lastUpdated: new Date().toISOString(),
      isActive: true
    };
    
    locations.push(newLocation);
    await writeJSONFile(LOCATIONS_FILE, locations);
    
    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Failed to create location' });
  }
});

app.put('/api/admin/locations/:id', authenticateToken, requireAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const locations = await readJSONFile(LOCATIONS_FILE);
    const locationIndex = locations.findIndex(loc => loc.id === id);
    
    if (locationIndex === -1) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    locations[locationIndex] = {
      ...locations[locationIndex],
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    
    await writeJSONFile(LOCATIONS_FILE, locations);
    
    res.json(locations[locationIndex]);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

app.delete('/api/admin/locations/:id', authenticateToken, requireAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    
    const locations = await readJSONFile(LOCATIONS_FILE);
    const locationIndex = locations.findIndex(loc => loc.id === id);
    
    if (locationIndex === -1) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    // Soft delete - set isActive to false
    locations[locationIndex].isActive = false;
    locations[locationIndex].lastUpdated = new Date().toISOString();
    
    await writeJSONFile(LOCATIONS_FILE, locations);
    
    res.json({ message: 'Location deactivated successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Initialize and start server
async function startServer() {
  await initializeData();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log('Default admin credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
  });
}

startServer();
