import { VideoHero } from '../components/VideoHero';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building, Heart, Globe, TrendingUp, Star, DollarSign, Shield, Clock, CheckCircle } from 'lucide-react';
import { ModernGoogleMap } from '../components/ModernGoogleMap';
import { Footer } from '../components/Footer';
import { SequentialSteps } from '../components/SequentialSteps';
import { FundraisingMeter } from '../components/FundraisingMeter';
import { LocationCard } from '../components/LocationCard';
import { ContactForm } from '../components/ContactForm';
import { ChatBot } from '../components/ChatBot';
import { Button } from '../components/Button';
import { useState, useEffect } from 'react';
import type { Location } from '../types';
import { totalFundraisingData } from '../data/fundraising';
import '../components/VideoContainer.css';
import '../styles/animations.css';

// Location data will be fetched from API

// Sequential steps data
const howItWorksSteps = [
  {
    number: 1,
    title: "Apply to Share Care Give",
    description: "Submit your non-profit's application through our streamlined process. We review your mission, impact, and community needs."
  },
  {
    number: 2,
    title: "Get Matched with Local Businesses",
    description: "Our team connects you with participating businesses in your area through the Swipe It Forward program."
  },
  {
    number: 3,
    title: "Receive Sustainable Funding",
    description: "Start receiving monthly funding from redirected credit card processing fees. No additional work required."
  }
];

const features = [
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Predictable Revenue",
    description: "Monthly funding you can count on for budgeting and long-term planning"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Save Time & Energy",
    description: "Stop spending countless hours on traditional fundraising activities"
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Business Partnerships",
    description: "Build meaningful relationships with local businesses that care about your cause"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "100% Transparent",
    description: "Full visibility into funding sources and allocation with detailed reporting"
  }
];

const stats = [
  { label: "Active Non-Profits", value: "150+", icon: <Heart className="h-6 w-6" /> },
  { label: "Partner Businesses", value: "300+", icon: <Building className="h-6 w-6" /> },
  { label: "Communities Served", value: "25+", icon: <Globe className="h-6 w-6" /> },
  { label: "Total Funding Raised", value: "$2.1M+", icon: <TrendingUp className="h-6 w-6" /> }
];

