import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Location } from '../types';
import { FundraisingMeter } from '../components/FundraisingMeter';
import { fundraisingData } from '../data/fundraising';
import { PartnerCarousel } from '../components/PartnerCarousel';
import '../styles/animations.css';

// Mock data for community pages
const COMMUNITY_DATA: Record<string, Location> = {
  '1': {
    id: '1',
    state: 'Arkansas',
    city: 'Conway',
    latitude: 35.0887,
    longitude: -92.4421,
    nonprofits: [
      {
        id: 'np1',
        name: 'Conway Community Foundation',
        description: 'Supporting local initiatives and community development in Conway.',
        logo: 'https://placehold.co/200x100?text=CCF',
        website: 'https://example.com/ccf',
        partneredBusinesses: [
          {
            id: 'b1',
            name: 'Conway Coffee Co.',
            description: 'Local coffee shop supporting community initiatives.',
            logo: 'https://placehold.co/100x100?text=CCC',
            website: 'https://example.com/ccc',
            partnerNonProfit: {
              id: 'np1',
              name: 'Conway Community Foundation',
              description: 'Supporting local initiatives and community development in Conway.',
              logo: 'https://placehold.co/200x100?text=CCF',
              website: 'https://example.com/ccf',
              partneredBusinesses: []
            },
          },
          {
            id: 'b2',
            name: 'Arkansas Bookstore',
            description: 'Independent bookstore with community focus.',
            logo: 'https://placehold.co/100x100?text=AB',
            website: 'https://example.com/ab',
            partnerNonProfit: {
              id: 'np1',
              name: 'Conway Community Foundation',
              description: 'Supporting local initiatives and community development in Conway.',
              logo: 'https://placehold.co/200x100?text=CCF',
              website: 'https://example.com/ccf',
              partneredBusinesses: []
            },
          }
        ]
      },
      {
        id: 'np3',
        name: 'Conway Youth Center',
        description: 'Providing safe spaces and programs for youth development in Conway.',
        logo: 'https://placehold.co/200x100?text=CYC',
        website: 'https://example.com/cyc',
        partneredBusinesses: []
      },
      {
        id: 'np4',
        name: 'Arkansas Education Fund',
        description: 'Supporting educational initiatives and scholarships in Conway area schools.',
        logo: 'https://placehold.co/200x100?text=AEF',
        website: 'https://example.com/aef',
        partneredBusinesses: []
      },
      {
        id: 'np5',
        name: 'Conway Animal Welfare',
        description: 'Dedicated to animal rescue, adoption, and welfare in Conway county.',
        logo: 'https://placehold.co/200x100?text=CAW',
        website: 'https://example.com/caw',
        partneredBusinesses: []
      },
      {
        id: 'np6',
        name: 'Conway Arts Alliance',
        description: 'Promoting arts and cultural development throughout Conway and surrounding areas.',
        logo: 'https://placehold.co/200x100?text=CAA',
        website: 'https://example.com/caa',
        partneredBusinesses: []
      }
    ],
  },
  '2': {
    id: '2',
    state: 'Texas',
    city: 'Amarillo',
    latitude: 35.2220,
    longitude: -101.8313,
    nonprofits: [
      {
        id: 'np2',
        name: 'Amarillo Gives Back',
        description: 'Connecting businesses and nonprofits in the Amarillo area.',
        logo: 'https://placehold.co/200x100?text=AGB',
        website: 'https://example.com/agb',
        partneredBusinesses: [
          {
            id: 'b3',
            name: 'Amarillo Grill',
            description: 'Family-owned restaurant supporting local causes.',
            logo: 'https://placehold.co/100x100?text=AG',
            website: 'https://example.com/ag',
            partnerNonProfit: {
              id: 'np2',
              name: 'Amarillo Gives Back',
              description: 'Connecting businesses and nonprofits in the Amarillo area.',
              logo: 'https://placehold.co/200x100?text=AGB',
              website: 'https://example.com/agb',
              partneredBusinesses: []
            },
          },
          {
            id: 'b4',
            name: 'Texas Tech Bookstore',
            description: 'Campus bookstore with community outreach programs.',
            logo: 'https://placehold.co/100x100?text=TTB',
            website: 'https://example.com/ttb',
            partnerNonProfit: {
              id: 'np2',
              name: 'Amarillo Gives Back',
              description: 'Connecting businesses and nonprofits in the Amarillo area.',
              logo: 'https://placehold.co/200x100?text=AGB',
              website: 'https://example.com/agb',
              partneredBusinesses: []
            },
          }
        ]
      },
      {
        id: 'np7',
        name: 'Amarillo Youth Sports',
        description: 'Providing sports programs and equipment for underprivileged youth in Amarillo.',
        logo: 'https://placehold.co/200x100?text=AYS',
        website: 'https://example.com/ays',
        partneredBusinesses: []
      },
      {
        id: 'np8',
        name: 'Texas Panhandle Food Bank',
        description: 'Fighting hunger and providing nutritious food to families in need across the Panhandle.',
        logo: 'https://placehold.co/200x100?text=TPFB',
        website: 'https://example.com/tpfb',
        partneredBusinesses: []
      },
      {
        id: 'np9',
        name: 'Amarillo Healthcare Initiative',
        description: 'Improving access to healthcare services for underserved communities in Amarillo.',
        logo: 'https://placehold.co/200x100?text=AHI',
        website: 'https://example.com/ahi',
        partneredBusinesses: []
      },
      {
        id: 'np10',
        name: 'Panhandle Environmental Group',
        description: 'Working to protect and preserve the natural environment in the Texas Panhandle region.',
        logo: 'https://placehold.co/200x100?text=PEG',
        website: 'https://example.com/peg',
        partneredBusinesses: []
      }
    ],
  }
};

