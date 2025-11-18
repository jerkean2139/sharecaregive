import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from './storage';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../dist')));

// Communities endpoints
app.get('/api/communities', async (req, res) => {
  try {
    const communities = await storage.getCommunities();
    const formattedCommunities = await Promise.all(communities.map(async (community) => {
      const nonprofits = await storage.getNonprofits(community.id);
      const businesses = await storage.getBusinesses(community.id);
      
      return {
        id: community.id,
        name: community.name,
        city: community.city,
        state: community.state,
        latitude: parseFloat(community.latitude),
        longitude: parseFloat(community.longitude),
        description: community.description,
        totalRaised: parseFloat(community.totalRaised || '0'),
        goalAmount: parseFloat(community.goalAmount || '500000'),
        nonprofits: nonprofits.map(np => ({
          id: np.id,
          name: np.name,
          category: np.category,
          description: np.description,
          monthlyFunding: parseFloat(np.monthlyFunding || '0'),
          totalRaised: parseFloat(np.totalRaised || '0'),
          impactStatement: np.impactStatement
        })),
        businesses: businesses.map(biz => ({
          id: biz.id,
          name: biz.name,
          type: biz.type,
          address: biz.address,
          monthlyContribution: parseFloat(biz.monthlyContribution || '0'),
          totalContributed: parseFloat(biz.totalContributed || '0'),
          yearJoined: biz.yearJoined
        }))
      };
    }));
    
    res.json(formattedCommunities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ error: 'Failed to fetch communities' });
  }
});

app.get('/api/communities/:id', async (req, res) => {
  try {
    const communityId = parseInt(req.params.id);
    const community = await storage.getCommunity(communityId);
    
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    
    const nonprofits = await storage.getNonprofits(communityId);
    const businesses = await storage.getBusinesses(communityId);
    
    const formattedCommunity = {
      id: community.id,
      name: community.name,
      city: community.city,
      state: community.state,
      latitude: parseFloat(community.latitude),
      longitude: parseFloat(community.longitude),
      description: community.description,
      totalRaised: parseFloat(community.totalRaised || '0'),
      monthlyAverage: parseFloat(community.totalRaised || '0') / 12,
      nonprofits: nonprofits.map(np => ({
        id: np.id,
        name: np.name,
        category: np.category,
        description: np.description,
        monthlyFunding: parseFloat(np.monthlyFunding || '0'),
        totalRaised: parseFloat(np.totalRaised || '0'),
        impactStatement: np.impactStatement,
        impactMetrics: {
          'Monthly Funding': `$${parseFloat(np.monthlyFunding || '0').toLocaleString()}`,
          'Total Raised': `$${parseFloat(np.totalRaised || '0').toLocaleString()}`
        }
      })),
      businesses: businesses.map(biz => ({
        id: biz.id,
        name: biz.name,
        type: biz.type,
        address: biz.address,
        yearJoined: biz.yearJoined?.toString() || 'N/A',
        monthlyContribution: parseFloat(biz.monthlyContribution || '0'),
        supportedNonprofit: nonprofits.find(np => np.id === biz.nonprofitId)?.name || 'Various'
      }))
    };
    
    res.json(formattedCommunity);
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ error: 'Failed to fetch community' });
  }
});

// Non-profits endpoints
app.get('/api/nonprofits', async (req, res) => {
  try {
    const nonprofits = await storage.getNonprofits();
    const communities = await storage.getCommunities();
    
    const formattedNonprofits = nonprofits.map(np => {
      const community = communities.find(c => c.id === np.communityId);
      return {
        id: np.id,
        name: np.name,
        category: np.category,
        description: np.description,
        monthlyFunding: parseFloat(np.monthlyFunding || '0'),
        totalRaised: parseFloat(np.totalRaised || '0'),
        community: community?.name || 'Unknown'
      };
    });
    
    res.json(formattedNonprofits);
  } catch (error) {
    console.error('Error fetching non-profits:', error);
    res.status(500).json({ error: 'Failed to fetch non-profits' });
  }
});

// Businesses endpoints
app.get('/api/businesses', async (req, res) => {
  try {
    const businesses = await storage.getBusinesses();
    const communities = await storage.getCommunities();
    const nonprofits = await storage.getNonprofits();
    
    const formattedBusinesses = businesses.map(biz => {
      const community = communities.find(c => c.id === biz.communityId);
      const nonprofit = nonprofits.find(np => np.id === biz.nonprofitId);
      return {
        id: biz.id,
        name: biz.name,
        type: biz.type,
        address: biz.address,
        monthlyContribution: parseFloat(biz.monthlyContribution || '0'),
        totalContributed: parseFloat(biz.totalContributed || '0'),
        yearJoined: biz.yearJoined,
        community: community?.name || 'Unknown',
        supportedNonprofit: nonprofit?.name || 'Various'
      };
    });
    
    res.json(formattedBusinesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Failed to fetch businesses' });
  }
});

// Admin endpoints
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await storage.getAdminUser(username);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    
    if (user.passwordHash !== passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    await storage.updateAdminUserLastLogin(user.id);
    
    // Generate a simple token (in production, use JWT)
    const token = crypto.randomBytes(32).toString('hex');
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    const stats = await storage.getAdminStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on port ${port}`);
});