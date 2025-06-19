import { VideoHero } from '../components/VideoHero';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Building, Heart, Zap, Globe, TrendingUp, Star, DollarSign, Shield, Clock } from 'lucide-react';
import { USAMap } from '../components/USAMap';
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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        if (response.ok) {
          const data = await response.json();
          setLocations(data);
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
      {/* Hero Video Section */}
      <VideoHero pageName="share-care-give" />

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Copy Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00304f] to-[#69932f] bg-clip-text text-transparent leading-tight">
            The Future of Non-Profit Funding
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
            Share Care Give revolutionizes how non-profits receive funding by redirecting credit card processing fees that normally go to banks. Get sustainable, predictable revenue without the constant stress of traditional fundraising.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button 
              onClick={() => setShowApplicationForm(true)}
              variant="primary" 
              className="bg-gradient-to-r from-[#00304f] to-[#69932f] text-white px-8 py-4 text-lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Apply for Share Care Give
            </Button>
            <Button 
              as="link" 
              to="/swipe-it-forward" 
              variant="outline" 
              className="border-2 border-[#69932f] text-[#69932f] hover:bg-[#69932f] hover:text-white px-8 py-4 text-lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              See How It Works
            </Button>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="mb-16 animate-slideUp">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 md:p-12 border-l-4 border-red-400">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                The Non-Profit Funding Crisis
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Traditional fundraising is broken. Non-profits spend 40% of their time raising money instead of serving their communities. Grant writing, donor cultivation, and fundraising events consume valuable resources that should go toward your mission.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-3xl mb-2">😫</div>
                  <div className="font-semibold text-gray-800">Fundraising Burnout</div>
                  <div className="text-sm text-gray-600">Constant pressure to raise funds</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-3xl mb-2">📉</div>
                  <div className="font-semibold text-gray-800">Unpredictable Income</div>
                  <div className="text-sm text-gray-600">Inconsistent cash flow</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="font-semibold text-gray-800">Time Wasted</div>
                  <div className="text-sm text-gray-600">Less time for actual impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-16 animate-slideUp">
          <div className="bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Our Solution: Redirect, Don't Add
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Instead of asking for more money, we redirect funds that businesses are already paying to banks. Every credit card swipe generates fees—now those fees can support your cause instead of Wall Street profits.
              </p>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">💡 The Big Idea</div>
                <p className="text-lg">
                  Businesses pay 2-4% in credit card fees. We help redirect a portion to local non-profits at zero additional cost to the business or consumer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16 animate-slideUp">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Non-Profits Love Share Care Give</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transform your funding model and focus on what matters most—serving your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
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

        {/* Success Stories */}
        <div className="mb-16 animate-slideUp">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h3>
            <p className="text-lg text-gray-600">Real non-profits, real results, real impact</p>
          </div>

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

        {/* How It Works Section */}
        <div className="mb-16 animate-slideUp">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">How to Get Started</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our simple three-step process gets you from application to funding in as little as 30 days.
            </p>
          </div>
          <div className="relative">
            <SequentialSteps steps={howItWorksSteps} theme="blue" />
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mb-16 animate-slideUp">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Traditional Fundraising vs. Share Care Give</h3>
          </div>

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

        {/* Map Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Communities We're Transforming</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              See how Share Care Give is creating sustainable funding ecosystems in communities across America.
            </p>
          </div>

          {/* Available Locations */}
          {isLoadingLocations ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00304f]"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {locations.map((location) => (
                  <LocationCard 
                    key={location.id}
                    location={location}
                    onClick={handleLocationClick}
                  />
                ))}
              </div>

              <div className="aspect-w-16 aspect-h-9 bg-white rounded-xl shadow-lg overflow-hidden">
                <USAMap 
                  locations={locations}
                  onLocationClick={handleLocationClick}
                />
              </div>
            </>
          )}
        </div>

        {/* Final CTA Section */}
        <div className="relative bg-gradient-to-r from-[#00304f] via-[#004066] to-[#69932f] rounded-2xl p-12 text-white text-center mb-16 overflow-hidden animate-fadeIn">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Funding?</h3>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join hundreds of non-profits who've discovered sustainable funding through Share Care Give. Stop struggling with traditional fundraising and start focusing on your mission.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto mb-6">
              <Button 
                onClick={() => setShowApplicationForm(true)}
                variant="outline" 
                className="bg-white text-[#00304f] hover:bg-gray-100 border-white px-8 py-4 text-lg font-semibold"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                Apply Now - It's Free
              </Button>
              <Button 
                as="link" 
                to="/swipe-it-forward" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                See How It Works
              </Button>
            </div>
            <p className="text-sm opacity-75">✓ No upfront costs  ✓ No long-term contracts  ✓ Start receiving funding in 30 days</p>
          </div>
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