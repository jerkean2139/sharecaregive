const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Mock data for communities
const communities = {
  'conway-ar': {
    id: 'conway-ar',
    name: 'Conway, Arkansas',
    state: 'Arkansas',
    latitude: 35.0887,
    longitude: -92.4421,
    description: 'Conway is a thriving community in central Arkansas with a strong commitment to supporting local non-profits.',
    totalRaised: 185000,
    monthlyAverage: 12500,
    nonprofits: [
      {
        id: 'np-conway-1',
        name: 'Conway Animal Welfare Unit',
        category: 'Animal Welfare',
        description: 'Dedicated to rescuing and rehoming abandoned pets in Faulkner County',
        monthlyFunding: 2400,
        totalRaised: 28800,
        impactMetrics: {
          'Animals Rescued': '450+',
          'Adoptions Completed': '380+',
          'Volunteers': '125'
        }
      },
      {
        id: 'np-conway-2',
        name: 'Faulkner County Food Pantry',
        category: 'Food Security',
        description: 'Providing nutritious meals to families facing food insecurity',
        monthlyFunding: 3200,
        totalRaised: 41600,
        impactMetrics: {
          'Families Served Monthly': '800+',
          'Meals Provided': '24,000+',
          'Food Distributed': '50,000 lbs'
        }
      },
      {
        id: 'np-conway-3',
        name: 'Conway Youth Development Center',
        category: 'Youth Services',
        description: 'After-school programs and mentorship for at-risk youth',
        monthlyFunding: 2800,
        totalRaised: 33600,
        impactMetrics: {
          'Students Enrolled': '250+',
          'Tutoring Hours': '5,000+',
          'College Readiness': '95%'
        }
      },
      {
        id: 'np-conway-4',
        name: 'Central Arkansas Veterans Support',
        category: 'Veterans Services',
        description: 'Supporting veterans with housing, job placement, and mental health services',
        monthlyFunding: 2100,
        totalRaised: 25200,
        impactMetrics: {
          'Veterans Served': '180+',
          'Job Placements': '65+',
          'Housing Secured': '42'
        }
      }
    ],
    businesses: [
      {
        id: 'biz-conway-1',
        name: 'Mike\'s Place Restaurant',
        type: 'Restaurant',
        address: '201 Donaghey Ave, Conway, AR',
        yearJoined: '2023',
        monthlyContribution: 450,
        supportedNonprofit: 'Faulkner County Food Pantry'
      },
      {
        id: 'biz-conway-2',
        name: 'Conway Regional Medical Center Cafeteria',
        type: 'Healthcare',
        address: '2302 College Ave, Conway, AR',
        yearJoined: '2023',
        monthlyContribution: 680,
        supportedNonprofit: 'Central Arkansas Veterans Support'
      },
      {
        id: 'biz-conway-3',
        name: 'Natural State Coffee Co.',
        type: 'Coffee Shop',
        address: '315 Oak St, Conway, AR',
        yearJoined: '2024',
        monthlyContribution: 320,
        supportedNonprofit: 'Conway Youth Development Center'
      },
      {
        id: 'biz-conway-4',
        name: 'Conway Athletic Club',
        type: 'Fitness Center',
        address: '705 Club Ln, Conway, AR',
        yearJoined: '2024',
        monthlyContribution: 520,
        supportedNonprofit: 'Conway Animal Welfare Unit'
      }
    ]
  },
  'amarillo-tx': {
    id: 'amarillo-tx',
    name: 'Amarillo, Texas',
    state: 'Texas',
    latitude: 35.2220,
    longitude: -101.8313,
    description: 'Amarillo is a vibrant Texas panhandle city where businesses and non-profits work together to strengthen the community.',
    totalRaised: 225000,
    monthlyAverage: 15000,
    nonprofits: [
      {
        id: 'np-amarillo-1',
        name: 'High Plains Food Bank',
        category: 'Food Security',
        description: 'Fighting hunger across the Texas Panhandle with dignity and compassion',
        monthlyFunding: 4200,
        totalRaised: 50400,
        impactMetrics: {
          'People Served Monthly': '1,200+',
          'Counties Covered': '29',
          'Partner Agencies': '200+'
        }
      },
      {
        id: 'np-amarillo-2',
        name: 'Amarillo Children\'s Home',
        category: 'Child Welfare',
        description: 'Providing safe homes and bright futures for children in need',
        monthlyFunding: 3500,
        totalRaised: 42000,
        impactMetrics: {
          'Children in Care': '85+',
          'Foster Families': '45+',
          'Graduation Rate': '98%'
        }
      },
      {
        id: 'np-amarillo-3',
        name: 'Panhandle Community Services',
        category: 'Community Development',
        description: 'Empowering families to achieve self-sufficiency through education and support',
        monthlyFunding: 3800,
        totalRaised: 45600,
        impactMetrics: {
          'Families Assisted': '2,500+',
          'Job Training Programs': '12',
          'Housing Units': '150+'
        }
      },
      {
        id: 'np-amarillo-4',
        name: 'Amarillo SPCA',
        category: 'Animal Welfare',
        description: 'Protecting and advocating for animals throughout the Texas Panhandle',
        monthlyFunding: 2700,
        totalRaised: 32400,
        impactMetrics: {
          'Animals Rescued': '800+',
          'Spay/Neuter Surgeries': '2,000+',
          'Education Programs': '50+'
        }
      }
    ],
    businesses: [
      {
        id: 'biz-amarillo-1',
        name: 'The Big Texan Steak Ranch',
        type: 'Restaurant',
        address: '7701 Interstate 40 Access Rd, Amarillo, TX',
        yearJoined: '2023',
        monthlyContribution: 780,
        supportedNonprofit: 'High Plains Food Bank'
      },
      {
        id: 'biz-amarillo-2',
        name: 'Amarillo National Bank',
        type: 'Financial Services',
        address: '410 S Taylor St, Amarillo, TX',
        yearJoined: '2023',
        monthlyContribution: 950,
        supportedNonprofit: 'Panhandle Community Services'
      },
      {
        id: 'biz-amarillo-3',
        name: 'Yellow City Street Food',
        type: 'Food Truck Park',
        address: '2106 S Grand St, Amarillo, TX',
        yearJoined: '2024',
        monthlyContribution: 420,
        supportedNonprofit: 'Amarillo Children\'s Home'
      },
      {
        id: 'biz-amarillo-4',
        name: 'Cowboy Gelato',
        type: 'Dessert Shop',
        address: '2805 SW 6th Ave, Amarillo, TX',
        yearJoined: '2024',
        monthlyContribution: 280,
        supportedNonprofit: 'Amarillo SPCA'
      }
    ]
  }
};