export function ShareCareGive() {
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (response.ok) {
          const data = await response.json();
          // Transform backend data to match frontend format
          const transformedLocations = data.map((item: any) => {
            // Extract city and state from address
            const addressParts = item.address.split(', ');
            const city = addressParts[1] || 'Unknown';
            const state = addressParts[2]?.split(' ')[0] || 'Unknown';
            
            return {
              id: item.id,
              city: city,
              state: state === 'AR' ? 'Arkansas' : state === 'TX' ? 'Texas' : state,
              latitude: item.lat,
              longitude: item.lng,
              nonprofits: []
            };
          });
          setLocations(transformedLocations);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
        // Fallback to default locations
        setLocations([
          {
            id: '1',
            state: 'Arkansas',
            city: 'Conway',
            latitude: 35.0887,
            longitude: -92.4421,
            nonprofits: []
          },
          {
            id: '2',
            state: 'Texas',
            city: 'Amarillo',
            latitude: 35.2220,
            longitude: -101.8313,
            nonprofits: []
          }
        ]);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationClick = (location: Location) => {
    navigate(`/community/${location.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <VideoHero 
        pageName="share-care-give" 
        onBookCall={() => setIsCalendarOpen(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Simplified Hero Message */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#00304f]">
            Turn payment processing fees into <br/>
            <span className="bg-gradient-to-r from-[#00304f] to-[#69932f] bg-clip-text text-transparent">sustainable funding</span> for your non-profit
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop fundraising. Start serving. Get predictable monthly revenue without asking for donations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => setShowApplicationForm(true)}
              variant="primary" 
              className="bg-gradient-to-r from-[#00304f] to-[#69932f] text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Apply Now - It's Free
            </Button>
            <button
              onClick={() => navigate('/swipe-it-forward')}
              className="text-[#69932f] hover:text-[#00304f] font-medium text-lg underline underline-offset-4"
            >
              Learn how it works →
            </button>
          </div>
        </div>

        {/* Map Section - Moved Up for Impact */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Active Communities</h3>
            <p className="text-gray-600">Join non-profits already receiving sustainable funding</p>
          </div>
          <ModernGoogleMap 
            locations={locations}
            onLocationClick={handleLocationClick}
          />
        </div>

        {/* The Problem - Simplified */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Non-profits spend 40% of their time fundraising
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Time Drain</h4>
                <p className="text-sm text-gray-600">Endless grant applications and events</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Unpredictable</h4>
                <p className="text-sm text-gray-600">Revenue varies month to month</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Mission Drift</h4>
                <p className="text-sm text-gray-600">Less focus on actual impact</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Solution - Clear and Simple */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-2xl p-8 md:p-10 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                The Solution: Redirect existing fees
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Businesses already pay 2-4% in credit card fees to banks.
                <br />We redirect a portion to your non-profit instead.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center text-sm">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>No cost to businesses</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>No cost to customers</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Predictable monthly revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits - Simplified */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-10">What you get</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                <DollarSign className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Predictable Revenue</h4>
              <p className="text-sm text-gray-600">Monthly funding you can count on</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                <Clock className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Zero Fundraising</h4>
              <p className="text-sm text-gray-600">Focus 100% on your mission</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                <Building className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Business Partners</h4>
              <p className="text-sm text-gray-600">Local businesses support you</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-3 text-white">
                <Shield className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Fully Transparent</h4>
              <p className="text-sm text-gray-600">Track every dollar received</p>
            </div>
          </div>
        </div>

        {/* Fundraising Meter */}
        <div className="mb-16 animate-fadeIn">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Real Impact</h3>
            <p className="text-lg text-gray-600">Actual funding delivered to non-profits in our network</p>
          </div>
          <FundraisingMeter 
            currentAmount={totalFundraisingData.currentAmount}
            goalAmount={totalFundraisingData.goalAmount}
            className="max-w-4xl mx-auto"
            nonprofitCount={totalFundraisingData.nonprofitCount}
            businessCount={totalFundraisingData.businessCount}
          />
          <div className="max-w-4xl mx-auto mt-4 text-center">
            <p className="text-sm text-gray-500">Last Updated: {totalFundraisingData.lastUpdated}</p>
          </div>
        </div>

        {/* Success Stories - Simplified */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Real Results</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 mb-4 italic">
                "Share Care Give has been a game-changer for our animal shelter. We now receive $2,400 monthly without any additional fundraising efforts. It's allowed us to focus entirely on rescuing and caring for animals."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AS
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Arkansas Animal Shelter</div>
                  <div className="text-sm text-gray-600">Conway, AR</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 mb-4 italic">
                "The predictable monthly funding from Share Care Give allowed us to hire a full-time program coordinator. Our youth programs have tripled in size, and we're making a real difference in our community."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  YC
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Youth Community Center</div>
                  <div className="text-sm text-gray-600">Amarillo, TX</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works - Simple 3 Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Start in 3 simple steps</h3>
          <SequentialSteps steps={howItWorksSteps} theme="blue" />
        </div>

        {/* Comparison - Simplified */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">A better way to fund your mission</h3>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Traditional Fundraising */}
              <div className="p-8 bg-gray-50">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Traditional Fundraising</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm">✗</span>
                    </div>
                    <span className="text-gray-700">Time-consuming grant applications</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm">✗</span>
                    </div>
                    <span className="text-gray-700">Unpredictable revenue streams</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm">✗</span>
                    </div>
                    <span className="text-gray-700">Expensive fundraising events</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm">✗</span>
                    </div>
                    <span className="text-gray-700">Staff burnout from constant fundraising</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-600 text-sm">✗</span>
                    </div>
                    <span className="text-gray-700">Limited community engagement</span>
                  </div>
                </div>
              </div>

              {/* Share Care Give */}
              <div className="p-8 bg-gradient-to-br from-[#00304f] to-[#69932f] text-white">
                <h4 className="text-2xl font-bold mb-6 text-center">Share Care Give</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Predictable monthly revenue</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>No ongoing fundraising required</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Strong business partnerships</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Focus 100% on your mission</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span>Enhanced community visibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar - Moved down for better flow */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA - Simplified */}
        <div className="bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-2xl p-10 text-white text-center mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to stop fundraising?</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join hundreds of non-profits already receiving sustainable monthly funding.
          </p>
          <Button 
            onClick={() => setShowApplicationForm(true)}
            variant="outline" 
            className="bg-white text-[#00304f] hover:bg-gray-100 border-white px-8 py-4 text-lg font-semibold shadow-lg"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Apply Now - It's Free
          </Button>
          <p className="text-sm opacity-75 mt-4">✓ No costs  ✓ No contracts  ✓ Start in 30 days</p>
        </div>

        {/* Contact Form Section */}
        <div className="mb-16">
          <ContactForm />
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold text-[#00304f]">Share Care Give Application</h2>
              <button 
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700"
                title="Close application form"
                aria-label="Close application form"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-grow p-0 overflow-hidden">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/yruErwWMWEhWXTaQRz0N"
                className="w-full h-full border-none"
                id="inline-yruErwWMWEhWXTaQRz0N" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Share Care Give"
                data-height="100%"
                data-layout-iframe-id="inline-yruErwWMWEhWXTaQRz0N"
                data-form-id="yruErwWMWEhWXTaQRz0N"
                title="Share Care Give"
                sandbox="allow-scripts allow-forms allow-same-origin"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <Footer />

      {/* Script for form embed */}
      <script src="https://link.msgsndr.com/js/form_embed.js"></script>
    </div>
  );
}