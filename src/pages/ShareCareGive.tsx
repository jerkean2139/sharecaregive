
import { VideoHero } from '../components/VideoHero';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Building, Heart, Zap, Globe, TrendingUp } from 'lucide-react';
import { USAMap } from '../components/USAMap';
import { Footer } from '../components/Footer';
import { SequentialSteps } from '../components/SequentialSteps';
import { FundraisingMeter } from '../components/FundraisingMeter';
import { LocationCard } from '../components/LocationCard';
import { ContactForm } from '../components/ContactForm';
import { ChatBot } from '../components/ChatBot';
import { useState } from 'react';
import type { Location } from '../types';
import { totalFundraisingData } from '../data/fundraising';
import '../components/VideoContainer.css';
import '../styles/animations.css';

// Mock data for the map
const mockLocations: Location[] = [
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
];

// Sequential steps data
const howItWorksSteps = [
  {
    number: 1,
    title: "Non-Profit Applies",
    description: "Local non-profits apply to become a Share Care Give partner organization through our streamlined application process."
  },
  {
    number: 2,
    title: "Business Connections",
    description: "We connect approved non-profits with local businesses through our innovative Swipe It Forward program."
  },
  {
    number: 3,
    title: "Sustainable Funding",
    description: "Non-profits receive ongoing funding from redirected processing fees, creating a reliable revenue stream."
  }
];

export function ShareCareGive() {
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  const handleLocationClick = (location: Location) => {
    navigate(`/community/${location.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Video Section */}
      <VideoHero pageName="share-care-give" />
      
      {/* Hero Copy Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00304f] via-[#69932f] to-[#00304f] bg-clip-text text-transparent leading-tight">
            Revolutionizing Non-Profit Funding
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Share Care Give transforms how communities support their local causes. By redirecting credit card processing fees that normally go to banks, we create sustainable funding streams for non-profits at zero cost to businesses or consumers.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#69932f]" />
              <span>Instant Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#00304f]" />
              <span>Community Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#69932f]" />
              <span>Sustainable Growth</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        
        {/* Fundraising Meter */}
        <div className="mb-16 animate-fadeIn">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Impact So Far</h3>
            <p className="text-gray-600">Real funding, real results, real community impact</p>
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
        
        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-slideUp">
          {/* For Non-Profits */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#00304f] to-[#004066] p-8 rounded-2xl shadow-xl text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Non-Profits</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Transform your funding model with predictable, sustainable revenue that grows with your community.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-50">Monthly recurring funding without additional fundraising efforts</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-50">Direct partnerships with local businesses in your community</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-50">Increased visibility and community engagement</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-50">Complete transparency in funding allocation</span>
                </div>
              </div>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="bg-white text-[#00304f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 group"
              >
                Apply Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* For Businesses */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#69932f] to-[#7ba135] p-8 rounded-2xl shadow-xl text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Businesses</h3>
              <p className="text-green-100 mb-6 text-lg">
                Support your community while building customer loyalty and brand reputation—at absolutely no cost to you.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span className="text-green-50">Zero additional costs or fees to your business</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span className="text-green-50">Attract conscious consumers who value community support</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span className="text-green-50">Enhanced local reputation and community standing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <span className="text-green-50">Marketing and promotional support from our network</span>
                </div>
              </div>
              <Link
                to="/swipe-it-forward"
                className="bg-white text-[#69932f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 group inline-flex"
              >
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* The Problem & Solution Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">The Problem We're Solving</h2>
            <p className="text-lg text-gray-600">
              Traditional fundraising is time-consuming, unpredictable, and often insufficient for non-profits to achieve their missions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😓</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Fundraising Fatigue</h3>
              <p className="text-gray-600 text-sm">Constant fundraising efforts drain resources and energy from mission-critical work.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Unpredictable Revenue</h3>
              <p className="text-gray-600 text-sm">Irregular funding makes long-term planning and program sustainability difficult.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Limited Resources</h3>
              <p className="text-gray-600 text-sm">Small budgets limit impact and growth potential for community organizations.</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Our Solution: Redirect. Don't Add.</h3>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              Instead of asking businesses to spend more, we redirect fees they're already paying to banks. It's a win-win-win for businesses, non-profits, and communities.
            </p>
            <div className="flex justify-center">
              <Link
                to="/swipe-it-forward"
                className="bg-white text-[#00304f] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                See How It Works
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Benefits Section - Redesigned */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Share Care Give Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our innovative approach creates lasting value for every stakeholder in the community ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-[#00304f]">
              <div className="w-14 h-14 rounded-full bg-[#00304f] flex items-center justify-center mb-6">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">For Non-Profits</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#00304f] mt-0.5 flex-shrink-0" />
                  <span>Predictable monthly revenue streams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#00304f] mt-0.5 flex-shrink-0" />
                  <span>Strong local business partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#00304f] mt-0.5 flex-shrink-0" />
                  <span>Enhanced community visibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#00304f] mt-0.5 flex-shrink-0" />
                  <span>Focus on mission, not fundraising</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-[#69932f]">
              <div className="w-14 h-14 rounded-full bg-[#69932f] flex items-center justify-center mb-6">
                <Building className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">For Businesses</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#69932f] mt-0.5 flex-shrink-0" />
                  <span>Increased customer loyalty and retention</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#69932f] mt-0.5 flex-shrink-0" />
                  <span>Positive community reputation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#69932f] mt-0.5 flex-shrink-0" />
                  <span>Differentiation from competitors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-[#69932f] mt-0.5 flex-shrink-0" />
                  <span>Marketing and promotional benefits</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-t-4 border-gray-800">
              <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">For Communities</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-800 mt-0.5 flex-shrink-0" />
                  <span>Stronger local economic ecosystem</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-800 mt-0.5 flex-shrink-0" />
                  <span>More resources for local causes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-800 mt-0.5 flex-shrink-0" />
                  <span>Enhanced civic engagement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gray-800 mt-0.5 flex-shrink-0" />
                  <span>Thriving non-profit sector</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Share Care Give Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process connects non-profits with businesses through our innovative Swipe It Forward program, creating sustainable funding relationships.
            </p>
          </div>
          <div className="relative">
            <SequentialSteps steps={howItWorksSteps} theme="blue" />
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Communities We're Transforming</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              See how Share Care Give is creating sustainable funding ecosystems in communities across America. Each location represents real non-profits receiving real funding.
            </p>
          </div>
          
          {/* Available Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {mockLocations.map((location) => (
              <LocationCard 
                key={location.id}
                location={location}
                onClick={handleLocationClick}
              />
            ))}
          </div>
          
          <div className="aspect-w-16 aspect-h-9 bg-white rounded-xl shadow-lg overflow-hidden">
            <USAMap 
              locations={mockLocations}
              onLocationClick={handleLocationClick}
            />
          </div>
        </div>
        
        {/* CTA Section - Enhanced */}
        <div className="relative bg-gradient-to-r from-[#00304f] via-[#004066] to-[#69932f] rounded-2xl p-12 text-white text-center mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Community?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join the movement that's revolutionizing how communities support their local causes. Whether you're a non-profit seeking sustainable funding or a business wanting to make a difference, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-white text-[#00304f] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Apply for Share Care Give
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link 
                to="/swipe-it-forward"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                Learn About Swipe It Forward
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
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
