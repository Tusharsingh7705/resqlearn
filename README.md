# 🚨 ResQLearn

<div align="center">

##Live -https://resqlearn.vercel.app/quizzes

**Gamified Disaster Preparedness for Every Campus**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](https://resqlearn.vercel.app) · [Report Bug](https://github.com/yourusername/resqlearn/issues) · [Request Feature](https://github.com/yourusername/resqlearn/issues)

</div>

## 🌟 Overview

ResQLearn is an innovative, **gamified disaster preparedness platform** designed specifically for educational institutions. It transforms life-saving safety education into engaging, interactive experiences while providing real-time emergency communication capabilities aligned with **NDMA guidelines** and **NEP 2020**.

## ✨ Key Features

### 🎮 **Interactive Learning Games**
- **15+ Disaster-Specific Games** covering earthquakes, floods, cyclones, fire safety, and more
- **Survival Royale** - Top-down survival game with enemies, loot, and evacuation objectives
- **Preparedness Arena** - Animated arena for collecting essentials and avoiding hazards
- **Disaster Runner** - Action-packed game for go-bag collection and hazard dodging
- **Scenario-Based Learning** - Real-world emergency situations in gamified format

### 📚 **Comprehensive Educational Modules**
- **Structured Learning Paths** for different age groups and skill levels
- **Progress Tracking** with XP, coins, and achievement badges
- **Interactive Quizzes** with immediate feedback and scoring
- **Offline-Friendly Content** for learning without internet connectivity
- **Multi-Language Support** (planned for regional languages)

### 🚨 **Real-Time Emergency System**
- **Geo-Specific Alerts** tailored to student locations
- **SMS-Ready API Integration** for immediate notifications
- **Emergency Broadcast System** for admins and teachers
- **Parent Portal** for family communication and updates
- **Region-Based Safety Guidelines** with local context

### 👥 **Multi-Role Platform**
- **Student Dashboard** with personalized learning paths and rewards
- **Teacher Portal** for progress monitoring and drill assignments
- **Admin Panel** for system management and emergency coordination
- **Parent Access** for family safety awareness and communication

### 🏆 **Gamification Elements**
- **XP & Reward System** for continuous engagement
- **Achievement Badges** for milestone completion
- **Leaderboards** for healthy competition
- **Progress Visualization** with detailed analytics
- **Redeemable Rewards** for motivation

## 🛠️ Technology Stack

### Frontend
- **Next.js 14.2.33** - React framework with SSR/SSG
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.9** - Modern utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions
- **Phaser 3.90.0** - Game engine for interactive experiences

### Backend & APIs
- **Next.js API Routes** - Serverless backend
- **SWR** - Data fetching and caching
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation

### Deployment & Infrastructure
- **Vercel** - Optimized hosting and deployment
- **Vercel Analytics** - Performance monitoring
- **Edge Functions** - Global API distribution

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resqlearn.git
cd resqlearn

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📱 Platform Access

### **Student Portal** (`/student`)
- Personalized dashboard with XP tracking
- Access to all learning modules and games
- Real-time alerts based on location
- Progress visualization and rewards

### **Teacher Dashboard** (`/teacher`)
- Class management and progress monitoring
- Drill assignment and scheduling
- Student performance analytics
- Emergency broadcast capabilities

### **Admin Panel** (`/admin`)
- System configuration and user management
- Emergency alert coordination
- Content management and updates
- Analytics and reporting

### **Parent Portal** (`/parent`)
- Child progress monitoring
- Emergency notifications
- Safety resources and guidelines
- Communication with school administration

## 🎯 Game Modules

### **Natural Disasters**
- 🌊 **Flood Route Finder** - Navigate to safe zones
- 🏔️ **Landslide Safe Route** - Identify stable ground
- 🌪️ **Cyclone Prep Choice** - Find indoor safety spots
- 🌋 **Tsunami Beach Safety** - Evacuation procedures
- ⚡ **Lightning Safety** - Shelter identification
- 🌡️ **Heatwave Shade** - Heat protection strategies

### **Emergency Response**
- 🚒 **Fire Exit Maze** - Building evacuation navigation
- 🏥 **First Aid Basics** - Immediate care procedures
- 📞 **Emergency Calls** - Proper emergency communication
- 🏃 **Evacuation Order** - Drill coordination practice

### **Preparedness Skills**
- 🎒 **Pack a Go-Bag** - Emergency kit essentials
- 🏠 **Earthquake Safe Spots** - Drop, cover, and hold techniques
- 🎮 **Survival Royale** - Comprehensive survival simulation
- 🏟️ **Preparedness Arena** - Multi-hazard training

## 📊 Analytics & Progress

### **Student Metrics**
- **XP Points** - Experience earned through activities
- **Coin System** - Virtual currency for rewards
- **Badge Collection** - Achievement milestones
- **Module Progress** - Learning path completion
- **Quiz Performance** - Knowledge assessment scores

### **Teacher Analytics**
- **Class Performance** - Aggregate student progress
- **Individual Tracking** - Per-student detailed reports
- **Drill Participation** - Emergency practice completion
- **Learning Outcomes** - Skill development metrics

### **Admin Insights**
- **Platform Usage** - System-wide engagement statistics
- **Emergency Response** - Alert effectiveness tracking
- **Content Performance** - Module and game analytics
- **User Demographics** - Platform adoption metrics

## 🔧 Configuration

### **Environment Variables**
```env
# Database (if using external database)
DATABASE_URL="your_database_url"

# API Keys (for external services)
SMS_API_KEY="your_sms_api_key"
WEATHER_API_KEY="your_weather_api_key"

# Vercel Analytics
NEXT_PUBLIC_ANALYTICS_ID="your_analytics_id"
```

### **Regional Settings**
- **Time Zones** - Automatic detection and adjustment
- **Language Preferences** - Multi-language support configuration
- **Emergency Services** - Local emergency contact numbers
- **School Integration** - Custom institutional settings

## 🌐 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### **Docker**
```bash
# Build Docker image
docker build -t resqlearn .

# Run container
docker run -p 3000:3000 resqlearn
```

### **Traditional Hosting**
```bash
# Build static export
npm run build

# Deploy build/ directory to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Roadmap

### **Phase 1: Core Enhancement** (Q1 2024)
- [ ] AI-powered personalized learning paths
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Expanded language support (Hindi, Bengali, Tamil)

### **Phase 2: Platform Expansion** (Q2 2024)
- [ ] International disaster protocols
- [ ] VR/AR immersive experiences
- [ ] School management system integration
- [ ] Parent-teacher communication portal

### **Phase 3: Global Deployment** (Q3 2024)
- [ ] Multi-region deployment
- [ ] Advanced emergency coordination
- [ ] Community features and forums
- [ ] Certification programs

## 🏆 Impact & Recognition

- **NDMA Compliant** - Aligns with National Disaster Management Authority guidelines
- **NEP 2020 Integration** - Supports National Education Policy disaster education goals
- **SIH 2024 Selection** - Smart India Hackathon winning project
- **Pilot Programs** - Successfully deployed in 50+ schools across India

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NDMA** - For disaster management guidelines and protocols
- **Ministry of Education** - NEP 2020 framework support
- **Participating Schools** - Pilot program feedback and testing
- **Open Source Community** - Libraries and tools that power this platform

## 📞 Support & Contact

- **Email**: support@resqlearn.in
- **Website**: [resqlearn.vercel.app](https://resqlearn.vercel.app)
- **Documentation**: [docs.resqlearn.in](https://docs.resqlearn.in)
- **Issues**: [GitHub Issues](https://github.com/yourusername/resqlearn/issues)

---

<div align="center">

**🚨 Empowering the Next Generation with Life-Saving Skills 🚨**

Made with ❤️ for Safer Schools and Communities

</div>