export function Community() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch community data
    setTimeout(() => {
      if (id && COMMUNITY_DATA[id]) {
        setCommunity(COMMUNITY_DATA[id]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#00304f]"></div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-white p-4 sm:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00304f] mb-3 sm:mb-4">Community Not Found</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">The community you're looking for doesn't exist or has been removed.</p>
          <a href="/" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#69932f] text-white font-medium rounded-lg hover:bg-[#5a7f28] transition-colors text-sm sm:text-base">
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#00304f] text-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{community.city}, {community.state}</h1>
          <p className="text-lg sm:text-xl text-white/80 mb-6">Share Care Give Community Partner</p>
          
          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm text-white/70">Non-Profits</p>
              <p className="text-2xl font-bold">{community.nonprofits.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm text-white/70">Businesses</p>
              <p className="text-2xl font-bold">
                {community.nonprofits.reduce((total, nonprofit) => total + nonprofit.partneredBusinesses.length, 0)}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm text-white/70">Community</p>
              <p className="text-2xl font-bold">{community.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#00304f] mb-2 sm:mb-3">
            {community.city}, {community.state}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Join the Share Care Give movement in {community.city} and help create sustainable funding for local non-profits.
          </p>
        </div>
        
        {/* Non-Profit Partners Carousel */}
        <div className="mb-12 sm:mb-16 animate-fadeIn">
          <PartnerCarousel 
            partners={community.nonprofits}
            title={`${community.city} Non-Profit Partners`}
          />
        </div>

        {/* Fundraising Meter Section */}
        <div className="bg-gray-50 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {fundraisingData.filter(data => data.communityId === community.id).map(data => (
              <div key={data.communityId} className="animate-fadeIn">
                <FundraisingMeter
                  currentAmount={data.currentAmount}
                  goalAmount={data.goalAmount}
                  communityName={data.communityName}
                  className="max-w-3xl mx-auto"
                  nonprofitCount={data.nonprofitCount}
                  businessCount={data.businessCount}
                />
                <div className="max-w-3xl mx-auto mt-4 text-center">
                  <p className="text-sm text-gray-500">Last Updated: {data.lastUpdated}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Community Info */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#00304f] mb-4 sm:mb-6">About {community.city}</h2>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              {community.city} is a vibrant community participating in the Share Care Give program. 
              Local businesses and non-profits work together to create sustainable funding and support 
              for community initiatives.
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              Through the Swipe It Forward program, businesses in {community.city} contribute a portion 
              of their credit card processing fees to support local non-profits, creating a win-win 
              situation for everyone involved.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-[#00304f] mb-3 sm:mb-4">Community Statistics</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500">Non-Profits</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#69932f]">{community.nonprofits.length}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500">Businesses</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#69932f]">
                  {community.nonprofits.reduce((total, np) => total + np.partneredBusinesses.length, 0)}
                </p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm col-span-2">
                <p className="text-xs sm:text-sm text-gray-500">Est. Monthly Impact</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#69932f]">$1,250</p>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Profits Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#00304f] mb-6 sm:mb-8">Local Non-Profits</h2>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {community.nonprofits.map((nonprofit) => (
            <div key={nonprofit.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md overflow-hidden mr-3 sm:mr-4">
                    <img src={nonprofit.logo} alt={nonprofit.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#00304f]">{nonprofit.name}</h3>
                    <a href={nonprofit.website} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-[#69932f] hover:underline">
                      Visit Website
                    </a>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">{nonprofit.description}</p>
                
                <h4 className="text-base sm:text-lg font-semibold text-[#00304f] mb-2 sm:mb-3">Partnered Businesses</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {nonprofit.partneredBusinesses.map((business) => (
                    <div key={business.id} className="bg-gray-50 p-2 sm:p-3 rounded-md">
                      <div className="flex items-center mb-1 sm:mb-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-md overflow-hidden mr-2 sm:mr-3">
                          <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 text-sm sm:text-base">{business.name}</h5>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{business.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#69932f]/10 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs sm:text-sm text-[#69932f] font-medium">
                    {nonprofit.partneredBusinesses.length} partnered businesses
                  </p>
                  <a 
                    href={nonprofit.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs sm:text-sm bg-[#69932f] text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded hover:bg-[#5a7f28] transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#00304f] text-white p-4 sm:p-8 rounded-xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Join the {community.city} Community</h2>
          <p className="text-sm sm:text-base mb-4 sm:mb-6 max-w-2xl mx-auto">
            Whether you're a local business or non-profit, you can be part of the Share Care Give initiative 
            in {community.city}. Together, we can create sustainable funding and support for our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="/share-care-give" className="px-4 sm:px-6 py-2 sm:py-3 bg-[#69932f] text-white font-medium rounded-lg hover:bg-[#5a7f28] transition-colors text-sm sm:text-base">
              For Non-Profits
            </a>
            <a href="/swipe-it-forward" className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-[#00304f] font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base">
              For Businesses
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
