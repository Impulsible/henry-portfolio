export interface Project {
  id: number
  title: string
  description: string
  longDescription?: string
  tech: string[]
  image: string
  color: string
  category: string
  features?: string[]
  challenges?: string[]
  screenshots?: string[]
  liveUrl?: string
  githubUrl?: string
  status?: 'building' | 'completed' | 'planning'
  flag?: string
  year?: string
  type?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Naija Snacks / Logistics',
    description:
      'A comprehensive Nigerian food delivery and logistics platform connecting vendors with customers. Built for the Nigerian market with local payment integration and delivery tracking.',
    longDescription:
      'Naija Snacks is a full-stack food delivery and logistics platform designed from the ground up for the Nigerian market. It addresses unique challenges like local payment preferences, address ambiguity, and network reliability. The platform features a multi-vendor system where food vendors can onboard, manage menus, and track earnings in real time.',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Paystack'],
    image: '🍲',
    color: 'from-green-500/20 to-emerald-500/20',
    category: 'Full-Stack',
    flag: '🇳🇬',
    status: 'planning',
    year: '2026',
    type: 'Web Application',
    screenshots: [
      '/projects/screenshots/1-1.png',
    ],
    features: [
      'Order management system',
      'Real-time delivery tracking',
      'Vendor dashboard with analytics',
      'Nigerian-focused business logic',
      'Paystack payment integration',
      'SMS delivery notifications',
    ],
    challenges: [
      'Handling unreliable network connectivity',
      'Integrating Nigerian payment gateways',
      'Building an accurate address system for Lagos',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Detective Investigation Game',
    description:
      'Interactive investigation system with clues, suspects, evidence, branching decisions, and scoring.',
    longDescription:
      'An immersive browser-based detective game that puts players in the shoes of a seasoned investigator. Players examine crime scenes, interrogate suspects, and piece together evidence to solve increasingly complex mysteries. Built with a custom narrative engine that supports branching storylines and dynamic suspect behavior.',
    tech: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server', 'SignalR'],
    image: '🕵️',
    color: 'from-purple-500/20 to-pink-500/20',
    category: 'Full-Stack',
    status: 'planning',
    year: '2026',
    type: 'Interactive Game',
    screenshots: [
      '/projects/screenshots/2-1.png',
    ],
    features: [
      'Clue discovery system',
      'Suspect interrogation engine',
      'Evidence analysis and linking',
      'Branching narratives with choices',
      'Scoring & achievement system',
      'Real-time progress tracking',
    ],
    challenges: [
      'Designing a flexible narrative engine',
      'Balancing game difficulty curve',
      'Real-time state synchronization',
    ],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'SmartBiz Business Suite',
    description:
      'A comprehensive inventory management system with real-time stock tracking and analytics.',
    longDescription:
      'Enterprise-grade inventory management built for SMBs that need real-time visibility into their stock levels across multiple locations. Features barcode scanning via mobile camera, automated purchase order generation when stock falls below threshold, and a powerful analytics dashboard with demand forecasting.',
    tech: ['React', 'CSS3', 'Node.js', 'MongoDB', 'MVC', 'Render'],
    image: '📦',
    color: 'from-cyan-500/20 to-blue-500/20',
    category: 'Full-Stack',
    status: 'completed',
    year: '2026',
    type: 'Enterprise Tool',
    screenshots: [
      '/projects/screenshots/3-1.png',
    ],
    features: [
      'Real-time inventory tracking',
      'Supplier management',
      'Purchase order processing',
      'Stock alerts and notifications',
      'Analytics and reporting dashboard',
      'Barcode scanning integration',
      'Multi-warehouse support',
      'Inventory forecasting',
    ],
    challenges: [
      'Real-time sync across multiple warehouses',
      'Handling high-frequency stock updates with Redis',
      'Designing an intuitive barcode scanning UX',
    ],
    liveUrl: 'https://smartbiz-api-nfxu.onrender.com/',
    githubUrl: 'https://github.com/dandrichest/smartbiz',
  },
  {
    id: 4,
    title: 'Pulse — AI Collaboration Platform',
    description:
      'AI-powered real-time collaboration platform combining messaging, workspaces, and task tracking.',
    longDescription:
      'Pulse redefines team collaboration by weaving AI intelligence directly into the workflow. Teams can create workspaces, communicate in threaded channels, manage tasks with AI-powered prioritization, and get contextual suggestions based on project activity — all in one unified interface.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'WebSocket', 'AI/ML', 'MongoDB', 'Vercel', 'Tailwind CSS'],
    image: '⚡',
    color: 'from-blue-500/20 to-cyan-500/20',
    category: 'Full-Stack',
    status: 'building',
    year: '2026',
    type: 'SaaS Platform',
    screenshots: [
      '/projects/screenshots/4-1.png',
    ],
    features: [
      'Real-time messaging with threads',
      'Workspace management and permissions',
      'Task tracking with AI prioritization',
      'Team presence indicators',
      'AI-powered intelligent assistance',
      'File sharing and collaboration',
    ],
    challenges: [
      'WebSocket scalability at high concurrency',
      'Integrating AI without disrupting UX',
      'Building a permissions system flexible enough for any team',
    ],
    liveUrl: 'https://pulse-ai-two-rust.vercel.app/',
    githubUrl: 'https://github.com/Impulsible/pulse-ai',
  },
  {
    id: 5,
    title: 'SmartBudget',
    description:
      'Personal finance management platform with budgeting, expense tracking, and financial insights.',
    longDescription:
      'SmartBudget helps individuals take control of their finances with an intuitive budgeting system, automated expense categorization, and clear visual insights into spending habits. Users can set savings goals, track progress, and receive personalized tips for improving their financial health.',
    tech: ['C#', 'Blazor', 'ASP.NET Core', 'Render', 'Chart.js'],
    image: '💰',
    color: 'from-yellow-500/20 to-amber-500/20',
    category: 'Full-Stack',
    status: 'completed',
    year: '2026',
    type: 'Web Application',
    screenshots: [
      '/projects/screenshots/5-1.png',
    ],
    features: [
      'Budget creation & tracking',
      'Expense categorization',
      'Financial insights and analytics',
      'Goal setting and progress',
      'Report generation',
    ],
    challenges: [
      'Accurately categorizing diverse expense types',
      'Designing charts that are readable on mobile',
      'Keeping financial data secure end-to-end',
    ],
    liveUrl: 'https://smartbudget-tracker-lohp.onrender.com/',
    githubUrl: 'https://github.com/Impulsible/SmartBudget-Tracker',
  },
  {
    id: 6,
    title: 'School Management Portal',
    description:
      'Complete platform for managing students, courses, results, and school administration.',
    longDescription:
      'A fully-featured school management system that digitizes the administrative workflows of educational institutions. From student enrollment and course assignment to grade tracking, transcript generation, and parent communication — everything lives in one centralized platform.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Supabase', 'PostgreSQL'],
    image: '🎓',
    color: 'from-indigo-500/20 to-blue-500/20',
    category: 'Full-Stack',
    status: 'completed',
    year: '2026',
    type: 'Enterprise Portal',
    screenshots: [
      '/projects/screenshots/6-1.png',
    ],
    features: [
      'Student enrollment system',
      'Course management',
      'Grade tracking and report cards',
      'Administration dashboard',
      'CBT integration for exams',
    ],
    challenges: [
      'Modeling complex academic structures in a relational DB',
      'Role-based access for students, teachers, and admins',
      'Generating printable report cards dynamically',
    ],
    liveUrl: 'https://vincollins-portal.vercel.app/',
    githubUrl: 'https://github.com/Impulsible/vincollins-portal',
  },
  {
    id: 7,
    title: 'Handmaiden Craft Marketplace',
    description:
      'Digital marketplace connecting customers with artisans and handmade products.',
    longDescription:
      'Handmaiden Craft is an artisan-first marketplace that gives Nigerian craftspeople a beautiful digital storefront. Artisans can showcase portfolios, list products with rich media, and manage orders — while customers enjoy a curated shopping experience with verified reviews and seamless checkout via Paystack.',
    tech: ['Nextjs', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Paystack', 'Vercel'],
    image: '🎨',
    color: 'from-amber-500/20 to-orange-500/20',
    category: 'Full-Stack',
    status: 'completed',
    year: '2025',
    type: 'Marketplace',
    screenshots: [
      '/projects/screenshots/7-1.png',
    ],
    features: [
      'Product listings and search',
      'Artisan profiles and portfolios',
      'Shopping cart and checkout',
      'Order management',
      'Customer reviews and ratings',
    ],
    challenges: [
      'Building a fair search ranking algorithm',
      'Handling Paystack Connect for multi-vendor payouts',
      'Optimizing image-heavy pages for slow connections',
    ],
    liveUrl: 'https://handcrafted-haven-gold.vercel.app/',
    githubUrl: 'https://github.com/Impulsible/handcrafted-haven',
  },
  {
    id: 8,
    title: 'Payzix — Financial OS & Payment Infrastructure',
    description:
      'A full-stack financial operating system with transaction ledger, payment infrastructure, business management tools, financial analytics, AI-powered intelligence, fraud-risk simulation, and a developer API sandbox.',
    longDescription:
      'Payzix is not just a payment app — it\'s a complete financial operating system built for the modern economy. It combines a robust transaction ledger, multi-rail payment infrastructure, business management tools, real-time financial analytics, AI-driven intelligence, fraud-risk simulation, and a fully-featured developer API sandbox — all in one unified platform. Designed to serve businesses, fintechs, and developers, Payzix redefines what a financial platform can be.',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'Kafka', 'AI/ML', 'Paystack', 'WebSocket'],
    image: '💳',
    color: 'from-emerald-500/20 to-teal-500/20',
    category: 'Full-Stack',
    status: 'planning',
    year: '2026',
    type: 'Financial Operating System',
    screenshots: [
      '/projects/screenshots/8-1.png',
    ],
    features: [
      '✅ Transaction Ledger — Immutable, double-entry accounting with real-time reconciliation',
      '✅ Payment Infrastructure — Multi-rail support (cards, bank transfers, USSD, QR)',
      '✅ Business Management — Invoicing, expense tracking, multi-entity support',
      '✅ Financial Analytics — Real-time dashboards, cash flow forecasting, spend insights',
      '✅ AI-Powered Intelligence — Smart categorization, anomaly detection, predictive insights',
      '✅ Fraud-Risk Simulation — Simulate fraud scenarios, rule engine, risk scoring',
      '✅ Developer API Sandbox — Simulate transactions, webhooks, and integration testing',
    ],
    challenges: [
      'Designing an immutable ledger that scales to millions of transactions',
      'Building a fraud simulation engine that mimics real-world attack patterns',
      'Orchestrating multi-rail payment flows with idempotency and retry logic',
      'Creating an API sandbox that is both powerful and intuitive for developers',
    ],
    liveUrl: '#',
    githubUrl: '#',
    flag: '🚀',
  },
]