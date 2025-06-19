import { VideoHero } from '../components/VideoHero';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Building, Heart } from 'lucide-react';
import { USAMap } from '../components/USAMap';
import { Footer } from '../components/Footer';
import { SequentialSteps } from '../components/SequentialSteps';
import { FundraisingMeter } from '../components/FundraisingMeter';
import { LocationCard } from '../components/LocationCard';
import { ContactForm } from '../components/ContactForm';
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
    description: "Local non-profits apply to become a Share Care Give partner organization."
  },
  {
    number: 2,
    title: "Business Connections",
    description: "We connect non-profits with local businesses through Swipe It Forward."
  },
  {
    number: 3,
    title: "Sustainable Funding",
    description: "Non-profits receive ongoing funding from redirected processing fees."
  }
];

export function ShareCareGive() {
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  const handleLocationClick = (location: Location) => {
    navigate(`/community/${location.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Video Section */}
      <VideoHero pageName="share-care-give" />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#00304f] to-[#69932f] bg-clip-text text-transparent pb-1">
          Sustainable Funding for Non-Profits
        </h2>
        
        {/* Fundraising Meter */}
        <div className="mb-12 sm:mb-16 animate-fadeIn">
          <FundraisingMeter 
            currentAmount={totalFundraisingData.currentAmount}
            goalAmount={totalFundraisingData.goalAmount}
            className="max-w-3xl mx-auto"
            nonprofitCount={totalFundraisingData.nonprofitCount}
            businessCount={totalFundraisingData.businessCount}
          />
          <div className="max-w-3xl mx-auto mt-4 text-center">
            <p className="text-sm text-gray-500">Last Updated: {totalFundraisingData.lastUpdated}</p>
          </div>
        </div>
        
        {/* Two Column Section */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 items-stretch">
          {/* Left Column */}
          <div className="space-y-4 bg-gray-50 p-6 sm:p-8 rounded-xl border-2 border-[#00304f] shadow-lg flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-[#00304f]">
              For Non-Profits: Why Share Care Give?
            </h3>
            <p className="text-gray-700">
              Share Care Give provides a sustainable funding solution for non-profits by connecting you with local businesses that want to support your cause.
            </p>
            <ul className="space-y-2 flex-grow">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00304f] mt-1 mr-2 flex-shrink-0" />
                <span>Receive monthly funding without additional fundraising efforts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00304f] mt-1 mr-2 flex-shrink-0" />
                <span>Build stronger connections with local businesses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00304f] mt-1 mr-2 flex-shrink-0" />
                <span>Increase your impact in the community</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00304f] mt-1 mr-2 flex-shrink-0" />
                <span>Gain visibility through our partner network</span>
              </li>
            </ul>
            <div className="pt-4">
              <button
                onClick={() => setShowApplicationForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#00304f] hover:bg-[#00304f]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00304f]"
              >
                Apply Now
                <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4 bg-gray-50 p-6 sm:p-8 rounded-xl border-2 border-[#69932f] shadow-lg flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-[#69932f]">
              For Businesses: Support Your Community
            </h3>
            <p className="text-gray-700">
              Partner with Share Care Give to support local non-profits while also growing your business through our Swipe It Forward program.
            </p>
            <ul className="space-y-2 flex-grow">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#69932f] mt-1 mr-2 flex-shrink-0" />
                <span>No additional cost to your business</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#69932f] mt-1 mr-2 flex-shrink-0" />
                <span>Attract customers who value community support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#69932f] mt-1 mr-2 flex-shrink-0" />
                <span>Strengthen your local reputation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#69932f] mt-1 mr-2 flex-shrink-0" />
                <span>Receive marketing support from our network</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                to="/swipe-it-forward"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#69932f] hover:bg-[#69932f]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#69932f]"
              >
                Learn More
                <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00304f] mb-8">
            Benefits for Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#00304f] flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">For Non-Profits</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Sustainable monthly funding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Business partnerships</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Increased community impact</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#69932f] flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">For Businesses</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Customer loyalty</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Community goodwill</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Marketing opportunities</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">For Communities</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Stronger local connections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>More resources for local causes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gray-800 mt-1 mr-2 flex-shrink-0" />
                  <span>Thriving non-profit sector</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00304f] mb-8">
            How Share Care Give Works with Swipe It Forward
          </h2>
          <div className="relative">
            <SequentialSteps steps={howItWorksSteps} theme="blue" />
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00304f] mb-4">
            Communities We're Serving
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
            Explore the communities where Share Care Give is creating sustainable funding for non-profits.
          </p>
          
          {/* Available Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#00304f] to-[#69932f] rounded-xl p-8 sm:p-10 text-white text-center mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white drop-shadow-md">Ready to Join Share Care Give?</h2>
          <p className="max-w-2xl mx-auto mb-6 text-white drop-shadow-sm">
            Apply to become a Share Care Give partner and create sustainable funding for your non-profit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-[#00304f] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Apply for Share Care Give
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </button>
            <Link 
              to="/swipe-it-forward"
              className="inline-flex justify-center items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md shadow-md text-white bg-transparent hover:bg-white hover:text-[#00304f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              Learn About Swipe It Forward
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
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
      
      {/* Footer */}
      <Footer />
      
      {/* Script for form embed */}
      <script src="https://link.msgsndr.com/js/form_embed.js"></script>
    </div>
  );
}