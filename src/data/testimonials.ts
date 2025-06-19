export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Executive Director',
    company: 'Conway Community Foundation',
    content: 'Share Care Give has transformed how we approach funding. Instead of constant fundraising events, we now receive consistent monthly support from our business partners. It\'s been a game-changer for our organization.',
    image: 'https://randomuser.me/api/portraits/women/32.jpg'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Owner',
    company: 'Conway Coffee Co.',
    content: 'As a small business owner, I\'ve always wanted to support local causes but was concerned about additional expenses. Swipe It Forward lets me redirect fees I was already paying, making it a win-win for everyone involved.',
    image: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    id: '3',
    name: 'Jennifer Lee',
    role: 'Program Director',
    company: 'Amarillo Gives Back',
    content: 'The sustainable funding model has allowed us to focus on our mission rather than constant fundraising. Our partnership with local businesses has strengthened community ties in ways we never expected.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];
