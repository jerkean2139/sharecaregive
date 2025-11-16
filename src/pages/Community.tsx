import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Building, Heart, TrendingUp, MapPin, Phone, Mail, Globe, DollarSign, CheckCircle } from 'lucide-react';
import { FundraisingMeter } from '../components/FundraisingMeter';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

interface CommunityData {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  description: string;
  totalRaised: number;
  monthlyAverage: number;
  nonprofits: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    monthlyFunding: number;
    totalRaised: number;
    impactMetrics: Record<string, string>;
  }>;
  businesses: Array<{
    id: string;
    name: string;
    type: string;
    address: string;
    yearJoined: string;
    monthlyContribution: number;
    supportedNonprofit: string;
  }>;
}

export function Community() {
  const { id } = useParams<{ id: string }>();
  const [community, setCommunity] = useState<CommunityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNonprofit, setSelectedNonprofit] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        // Use the ID directly as it now matches database IDs
        const response = await fetch(`/api/communities/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCommunity(data);
          if (data.nonprofits.length > 0) {
            setSelectedNonprofit(data.nonprofits[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch community:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCommunity();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00304f]"></div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#00304f] mb-4">Community Not Found</h1>
          <p className="text-gray-600 mb-8">The community you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/share-care-give" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00304f] to-[#69932f] text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
            Return to Communities
          </Link>
        </div>
      </div>
    );
  }

  const selectedNonprofitData = community.nonprofits.find(np => np.id === selectedNonprofit);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#00304f] to-[#69932f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/share-care-give" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to All Communities
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{community.name}</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl">{community.description}</p>
          
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="h-6 w-6" />
                <p className="text-sm text-white/80">Non-Profits</p>
              </div>
              <p className="text-3xl font-bold">{community.nonprofits.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Building className="h-6 w-6" />
                <p className="text-sm text-white/80">Partner Businesses</p>
              </div>
              <p className="text-3xl font-bold">{community.businesses.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="h-6 w-6" />
                <p className="text-sm text-white/80">Total Raised</p>
              </div>
              <p className="text-3xl font-bold">${community.totalRaised.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6" />
                <p className="text-sm text-white/80">Monthly Average</p>
              </div>
              <p className="text-3xl font-bold">${community.monthlyAverage.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Community Impact */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Community Impact</h2>
          <FundraisingMeter 
            currentAmount={community.totalRaised}
            goalAmount={250000}
            className="max-w-4xl mx-auto mb-8"
            nonprofitCount={community.nonprofits.length}
            businessCount={community.businesses.length}
          />
        </div>

        {/* Non-Profit Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Non-Profit Partners</h2>
          
          {/* Non-profit selector tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {community.nonprofits.map((nonprofit) => (
              <button
                key={nonprofit.id}
                onClick={() => setSelectedNonprofit(nonprofit.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedNonprofit === nonprofit.id
                    ? 'bg-gradient-to-r from-[#00304f] to-[#69932f] text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#69932f]'
                }`}
              >
                {nonprofit.name}
              </button>
            ))}
          </div>

          {/* Selected non-profit details */}
          {selectedNonprofitData && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[#69932f]/10 text-[#69932f] rounded-full text-sm font-medium mb-3">
                      {selectedNonprofitData.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{selectedNonprofitData.name}</h3>
                    <p className="text-gray-600 mb-6">{selectedNonprofitData.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Monthly Funding</p>
                      <p className="text-2xl font-bold text-[#00304f]">${selectedNonprofitData.monthlyFunding.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Total Raised</p>
                      <p className="text-2xl font-bold text-[#69932f]">${selectedNonprofitData.totalRaised.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3">
                  <h4 className="font-semibold text-gray-800 mb-4">Impact Metrics</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedNonprofitData.impactMetrics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{key}</span>
                        <span className="font-bold text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Partner Businesses */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Partner Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {community.businesses.map((business) => (
              <div key={business.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{business.name}</h3>
                  <p className="text-sm text-gray-600">{business.type}</p>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-xs text-gray-600">{business.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-xs text-gray-600">Joined {business.yearJoined}</p>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-600 mb-1">Monthly Contribution</p>
                  <p className="font-bold text-[#69932f]">${business.monthlyContribution}</p>
                  <p className="text-xs text-gray-500 mt-1">Supporting: {business.supportedNonprofit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works in This Community */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How It Works in {community.name}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Businesses Join</h3>
              <p className="text-gray-600 text-sm">Local businesses partner with us to redirect their credit card processing fees</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Non-Profits Receive</h3>
              <p className="text-gray-600 text-sm">Funds are automatically distributed to local non-profits monthly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Community Thrives</h3>
              <p className="text-gray-600 text-sm">Everyone benefits from stronger, better-funded local organizations</p>
            </div>
          </div>
        </div>

        {/* Join This Community CTA */}
        <div className="bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-2xl p-10 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Join the {community.name} Movement</h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a non-profit seeking sustainable funding or a business wanting to make a difference, 
            we're here to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              as="link"
              to="/share-care-give"
              variant="outline" 
              className="bg-white text-[#00304f] hover:bg-gray-100 border-white px-8 py-4 text-lg font-semibold"
            >
              Apply as Non-Profit
            </Button>
            <Button 
              as="link"
              to="/swipe-it-forward"
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
            >
              Join as Business
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}