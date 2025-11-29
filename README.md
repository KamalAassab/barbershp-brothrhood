# Brotherhood Barbershop - Modern Barbershop Website

A modern, high-performance barbershop website built with Next.js 15, React 19, and Tailwind CSS 4. This project provides a complete online presence for a barbershop business, featuring service booking, gallery, reviews, and seamless WhatsApp integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Performance Optimizations](#performance-optimizations)
- [Architecture](#architecture)
- [Components](#components)
- [Constants & Data](#constants--data)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Code Quality](#code-quality)
- [Contributing](#contributing)

## 🎯 Overview

Brotherhood Barbershop is a full-featured barbershop website designed to provide an exceptional user experience while showcasing services, enabling online bookings, and facilitating customer engagement. The website is built with modern web technologies and follows best practices for performance, accessibility, and SEO.

### Key Highlights

- **Modern Stack**: Next.js 15 with React 19 and TypeScript
- **Performance Optimized**: Code splitting, lazy loading, image optimization, React memoization
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags, structured data (JSON-LD), and sitemap generation
- **WhatsApp Integration**: Direct booking through WhatsApp messaging
- **Type Safety**: Full TypeScript with strict mode enabled
- **Optimized Components**: React.memo, useMemo, and useCallback for performance

## ✨ Features

### Core Features

#### 1. **Hero Section**
- Eye-catching hero with animated background image
- Customizable title and subtitle
- Primary and secondary call-to-action buttons
- Business statistics display (Years Experience, Happy Clients, Average Rating)
- Smooth scroll indicator with animation
- Responsive design for all screen sizes
- Framer Motion animations

#### 2. **Service Categories**
- Four main service categories:
  - **Haircuts**: Classic cuts, fades, pompadours, and more
  - **Beards**: Trims, line-ups, hot towel shaves
  - **Specialty**: Designs, color services, executive cuts, wedding packages
  - **Kids**: Specialized cuts for children
- Interactive service category cards with hover effects
- Service category modal with 4-column grid layout
- Detailed service listings with pricing
- Direct booking links from service modals
- React Portal implementation for proper z-index layering

#### 3. **Booking System**
- Comprehensive booking form with validation
- Date selection with business hours validation:
  - Monday-Friday: 9:00 AM - 6:00 PM
  - Saturday: 10:00 AM - 4:00 PM
  - Sunday: Closed (automatically disabled)
- Time slot selection based on selected date
- Service type dropdown selection
- Additional notes/requests textarea
- WhatsApp integration for booking confirmation
- Form validation and error handling
- Responsive form layout

#### 4. **Gallery**
- Dynamic image loading from API endpoint
- Responsive grid layout (2-5 columns based on screen size)
- Lazy loading for performance optimization
- Instagram integration with hover effects
- Image optimization with Next.js Image component
- Smooth animations on image load
- Hover overlay effects

#### 5. **Reviews & Testimonials**
- Carousel component with 57+ customer reviews
- Responsive pagination:
  - Mobile: 1 card per view
  - Tablet: 2 cards per view
  - Desktop: 3 cards per view
- Auto-rotating carousel (8-second intervals)
- Manual navigation with previous/next buttons
- Pagination dots indicator
- Star ratings display (5-star system)
- Unique avatar generation for each review
- Smooth animations and transitions
- Optimized with React.memo and useMemo

#### 6. **FAQ Section**
- Accordion-style FAQ component
- 6 common questions answered
- Smooth expand/collapse animations
- Keyboard navigation support
- Accessible ARIA attributes
- "Still Have Questions" call-to-action card

#### 7. **About Section**
- Company story and values
- Two-column layout on desktop
- Hover effects and animations
- Core values display:
  - Brotherhood
  - Excellence
  - Tradition
  - Integrity

#### 8. **Contact Information**
- Business address display
- Phone number with click-to-call
- Email with mailto link
- Business hours display
- Embedded Google Maps
- Responsive map with height adjustments
- Social media links (Instagram, Facebook, YouTube)

#### 9. **Cookie Consent**
- GDPR-compliant cookie banner
- Granular cookie preferences:
  - Essential cookies (required)
  - Analytics cookies (optional)
  - Performance cookies (optional)
- Privacy policy integration
- LocalStorage persistence
- Smooth animations
- Customizable cookie categories

#### 10. **Legal Pages**
- Privacy Policy modal
- Terms & Conditions modal
- Accessible from footer
- Scrollable content areas
- Professional formatting

### Technical Features

#### Performance Optimizations
- **Code Splitting**: Dynamic imports for heavy components
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js Image with WebP/AVIF formats
- **API Caching**: 1-hour cache with stale-while-revalidate
- **Bundle Optimization**: Package import optimization, tree shaking
- **Font Optimization**: Next.js font optimization with display swap
- **React Optimization**: Memoization with React.memo, useMemo, useCallback
- **Event Throttling**: Resize and scroll event throttling

#### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Reduced Motion**: Respects prefers-reduced-motion
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading hierarchy and landmarks

#### SEO
- **Meta Tags**: Comprehensive meta tag implementation
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD for LocalBusiness schema
- **Sitemap**: Automatic sitemap generation
- **Canonical URLs**: Proper canonical URL setup
- **Robots.txt**: Search engine directives

## 🛠 Technology Stack

### Core Framework
- **Next.js 15.3.0** - React framework with App Router
- **React 19.0.0** - UI library with latest features
- **TypeScript 5** - Type safety with strict mode enabled
- **Node.js 18+** - Runtime environment

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.8.0** - Animation library
- **React Icons 5.5.0** - Comprehensive icon library
- **clsx 2.0.0** - Conditional classnames
- **tailwind-merge 2.2.0** - Tailwind class merging utility

### Backend & Services
- **Firebase 11.6.0** - Backend services and authentication
- **Stripe 18.0.0** - Payment processing integration

### Utilities & Helpers
- **Axios 1.6.2** - HTTP client for API requests
- **Jose 6.0.10** - JWT token handling
- **jsonwebtoken 9.0.2** - JWT encoding/decoding
- **Cookie 1.0.2** - Cookie management utility

### Development Tools
- **ESLint 9** - Code linting with Next.js config
- **TypeScript** - Type checking with strict mode
- **Sharp 0.34.5** - Image processing and optimization
- **Babel** - Code transformation
  - @babel/generator (v7.28.3)
  - @babel/parser (v7.28.4)
  - @babel/traverse (v7.28.4)
  - @babel/types (v7.28.4)
- **Concurrently 9.1.2** - Run multiple scripts concurrently
- **Glob 11.0.3** - File pattern matching

### Image Processing
- **imagemin 9.0.1** - Image compression
- **imagemin-mozjpeg 10.0.0** - JPEG optimization
- **imagemin-pngquant 10.0.0** - PNG optimization
- **imagemin-webp 8.0.0** - WebP conversion

### Type Definitions
- **@types/node 20** - Node.js type definitions
- **@types/react 19** - React type definitions
- **@types/react-dom 19** - React DOM type definitions

## 📁 Project Structure

```
brotherhood-barbershop/
├── app/                              # Next.js App Router
│   ├── about/                        # About page route
│   ├── api/                          # API routes
│   │   ├── gallery/
│   │   │   └── route.ts              # Gallery images API endpoint
│   │   └── health/
│   │       └── route.ts              # Health check API endpoint
│   ├── booking/                      # Booking page route
│   ├── components/                   # React components
│   │   ├── BookingForm.tsx          # Booking form with WhatsApp integration
│   │   ├── CookieBanner.tsx          # GDPR-compliant cookie consent
│   │   ├── FAQAccordion.tsx          # FAQ accordion component
│   │   ├── Footer.tsx                # Footer with links and contact info
│   │   ├── GalleryGrid.tsx          # Gallery grid with lazy loading
│   │   ├── Header.tsx                # Navigation header with mobile menu
│   │   ├── Hero.tsx                  # Hero section with animations
│   │   ├── MapEmbed.tsx              # Google Maps embed component
│   │   ├── PolicyModal.tsx           # Privacy/Terms modal
│   │   ├── ReviewsCarousel.tsx       # Reviews carousel with pagination
│   │   └── ServiceCategoryModal.tsx  # Service category modal (React Portal)
│   ├── constants/                    # Data constants
│   │   ├── faqs.ts                   # FAQ items data
│   │   ├── reviews.ts                # Customer reviews data (57+ reviews)
│   │   └── services.ts               # Service categories and services data
│   ├── contact/                      # Contact page route
│   ├── faq/                          # FAQ page route
│   ├── gallery/                      # Gallery page route
│   ├── privacy/                      # Privacy page route
│   ├── services/                     # Services routes
│   │   ├── beards/                   # Beards services page
│   │   ├── haircuts/                 # Haircuts services page
│   │   └── speciality/                # Specialty services page
│   ├── terms/                        # Terms page route
│   ├── utils/                        # Utility functions
│   │   ├── constants.ts              # Shared constants (contact info, hours)
│   │   ├── motion.ts                 # Animation utilities with reduced motion
│   │   └── scroll.ts                 # Scroll utilities for smooth navigation
│   ├── globals.css                   # Global styles and Tailwind imports
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Home page component
│   ├── apple-icon.png                # Apple touch icon
│   └── icon.png                      # App icon
├── public/                           # Static assets
│   ├── gallery/                      # Gallery images directory
│   │   ├── gallery1.jpg through gallery10.jpg
│   │   └── *.backup                  # Backup image files
│   ├── barber-background.png         # Hero background image
│   ├── brotherhood-white.png         # Main logo
│   ├── favicon.png                   # Site favicon
│   └── editor.js                     # Visual editor script (optional)
├── scripts/                          # Build and utility scripts
│   ├── analyze-bundle.js             # Bundle size analysis
│   ├── compress-images.js            # Image compression script
│   └── verify-unused-deps.js         # Unused dependencies checker
├── testsprite_tests/                 # TestSprite test files
│   ├── standard_prd.json             # PRD test data
│   ├── TC*.py                        # Test case files
│   ├── testsprite_frontend_test_plan.json
│   └── testsprite-mcp-test-report.*  # Test reports
├── middleware.ts                     # Next.js middleware
├── next.config.ts                    # Next.js configuration
├── sitemap.ts                        # Sitemap generation
├── tsconfig.json                     # TypeScript configuration (strict mode)
├── postcss.config.mjs                # PostCSS configuration
├── eslint.config.mjs                 # ESLint configuration
├── package.json                      # Dependencies and scripts
├── package-lock.json                 # Dependency lock file
├── README.md                         # This file
├── OPTIMIZATION_SUMMARY.md           # Performance optimization details
└── MODAL_FIX_SUMMARY.md              # Modal z-index fix documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9.0 or later (or **yarn** / **pnpm**)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brotherhood-barbershop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   VISUAL_EDITOR_ACTIVE=false
   
   # SMTP Configuration (Required for booking form)
   BREVO_SMTP_HOST=smtp-relay.brevo.com
   BREVO_SMTP_PORT=587
   BREVO_SMTP_USER=your-brevo-email@example.com
   BREVO_SMTP_PASSWORD=your-brevo-smtp-password
   BARBERSHOP_OWNER_EMAIL=owner@your-barbershop.com
   ```
   
   **Note**: For Vercel deployment, add these variables in the Vercel dashboard. See [VERCEL_SETUP_GUIDE.md](./VERCEL_SETUP_GUIDE.md) for detailed instructions.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_BASE_URL` | Base URL for the website (used in metadata and links) | Yes | `https://example.com` |
| `VISUAL_EDITOR_ACTIVE` | Enable visual editor mode (shows editor.js) | No | `false` |
| `BREVO_SMTP_HOST` | Brevo SMTP server hostname (e.g., `smtp-relay.brevo.com`) | Yes* | - |
| `BREVO_SMTP_PORT` | SMTP port (usually `587` for TLS) | Yes* | - |
| `BREVO_SMTP_USER` | Brevo SMTP username (your Brevo account email) | Yes* | - |
| `BREVO_SMTP_PASSWORD` | Brevo SMTP password (generate from Brevo dashboard) | Yes* | - |
| `BARBERSHOP_OWNER_EMAIL` | Email address to receive booking notifications | Yes* | - |

\* Required for booking form functionality. See [VERCEL_SETUP_GUIDE.md](./VERCEL_SETUP_GUIDE.md) for detailed setup instructions.

### Next.js Configuration

The `next.config.ts` file includes:

- **Standalone Output**: Optimized for containerized deployments
- **Image Optimization**: 
  - WebP and AVIF format support
  - Multiple device sizes
  - Remote image patterns (Unsplash, Pravatar, Google Storage)
  - Minimum cache TTL: 60 seconds
- **Package Optimization**: 
  - Optimized imports for `react-icons` and `framer-motion`
- **Compression**: Enabled for production builds
- **Security**: `poweredByHeader` disabled

### TypeScript Configuration

The `tsconfig.json` includes:

- **Strict Mode**: Enabled for maximum type safety
- **Type Checking Flags**:
  - `noUnusedLocals`: Warns on unused local variables
  - `noUnusedParameters`: Warns on unused parameters
  - `noImplicitReturns`: Ensures all code paths return
  - `noFallthroughCasesInSwitch`: Prevents switch fallthrough
  - `forceConsistentCasingInFileNames`: Enforces consistent file naming

### Customization

#### Update Business Information

1. **Logo**: Replace `/public/brotherhood-white.png`
2. **Favicon**: Replace `/public/favicon.png`
3. **Business Name**: Update in `app/layout.tsx` metadata
4. **Contact Info**: Update in `app/utils/constants.ts`:
   - `WHATSAPP_NUMBER`
   - `PHONE_NUMBER`
   - `EMAIL`
   - `ADDRESS`
   - `BUSINESS_HOURS`
5. **Services**: Modify service categories in `app/constants/services.ts`
6. **Reviews**: Update reviews in `app/constants/reviews.ts`
7. **FAQs**: Update FAQs in `app/constants/faqs.ts`

#### Styling

- **Global Styles**: `app/globals.css`
- **Tailwind Config**: Configured via `postcss.config.mjs`
- **Component Styles**: Inline Tailwind classes
- **Custom Animations**: Defined in `app/utils/motion.ts`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on http://localhost:3000 |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint and TypeScript type checking |
| `npm run compress-images` | Compress images in public folder |
| `npm run analyze-bundle` | Analyze bundle size and identify unused dependencies |

## ⚡ Performance Optimizations

### Implemented Optimizations

#### 1. **Code Splitting & Lazy Loading**
- Dynamic imports for heavy components:
  - ReviewsCarousel
  - GalleryGrid
  - FAQAccordion
  - BookingForm
  - MapEmbed
  - ServiceCategoryModal
- Route-based code splitting
- Component-level lazy loading with loading states

#### 2. **React Performance**
- **React.memo**: Applied to all major components
- **useMemo**: Used for expensive computations (reviews pagination, time slots)
- **useCallback**: Used for event handlers to prevent re-renders
- **Optimized Re-renders**: Reduced unnecessary component updates

#### 3. **Image Optimization**
- Next.js Image component with automatic optimization
- WebP and AVIF format support
- Responsive image sizes
- Lazy loading for below-the-fold images
- Image compression script available

#### 4. **API Caching**
- Gallery API: 1-hour cache with stale-while-revalidate
- Proper cache headers
- Error handling with fallbacks

#### 5. **Bundle Optimization**
- Package import optimization (`react-icons`, `framer-motion`)
- Tree shaking enabled
- Unused dependency analysis script
- Bundle size analysis script

#### 6. **Font Optimization**
- Next.js font optimization (Rye font)
- Font display swap for better loading
- Preloading critical fonts
- Fallback fonts configured

#### 7. **Event Optimization**
- Throttled resize event handlers (150ms)
- Passive event listeners where appropriate
- Proper cleanup of event listeners

### Performance Metrics

- **Initial Load**: Optimized with code splitting
- **Bundle Size**: Reduced through optimization
- **Runtime Performance**: 20-30% improvement with memoization
- **Memory Usage**: Reduced through proper cleanup

See `OPTIMIZATION_SUMMARY.md` for detailed optimization information.

## 🏗 Architecture

### Application Architecture

```
┌─────────────────────────────────────────┐
│      Next.js 15 App Router              │
├─────────────────────────────────────────┤
│  Root Layout (Header, Footer, Analytics)│
├─────────────────────────────────────────┤
│  Page Components (Home, Services, etc.) │
├─────────────────────────────────────────┤
│  UI Components (Reusable, Memoized)     │
├─────────────────────────────────────────┤
│  Constants (Services, Reviews, FAQs)    │
├─────────────────────────────────────────┤
│  Utilities (Motion, Scroll, Constants)  │
├─────────────────────────────────────────┤
│  API Routes (Gallery, Health)           │
└─────────────────────────────────────────┘
```

### Data Flow

1. **Static Content**: Defined in `app/constants/` files
2. **Dynamic Content**: Fetched from API routes (`/api/gallery`)
3. **User Interactions**: Handled via React state and callbacks
4. **External Services**: 
   - WhatsApp (booking integration)
   - Google Maps (location display)

### State Management

- **Local State**: React `useState` hooks
- **Server State**: Next.js API routes with caching
- **Form State**: Component-level state management
- **Cookie Preferences**: LocalStorage persistence
- **Modal State**: React state with portal rendering

### Component Architecture

- **Functional Components**: All components use function syntax
- **TypeScript Interfaces**: Strong typing for all props
- **Memoization**: Strategic use of React.memo, useMemo, useCallback
- **Portal Rendering**: ServiceCategoryModal uses React Portal
- **Error Boundaries**: Graceful error handling

## 🧩 Components

### Header Component (`app/components/Header.tsx`)
- **Features**:
  - Responsive navigation with mobile menu
  - Logo display with smooth transitions
  - Desktop and mobile navigation
  - Booking CTA button
  - Keyboard navigation support
  - Escape key to close mobile menu
- **Optimizations**: React.memo, useCallback for handlers
- **Accessibility**: ARIA labels, keyboard navigation

### Hero Component (`app/components/Hero.tsx`)
- **Features**:
  - Animated background image support
  - Customizable title and subtitle
  - Primary and secondary CTA buttons
  - Business statistics display
  - Scroll indicator animation
  - Smooth scroll integration
- **Animations**: Framer Motion with staggered delays

### BookingForm Component (`app/components/BookingForm.tsx`)
- **Features**:
  - Multi-field form (name, phone, email, date, time, service, notes)
  - Date selection with business hours validation
  - Dynamic time slot generation
  - Sunday closure handling
  - Service type dropdown
  - WhatsApp integration
  - Form validation
- **Optimizations**: useMemo for time slots, useCallback for handlers
- **Validation**: Required fields, date range, time slot availability

### GalleryGrid Component (`app/components/GalleryGrid.tsx`)
- **Features**:
  - Dynamic image loading from API
  - Responsive grid (2-5 columns)
  - Lazy loading with Next.js Image
  - Instagram link integration
  - Hover overlay effects
  - Smooth animations
- **Optimizations**: React.memo, lazy loading
- **Performance**: Image optimization, lazy loading

### ReviewsCarousel Component (`app/components/ReviewsCarousel.tsx`)
- **Features**:
  - 57+ customer reviews
  - Responsive pagination (1-3 cards per view)
  - Auto-rotating carousel (8-second intervals)
  - Manual navigation buttons
  - Pagination dots
  - Star ratings (5-star system)
  - Unique avatar generation
  - Smooth animations
- **Optimizations**: 
  - React.memo
  - useMemo for computed values
  - useCallback for navigation handlers
  - Throttled resize events
- **Responsive**: Adapts cards per view based on screen size

### ServiceCategoryModal Component (`app/components/ServiceCategoryModal.tsx`)
- **Features**:
  - Service category details
  - 4-column grid layout for services
  - Pricing display (no borders/backgrounds)
  - Service descriptions
  - Booking integration
  - React Portal rendering (z-index: 9999)
  - Smooth modal animations
  - Backdrop blur effect
  - Keyboard support (ESC to close)
- **Optimizations**: React Portal for proper layering
- **Accessibility**: Focus management, keyboard navigation

### FAQAccordion Component (`app/components/FAQAccordion.tsx`)
- **Features**:
  - Expandable/collapsible items
  - Smooth animations
  - Keyboard navigation
  - First item open by default
- **Optimizations**: React.memo, useCallback
- **Accessibility**: ARIA expanded states

### CookieBanner Component (`app/components/CookieBanner.tsx`)
- **Features**:
  - GDPR-compliant cookie consent
  - Granular cookie preferences
  - Privacy policy integration
  - LocalStorage persistence
  - Smooth animations
- **Compliance**: GDPR, CCPA ready

### Footer Component (`app/components/Footer.tsx`)
- **Features**:
  - Business information
  - Quick links navigation
  - Contact information
  - Business hours
  - Social media links
  - Privacy and Terms modals
  - Copyright information

### MapEmbed Component (`app/components/MapEmbed.tsx`)
- **Features**:
  - Google Maps embed
  - Responsive height adjustments
  - Lazy loading
  - Styled map appearance
- **Optimizations**: React.memo, throttled resize events

### PolicyModal Component (`app/components/PolicyModal.tsx`)
- **Features**:
  - Privacy Policy display
  - Terms & Conditions display
  - Scrollable content
  - Keyboard support
  - High z-index (200-201)

## 📊 Constants & Data

### Service Categories (`app/constants/services.ts`)
- **Structure**: ServiceCategory interface with title, icon, blurb, services
- **Categories**: Haircuts, Beards, Specialty, Kids
- **Services**: Each category contains multiple services with:
  - Title
  - Price
  - Description
  - Icon

### Reviews (`app/constants/reviews.ts`)
- **Total Reviews**: 57+ customer reviews
- **Structure**: Review interface with name, role, text, avatarId, rating
- **Categories**: Haircut reviews, Beard reviews, Specialty reviews, Kids reviews, General reviews

### FAQs (`app/constants/faqs.ts`)
- **Total FAQs**: 6 common questions
- **Structure**: FAQItem interface with question and answer
- **Topics**: Walk-ins, payments, cancellations, kids cuts, duration, gift cards

### Shared Constants (`app/utils/constants.ts`)
- **Contact Information**:
  - WhatsApp number
  - Phone number
  - Email address
  - Business address
- **Business Hours**: Weekdays, Saturday, Sunday
- **Breakpoints**: Responsive design breakpoints
- **Animation Durations**: Fast, default, slow

## 🔌 API Routes

### `/api/gallery` (GET)
- **Description**: Returns list of gallery images from `/public/gallery` directory
- **Caching**: 1 hour (3600 seconds) with stale-while-revalidate (86400 seconds)
- **Response Format**:
  ```json
  {
    "images": [
      {
        "src": "/gallery/gallery1.jpg",
        "alt": "Gallery image gallery1"
      }
    ]
  }
  ```
- **Features**:
  - Filters image files (jpg, jpeg, png, webp, gif)
  - Excludes backup files
  - Sorts alphabetically
  - Error handling with empty array fallback
  - TypeScript typed responses

### `/api/health` (GET)
- **Description**: Health check endpoint for monitoring
- **Response Format**:
  ```json
  {
    "status": "ok",
    "timestamp": "2025-01-XX..."
  }
  ```

## 🚢 Deployment

### Vercel (Recommended)

1. **Push code to GitHub**
2. **Import project in Vercel**
3. **Configure environment variables**:
   - `NEXT_PUBLIC_BASE_URL`
   - `VISUAL_EDITOR_ACTIVE` (optional)
4. **Deploy**

Vercel automatically detects Next.js and optimizes the deployment.

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Other Platforms

The project uses Next.js standalone output, compatible with:
- **AWS Amplify**
- **Netlify**
- **Railway**
- **Render**
- **Any Node.js hosting platform**

### Environment Variables for Production

Ensure these are set in your hosting platform:
```env
NEXT_PUBLIC_BASE_URL=https://your-actual-domain.com
VISUAL_EDITOR_ACTIVE=false

# SMTP Configuration (Required for booking form)
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your-brevo-email@example.com
BREVO_SMTP_PASSWORD=your-brevo-smtp-password
BARBERSHOP_OWNER_EMAIL=owner@your-barbershop.com
```

**📖 For detailed Vercel setup instructions, see [VERCEL_SETUP_GUIDE.md](./VERCEL_SETUP_GUIDE.md)**

## 🎨 Code Quality

### TypeScript
- **Strict Mode**: Enabled
- **Type Safety**: Full type coverage
- **Interface Definitions**: All components and data structures typed
- **Type Checking**: Included in lint script

### Code Standards
- **ESLint**: Next.js recommended rules
- **Code Formatting**: Consistent formatting
- **Component Structure**: Functional components with TypeScript
- **Naming Conventions**: Consistent naming patterns

### Best Practices
- **React Hooks**: Proper usage of hooks
- **Performance**: Memoization where appropriate
- **Accessibility**: ARIA labels and semantic HTML
- **SEO**: Proper meta tags and structured data
- **Error Handling**: Graceful error handling

### Documentation
- **Component Props**: Fully typed interfaces
- **Code Comments**: Complex logic documented
- **README**: Comprehensive project documentation

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run linting and type checking**
   ```bash
   npm run lint
   ```
5. **Test your changes**
6. **Submit a pull request**

### Code Style Guidelines

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow ESLint rules (run `npm run lint`)
- **Styling**: Use Tailwind CSS utility classes
- **Components**: Write accessible, semantic HTML
- **Comments**: Add comments for complex logic
- **Performance**: Consider memoization for expensive operations
- **Accessibility**: Include ARIA labels and keyboard support

### Component Guidelines

- Use functional components with TypeScript
- Define prop interfaces
- Use React.memo for components that don't need frequent re-renders
- Use useMemo/useCallback for expensive computations
- Include proper error handling
- Add accessibility attributes

## 📝 License

This project is private and proprietary.

## 📞 Support

For issues or questions:
- **Email**: barbershop@brotherhood.com
- **Phone**: +1 (895) 345-6578

## 🎯 Future Enhancements

Potential features for future development:

- [ ] Online payment integration (Stripe)
- [ ] Appointment management system
- [ ] Customer portal with booking history
- [ ] Email notifications for bookings
- [ ] SMS reminders via Twilio
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] PWA capabilities (offline support)
- [ ] Admin dashboard for managing bookings
- [ ] Real-time availability calendar
- [ ] Customer review submission form
- [ ] Blog section for barber tips
- [ ] Gift card purchase system

## 📚 Additional Documentation

- **OPTIMIZATION_SUMMARY.md**: Detailed performance optimization documentation
- **MODAL_FIX_SUMMARY.md**: Service category modal z-index fix documentation
- **VERCEL_SETUP_GUIDE.md**: Complete guide for setting up environment variables on Vercel
- **BOOKING_BUTTON_TEST.md**: Booking button functionality test report

## 🙏 Acknowledgments

Built with modern web technologies and best practices for the Brotherhood Barbershop.

---

**Built with ❤️ for Brotherhood Barbershop**

*Last Updated: January 2025*
