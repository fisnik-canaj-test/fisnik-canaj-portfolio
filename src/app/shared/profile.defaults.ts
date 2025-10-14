import { Profile } from './profile.model';

export const FALLBACK_PROFILE: Profile = {
  name: 'Fisnik Canaj',
  role: 'Frontend Developer',
  summary:
    'Front-end Developer with 8+ years of experience specialising in Angular and modern JS tooling. I design clean architectures, optimise performance, and deliver reliable UX for teams shipping at pace.',
  about:
    'Beyond contract roles I have built WordPress news portals, multilingual e-commerce apps, and R&D concepts like a 3D chess DApp. I enjoy taking ownership from architecture to polish and partnering closely with designers and product leaders.',
  location: 'Pristina, Kosovo',
  email: 'canajfisnik@gmail.com',
  avatar: 'assets/my-face.jpg',
  links: {
    github: 'https://github.com/fisnikcanaj1',
    portfolio: 'https://snikcanaj1.github.io',
    linkedin: 'https://www.linkedin.com/in/fisnik-canaj-angular-4b75a8157'
  },
  projects: [
    {
      name: 'Angular Admin UI',
      desc: 'Design system-driven dashboard experience with reusable tables, forms, and charts.',
      tags: ['Angular', 'Signals', 'Design System']
    },
    {
      name: 'E-commerce Checkout',
      desc: 'Optimised Stripe checkout flow with localisation, saved payments, and analytics hooks.',
      tags: ['Stripe', 'UX', 'Analytics']
    },
    {
      name: 'Automation Portal',
      desc: 'Node & Puppeteer powered publishing automations for a content-heavy newsroom.',
      tags: ['Automation', 'Node', 'WordPress']
    },
    {
      name: 'Mobile Betting Widgets',
      desc: 'Real-time betting components with RxJS and WebSockets for live odds experiences.',
      tags: ['RxJS', 'Realtime', 'UI']
    }
  ],
  experience: [
    {
      company: 'Ancient Gaming',
      title: 'Frontend Developer',
      period: '2023 – Present',
      bullets: [
        'CSGORoll Angular 18 upgrade and wagering flows with GraphQL/Apollo.',
        'Shipped wishlist and favourites journeys that improved engagement metrics.'
      ]
    },
    {
      company: 'Solution25',
      title: 'Frontend/Angular Developer',
      period: '2022 – 2023',
      bullets: [
        'Extended Volvo Cars checkout journeys for regional markets.',
        'Brought NX-driven upgrades and Cypress coverage to shared libraries.'
      ]
    }
  ],
  education: [
    {
      school: 'University for Business and Technology (UBT)',
      degree: 'BSc, Computer Science and Engineering',
      period: '2014',
      location: 'Pristina, Kosovo',
      url: 'https://www.ubt-uni.net/en/home/'
    }
  ],
  skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Tailwind CSS'],
  languages: ['English', 'Albanian'],
  interests: ['Frontend architecture', 'Performance engineering']
};
