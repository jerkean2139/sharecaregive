import { VideoHero } from '../components/VideoHero';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { USAMap } from '../components/USAMap';
import { Footer } from '../components/Footer';
import { CalendarPopup } from '../components/CalendarPopup';
import { SequentialSteps } from '../components/SequentialSteps';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { LazyLoad } from '../components/LazyLoad';
import { Button } from '../components/Button';
import { useRef, useState } from 'react';
import { testimonials } from '../data/testimonials';
import { businessFAQs } from '../data/faqs';
import type { Location } from '../types';
import '../components/VideoContainer.css';
import '../styles/variables.css';

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
    title: "Business Partners with Share Care Give",
    description: "Local businesses sign up to redirect a portion of their credit card processing fees."
  },
  {
    number: 2,
    title: "Fees Are Redirected",
    description: "Instead of going to banks, fees go to local non-profits at no extra cost to the business."
  },
  {
    number: 3,
    title: "Community Benefits",
    description: "Non-profits receive sustainable funding and businesses strengthen community ties."
  }
];

export function SwipeItForward() {
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  const handleLocationClick = (location: Location) => {
    navigate(`/community/${location.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <VideoHero 
        pageName="swipe-it-forward" 
        onBookCall={() => setIsCalendarOpen(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-[#69932f] to-[#00304f] bg-clip-text text-transparent animate-fadeIn pb-1">
          Strengthening Communities Together
        </h2>

        {/* Two Column Section */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 items-start animate-slideUp">
          {/* Left Column */}
          <div className="space-y-4 bg-gray-50 p-6 sm:p-8 rounded-xl border-2 border-[#69932f] shadow-lg hover-lift">
            <h3 className="text-xl sm:text-2xl font-bold text-[#69932f]">
              For Non-Profits: Introducing Share Care Give
            </h3>
            <p className="text-gray-700">
              Share Care Give creates sustainable funding for non-profits by redirecting credit card processing fees that would otherwise go to banks.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#69932f] mt-1 mr-2 flex-shrink-0" />
                <span>Sustainable monthly funding without additional fundraising</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#69932f] mt-1 mr-2 flex-shrink-0" />
                <span>Build stronger relationships with local businesses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#69932f] mt-1 mr-2 flex-shrink-0" />
                <span>Increase community awareness and support</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button 
                as="link" 
                to="/share-care-give" 
                variant="secondary" 
                icon={<ArrowRight className="h-5 w-5" />}
              >
                Learn About Share Care Give
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 bg-gray-50 p-6 sm:p-8 rounded-xl border-2 border-[#00304f] shadow-lg hover-lift">
            <h3 className="text-xl sm:text-2xl font-bold text-[#00304f]">
              For Businesses: Swipe It Forward
            </h3>
            <p className="text-gray-700">
              Redirect your credit card processing fees to support local non-profits at zero additional cost to your business.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00304f] mt-1 mr-2 flex-shrink-0" />
                <span>Support your community without increasing expenses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00304f] mt-1 mr-2 flex-shrink-0" />
                <span>Enhance your brand's community reputation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#00304f] mt-1 mr-2 flex-shrink-0" />
                <span>Attract customers who value community support</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button 
                onClick={() => setIsCalendarOpen(true)} 
                variant="primary" 
                icon={<ArrowRight className="h-5 w-5" />}
              >
                Schedule Your Free Assessment
              </Button>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div ref={videoSectionRef} id="main-video-section" className="mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#00304f] mb-4">See How Swipe It Forward Works</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Watch how businesses can redirect credit card processing fees to support local non-profits without any additional cost.
            </p>
          </div>
          <div className="video-container">
            <iframe 
              src="https://storage.googleapis.com/msgsndr/8XkoyELbiXSbGW3Km2v9/media/673e3d6205ed2422a685fbb1.mp4" 
              className="video-iframe" 
              allowFullScreen
              title="Swipe It Forward Explanation"
            ></iframe>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-12 sm:mb-16 animate-slideUp">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00304f] mb-8">
            How Share Care Give Works with Swipe It Forward
          </h2>
          <div className="relative">
            <SequentialSteps steps={howItWorksSteps} theme="green" />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-12 sm:mb-16">
          <LazyLoad>
            <Testimonials testimonials={testimonials} />
          </LazyLoad>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 sm:mb-16">
          <LazyLoad>
            <FAQ title="Frequently Asked Questions for Businesses" faqs={businessFAQs} />
          </LazyLoad>
        </div>

        {/* Map Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#00304f] mb-4">
            Communities We're Impacting
          </h2>
          <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
            Explore the communities where Share Care Give is making a difference through the Swipe It Forward program.
          </p>
          <LazyLoad>
            <div className="aspect-w-16 aspect-h-9 bg-white rounded-xl shadow-lg overflow-hidden">
              <USAMap 
                locations={mockLocations}
                onLocationClick={handleLocationClick}
              />
            </div>
          </LazyLoad>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#69932f] to-[#00304f] rounded-xl p-8 sm:p-10 text-white text-center animate-fadeIn">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Join the Swipe It Forward movement and help create sustainable funding for non-profits in your community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => setIsCalendarOpen(true)} 
              variant="outline" 
              className="bg-white text-[#00304f] hover:bg-gray-100 border-white"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Schedule Your Free Assessment
            </Button>
            <Button 
              as="link" 
              to="/share-care-give" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Learn About Share Care Give
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Popup */}
      <CalendarPopup 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
        embedCode="<iframe src='https://api.leadconnectorhq.com/widget/booking/QHcZr05tUVGvUwxpjHWJ' style='width: 100%;border:none;overflow: hidden;' scrolling='no' id='QHcZr05tUVGvUwxpjHWJ_1745369752474'></iframe><script src='https://link.msgsndr.com/js/form_embed.js' type='text/javascript'></script>"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}