// Simplified locations for map display
const locations = [
  {
    id: 'conway-ar',
    city: 'Conway',
    state: 'Arkansas',
    latitude: 35.0887,
    longitude: -92.4421
  },
  {
    id: 'amarillo-tx',
    city: 'Amarillo',
    state: 'Texas',
    latitude: 35.2220,
    longitude: -101.8313
  }
];

app.get('/', (req, res) => {
  res.send('Share Care Give API Server');
});

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

// Get all locations for map
app.get('/api/locations', (req, res) => {
  res.json(locations);
});

// Get all communities with details
app.get('/api/communities', (req, res) => {
  res.json(Object.values(communities));
});

// Get specific community details
app.get('/api/communities/:id', (req, res) => {
  const community = communities[req.params.id];
  if (community) {
    res.json(community);
  } else {
    res.status(404).json({ error: 'Community not found' });
  }
});

// Get all non-profits
app.get('/api/nonprofits', (req, res) => {
  const allNonprofits = [];
  Object.values(communities).forEach(community => {
    community.nonprofits.forEach(nonprofit => {
      allNonprofits.push({
        ...nonprofit,
        community: community.name,
        communityId: community.id
      });
    });
  });
  res.json(allNonprofits);
});

// Get all businesses
app.get('/api/businesses', (req, res) => {
  const allBusinesses = [];
  Object.values(communities).forEach(community => {
    community.businesses.forEach(business => {
      allBusinesses.push({
        ...business,
        community: community.name,
        communityId: community.id
      });
    });
  });
  res.json(allBusinesses);
});

// Admin endpoints for dashboard stats
app.get('/api/admin/stats', (req, res) => {
  const stats = {
    totalCommunities: Object.keys(communities).length,
    totalNonprofits: Object.values(communities).reduce((sum, c) => sum + c.nonprofits.length, 0),
    totalBusinesses: Object.values(communities).reduce((sum, c) => sum + c.businesses.length, 0),
    totalRaised: Object.values(communities).reduce((sum, c) => sum + c.totalRaised, 0),
    monthlyAverage: Object.values(communities).reduce((sum, c) => sum + c.monthlyAverage, 0),
    topCommunity: 'Amarillo, Texas',
    topNonprofit: 'High Plains Food Bank',
    recentActivity: [
      { type: 'donation', amount: 450, business: 'Mike\'s Place Restaurant', nonprofit: 'Faulkner County Food Pantry', time: '2 hours ago' },
      { type: 'new_business', name: 'Natural State Coffee Co.', community: 'Conway, AR', time: '1 day ago' },
      { type: 'milestone', nonprofit: 'High Plains Food Bank', achievement: 'Reached $50,000 in total funding', time: '3 days ago' }
    ]
  };
  res.json(stats);
});

// Update non-profit (for admin)
app.put('/api/nonprofits/:id', (req, res) => {
  // In a real app, this would update the database
  res.json({ success: true, message: 'Non-profit updated successfully' });
});

// Update business (for admin)
app.put('/api/businesses/:id', (req, res) => {
  // In a real app, this would update the database
  res.json({ success: true, message: 'Business updated successfully' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});