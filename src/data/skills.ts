export interface Skill {
  name: string
  level: number // 0-100
  icon?: string
  years?: number
}

export interface SkillCategory {
  name: string
  icon: string
  color: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: '🎨',
    color: 'from-blue-500/20 to-cyan-500/20',
    description: 'Building pixel-perfect, responsive user interfaces',
    skills: [
      { name: 'React',       level: 90, years: 3 },
      { name: 'Next.js',     level: 80, years: 2 },
      { name: 'TypeScript',  level: 85, years: 3 },
      { name: 'JavaScript',  level: 90, years: 4 },
      { name: 'Tailwind CSS',level: 95, years: 3 },
      { name: 'HTML & CSS',  level: 95, years: 4 },
      { name: 'Framer Motion',level: 75, years: 1 },
      { name: 'Redux',       level: 70, years: 2 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    color: 'from-green-500/20 to-emerald-500/20',
    description: 'Crafting robust APIs and server-side architecture',
    skills: [
      { name: 'Node.js',        level: 85, years: 3 },
      { name: 'Express.js',     level: 85, years: 3 },
      { name: 'ASP.NET Core',   level: 80, years: 2 },
      { name: 'C#',             level: 78, years: 2 },
      { name: 'Python',         level: 65, years: 1 },
      { name: 'REST APIs',      level: 90, years: 3 },
      { name: 'GraphQL',        level: 60, years: 1 },
      { name: 'WebSocket',      level: 70, years: 2 },
    ],
  },
  {
    name: 'Database',
    icon: '🗄️',
    color: 'from-purple-500/20 to-pink-500/20',
    description: 'Designing scalable data models and storage solutions',
    skills: [
      { name: 'PostgreSQL',      level: 82, years: 3 },
      { name: 'MongoDB',         level: 85, years: 3 },
      { name: 'SQL Server',      level: 78, years: 2 },
      { name: 'MySQL',           level: 75, years: 2 },
      { name: 'Redis',           level: 65, years: 1 },
      { name: 'Prisma ORM',      level: 80, years: 2 },
      { name: 'Entity Framework',level: 75, years: 2 },
      { name: 'Firebase',        level: 70, years: 2 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    color: 'from-orange-500/20 to-amber-500/20',
    description: 'Deploying, scaling, and managing cloud infrastructure',
    skills: [
      { name: 'AWS',        level: 65, years: 1 },
      { name: 'Docker',     level: 70, years: 2 },
      { name: 'Git & GitHub',level: 90, years: 4 },
      { name: 'CI/CD',      level: 65, years: 1 },
      { name: 'Linux',      level: 70, years: 2 },
      { name: 'Vercel',     level: 85, years: 2 },
      { name: 'Netlify',    level: 80, years: 2 },
      { name: 'Digital Ocean',level: 60, years: 1 },
    ],
  },
  {
    name: 'Tools & Design',
    icon: '🛠️',
    color: 'from-red-500/20 to-rose-500/20',
    description: 'Tools and platforms that power the development workflow',
    skills: [
      { name: 'Figma',      level: 75, years: 2 },
      { name: 'VS Code',    level: 95, years: 4 },
      { name: 'Postman',    level: 88, years: 3 },
      { name: 'Jira',       level: 70, years: 2 },
      { name: 'Notion',     level: 85, years: 3 },
      { name: 'Jest',       level: 65, years: 1 },
      { name: 'Storybook',  level: 55, years: 1 },
      { name: 'Swagger',    level: 70, years: 2 },
    ],
  },
  {
    name: 'Integrations',
    icon: '🔗',
    color: 'from-indigo-500/20 to-blue-500/20',
    description: 'Payment gateways, APIs, and third-party services',
    skills: [
      { name: 'Paystack',    level: 85, years: 2 },
      { name: 'Stripe',      level: 75, years: 2 },
      { name: 'Flutterwave', level: 75, years: 2 },
      { name: 'Cloudinary',  level: 80, years: 2 },
      { name: 'SendGrid',    level: 70, years: 1 },
      { name: 'Twilio',      level: 65, years: 1 },
      { name: 'OpenAI API',  level: 70, years: 1 },
      { name: 'Google Maps', level: 72, years: 2 },
    ],
  },
]

export const coreCompetencies = [
  { label: 'Full-Stack Development', value: 88 },
  { label: 'API Design & Development', value: 90 },
  { label: 'Database Architecture', value: 82 },
  { label: 'UI/UX Implementation', value: 85 },
  { label: 'Problem Solving', value: 92 },
  { label: 'Clean Code & Best Practices', value: 88 },
]

export const softSkills = [
  { icon: '🧠', label: 'Problem Solving' },
  { icon: '🤝', label: 'Collaboration' },
  { icon: '📢', label: 'Communication' },
  { icon: '⏱️', label: 'Time Management' },
  { icon: '🔍', label: 'Attention to Detail' },
  { icon: '📈', label: 'Continuous Learning' },
  { icon: '🎯', label: 'Goal-Oriented' },
  { icon: '🌍', label: 'Cultural Awareness' },
]