# Share Care Give

## Overview

Share Care Give is a modern web application that creates sustainable funding for non-profits through the "Swipe It Forward" program. The platform connects local businesses with non-profit organizations by redirecting credit card processing fees to support community causes at no additional cost to businesses. The application features an interactive map showing communities where the program is active, fundraising meters tracking progress, and comprehensive information about both the Share Care Give non-profit program and the Swipe It Forward business program.

## Recent Changes (September 12, 2025)

### Major Design and Content Overhaul
- **Simplified hero messaging** - Reduced copy to one clear value proposition: "Turn payment processing fees into sustainable funding"
- **Moved interactive map to prominent position** - Map now appears early on the page for immediate visual impact
- **Streamlined content sections** - Applied "one concept per section" rule throughout
- **Removed information overload** - Eliminated emojis, walls of text, and redundant explanations
- **Improved visual hierarchy** - Cleaner layout with better spacing and simpler design elements
- **Rewrote all copy** - Shorter, punchier, benefit-focused messaging throughout
- **Replaced jQuery map with Google Maps** - Clean, modern implementation with proper API key management through Replit secrets

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18 with TypeScript** - Modern component-based architecture using functional components and hooks
- **Client-side routing** - React Router DOM for navigation between Share Care Give, Swipe It Forward, Community, and Admin pages
- **Component-driven design** - Reusable components for buttons, forms, maps, carousels, and testimonials
- **Responsive design** - TailwindCSS for mobile-first styling with custom CSS for animations and specialized components
- **State management** - Local React state with hooks, no external state management library

### Styling and UI
- **TailwindCSS** - Utility-first CSS framework for rapid styling
- **Custom CSS modules** - Specialized stylesheets for animations, carousels, video components, and fundraising meters
- **CSS variables** - Centralized design tokens for colors, shadows, and transitions
- **Responsive breakpoints** - Mobile-first approach with tablet and desktop optimizations

### Map Integration
- **Google Maps implementation** - Modern, clean Google Maps integration with custom markers and info windows
- **Interactive markers** - Click-responsive markers with bounce animations and detailed location cards
- **Location visualization** - Shows Arkansas and Texas as initial pilot communities with expandable details
- **Proper API key management** - Google Maps API key stored securely in Replit secrets (VITE_GOOGLE_MAPS_API_KEY)

### Data Architecture
- **TypeScript interfaces** - Strongly typed data models for Location, NonProfit, Business, and Testimonial entities
- **Mock data layer** - Static data files for testimonials, FAQs, and fundraising metrics during development
- **API-ready structure** - Components designed to consume data from REST endpoints

### Media and Content
- **Video integration** - Embedded video players with popups for promotional content
- **Image optimization** - Lazy loading for images and maps to improve performance
- **Static assets** - Public directory structure for images, icons, and third-party plugins

### Build and Development
- **Vite build system** - Fast development server with hot module replacement
- **ESLint configuration** - Code quality enforcement with React and TypeScript rules
- **PostCSS pipeline** - Autoprefixer and TailwindCSS processing
- **TypeScript compilation** - Strict type checking with modern ES2020 target

## External Dependencies

### Core Framework
- **React 18.3.1** - Component library with React DOM for rendering
- **TypeScript 5.5.3** - Type safety and enhanced developer experience
- **React Router DOM 6.22.3** - Client-side routing and navigation

### Styling and UI
- **TailwindCSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Modern icon library for UI elements
- **PostCSS 8.4.35** - CSS processing pipeline
- **Autoprefixer 10.4.18** - CSS vendor prefix automation

### Map and Visualization
- **react-simple-maps 3.0.0** - SVG-based map components for geographic data
- **d3-geo 3.1.1** - Geographic projections and path generation
- **us-atlas 3.0.1** - US geographic data for map rendering
- **Google Maps API** - Optional integration for interactive maps (API key required)

### Development Tools
- **Vite 5.4.2** - Build tool and development server
- **ESLint 9.9.1** - Code linting with React hooks and TypeScript support
- **Nodemon 3.1.10** - Development server auto-restart for backend changes

### Backend Services
- **Express 5.1.0** - Node.js web server for API endpoints
- **CORS 2.8.5** - Cross-origin resource sharing middleware
- **dotenv 17.2.1** - Environment variable management

### Third-party Integrations
- **Activ'Map jQuery plugin** - Alternative mapping solution with location search capabilities
- **Font Awesome** - Icon library for enhanced UI elements
- **Google Fonts** - Web typography (Montserrat font family)
- **Bootstrap 3** - Optional CSS framework for legacy map components

### Planned Integrations
- **Calendly** - Appointment scheduling for business consultations
- **Authentication system** - Admin panel login functionality
- **Payment processing APIs** - Integration with credit card processing partners
- **Analytics tracking** - User behavior and conversion monitoring