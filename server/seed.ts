import { db } from './db';
import { communities, nonprofits, businesses, adminUsers, adminStats } from '../shared/schema';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';

dotenv.config();

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data (in development only!)
    console.log('Clearing existing data...');
    await db.delete(businesses);
    await db.delete(nonprofits);
    await db.delete(communities);
    await db.delete(adminUsers);
    await db.delete(adminStats);

    // Seed communities
    console.log('Seeding communities...');
    const [conway] = await db.insert(communities).values({
      name: 'Conway, Arkansas',
      city: 'Conway',
      state: 'Arkansas',
      latitude: '35.0887',
      longitude: '-92.4421',
      description: 'Conway is a thriving community in central Arkansas with a strong commitment to supporting local non-profits.',
      totalRaised: '185000',
      goalAmount: '500000',
      isActive: true
    }).returning();

    const [amarillo] = await db.insert(communities).values({
      name: 'Amarillo, Texas',
      city: 'Amarillo',
      state: 'Texas',
      latitude: '35.2220',
      longitude: '-101.8313',
      description: 'Amarillo is a vibrant Texas panhandle city where businesses and non-profits work together to strengthen the community.',
      totalRaised: '225000',
      goalAmount: '500000',
      isActive: true
    }).returning();

    // Seed non-profits for Conway
    console.log('Seeding non-profits...');
    const conwayNonprofits = await db.insert(nonprofits).values([
      {
        communityId: conway.id,
        name: 'Conway Animal Welfare Unit',
        category: 'Animal Welfare',
        description: 'Dedicated to rescuing and rehoming abandoned pets in Faulkner County',
        monthlyFunding: '2400',
        totalRaised: '28800',
        impactStatement: 'Rescued 450+ animals, completed 380+ adoptions, supported by 125 volunteers',
        website: 'https://www.conwayanimalwelfare.org'
      },
      {
        communityId: conway.id,
        name: 'Faulkner County Food Pantry',
        category: 'Food Security',
        description: 'Providing nutritious meals to families facing food insecurity',
        monthlyFunding: '3200',
        totalRaised: '41600',
        impactStatement: 'Serving 800+ families monthly, providing 24,000+ meals, distributing 50,000 lbs of food',
        website: 'https://www.faulknerfoodpantry.org'
      },
      {
        communityId: conway.id,
        name: 'Conway Youth Development Center',
        category: 'Youth Services',
        description: 'After-school programs and mentorship for at-risk youth',
        monthlyFunding: '2800',
        totalRaised: '33600',
        impactStatement: '250+ students enrolled, 5,000+ tutoring hours, 95% college readiness rate',
        website: 'https://www.conwayyouth.org'
      },
      {
        communityId: conway.id,
        name: 'Central Arkansas Veterans Support',
        category: 'Veterans Services',
        description: 'Supporting veterans with housing, job placement, and mental health services',
        monthlyFunding: '2100',
        totalRaised: '25200',
        impactStatement: 'Served 180+ veterans, 65+ job placements, secured housing for 42 veterans',
        website: 'https://www.cavetsupport.org'
      }
    ]).returning();

    // Seed non-profits for Amarillo
    const amarilloNonprofits = await db.insert(nonprofits).values([
      {
        communityId: amarillo.id,
        name: 'High Plains Food Bank',
        category: 'Food Security',
        description: 'Fighting hunger across the Texas Panhandle with dignity and compassion',
        monthlyFunding: '4500',
        totalRaised: '54000',
        impactStatement: '1,200+ families served, 36,000+ meals provided, 75,000 lbs food distributed',
        website: 'https://www.hpfb.org'
      },
      {
        communityId: amarillo.id,
        name: 'Amarillo Children\'s Home',
        category: 'Youth Services',
        description: 'Providing safe housing and support services for children in crisis',
        monthlyFunding: '3800',
        totalRaised: '45600',
        impactStatement: '120+ children housed, 24/7 care provided, 90% graduation rate',
        website: 'https://www.amarillochildrenshome.org'
      },
      {
        communityId: amarillo.id,
        name: 'Panhandle Animal Rescue',
        category: 'Animal Welfare',
        description: 'No-kill shelter serving abandoned and abused animals in the Texas Panhandle',
        monthlyFunding: '2900',
        totalRaised: '34800',
        impactStatement: '600+ animals rescued, 520+ adoptions, 150 active volunteers',
        website: 'https://www.panhandlerescue.org'
      },
      {
        communityId: amarillo.id,
        name: 'Veterans Freedom Center',
        category: 'Veterans Services',
        description: 'Comprehensive support center for veterans transitioning to civilian life',
        monthlyFunding: '3100',
        totalRaised: '37200',
        impactStatement: '220+ veterans served, 85+ job placements, 50+ housing solutions',
        website: 'https://www.veteransfreedom.org'
      }
    ]).returning();

    // Seed businesses for Conway
    console.log('Seeding businesses...');
    await db.insert(businesses).values([
      {
        communityId: conway.id,
        nonprofitId: conwayNonprofits[1].id, // Food Pantry
        name: 'Mike\'s Place Restaurant',
        type: 'Restaurant',
        address: '201 Donaghey Ave, Conway, AR',
        monthlyContribution: '450',
        totalContributed: '5400',
        yearJoined: 2023,
        website: 'https://www.mikesplaceconway.com'
      },
      {
        communityId: conway.id,
        nonprofitId: conwayNonprofits[3].id, // Veterans Support
        name: 'Conway Regional Medical Center Cafeteria',
        type: 'Healthcare',
        address: '2302 College Ave, Conway, AR',
        monthlyContribution: '680',
        totalContributed: '8160',
        yearJoined: 2023,
        website: 'https://www.conwayregional.org'
      },
      {
        communityId: conway.id,
        nonprofitId: conwayNonprofits[2].id, // Youth Center
        name: 'Natural State Coffee Co.',
        type: 'Coffee Shop',
        address: '315 Oak St, Conway, AR',
        monthlyContribution: '320',
        totalContributed: '3840',
        yearJoined: 2024,
        website: 'https://www.naturalstatecoffee.com'
      },
      {
        communityId: conway.id,
        nonprofitId: conwayNonprofits[0].id, // Animal Welfare
        name: 'Conway Athletic Club',
        type: 'Fitness Center',
        address: '705 Club Ln, Conway, AR',
        monthlyContribution: '520',
        totalContributed: '6240',
        yearJoined: 2024,
        website: 'https://www.conwayathletic.com'
      }
    ]);

    // Seed businesses for Amarillo
    await db.insert(businesses).values([
      {
        communityId: amarillo.id,
        nonprofitId: amarilloNonprofits[0].id, // Food Bank
        name: 'The Big Texan Steak Ranch',
        type: 'Restaurant',
        address: '7701 I-40 East, Amarillo, TX',
        monthlyContribution: '850',
        totalContributed: '10200',
        yearJoined: 2023,
        website: 'https://www.bigtexan.com'
      },
      {
        communityId: amarillo.id,
        nonprofitId: amarilloNonprofits[1].id, // Children's Home
        name: 'Amarillo National Bank',
        type: 'Financial Services',
        address: '410 S Taylor St, Amarillo, TX',
        monthlyContribution: '1200',
        totalContributed: '14400',
        yearJoined: 2023,
        website: 'https://www.anb.com'
      },
      {
        communityId: amarillo.id,
        nonprofitId: amarilloNonprofits[2].id, // Animal Rescue
        name: 'Palace Coffee Company',
        type: 'Coffee Shop',
        address: '420 SW 10th Ave, Amarillo, TX',
        monthlyContribution: '380',
        totalContributed: '4560',
        yearJoined: 2024,
        website: 'https://www.palacecoffee.com'
      },
      {
        communityId: amarillo.id,
        nonprofitId: amarilloNonprofits[3].id, // Veterans Center
        name: 'Panhandle Plains Fitness',
        type: 'Fitness Center',
        address: '3501 S Soncy Rd, Amarillo, TX',
        monthlyContribution: '620',
        totalContributed: '7440',
        yearJoined: 2024,
        website: 'https://www.ppfitness.com'
      }
    ]);

    // Seed admin user (password: admin123)
    console.log('Seeding admin user...');
    const passwordHash = crypto.createHash('sha256').update('admin123').digest('hex');
    await db.insert(adminUsers).values({
      username: 'admin',
      passwordHash: passwordHash,
      email: 'admin@sharecaregive.org',
      isActive: true
    });

    // Seed admin stats
    console.log('Seeding admin stats...');
    await db.insert(adminStats).values({
      totalCommunities: 2,
      totalNonprofits: 8,
      totalBusinesses: 8,
      totalRaised: '410000',
      monthlyAverage: '27500',
      topCommunity: 'Amarillo, Texas',
      topNonprofit: 'High Plains Food Bank',
      recentActivity: [
        {
          type: 'donation',
          business: 'The Big Texan Steak Ranch',
          amount: 850,
          nonprofit: 'High Plains Food Bank',
          time: '2 hours ago'
        },
        {
          type: 'new_business',
          name: 'Palace Coffee Company',
          community: 'Amarillo',
          time: '1 day ago'
        },
        {
          type: 'milestone',
          nonprofit: 'Conway Animal Welfare Unit',
          achievement: 'Reached 450 animals rescued',
          time: '3 days ago'
        }
      ] as any
    });

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
}

seed();