const express = require('express');
const { storage } = require('./storage');
const crypto = require('crypto');

const router = express.Router();

// Communities endpoints
router.get('/communities', async (req, res) => {
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

router.get('/communities/:id', async (req, res) => {
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
router.get('/nonprofits', async (req, res) => {
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
router.get('/businesses', async (req, res) => {
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
router.post('/admin/login', async (req, res) => {
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

router.get('/admin/stats', async (req, res) => {
  try {
    const stats = await storage.getAdminStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;