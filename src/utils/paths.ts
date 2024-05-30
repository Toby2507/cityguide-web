import { Roles } from '@/types/';

const path = {
  home: () => '/',
  login: (role?: Roles) => (role ? `/login/${role}` : '/login'),
  register: (role?: Roles) => (role ? `/register/${role}` : '/register'),
  forgotPassword: () => '#',
  profile: () => '#',
  userLicense: () => '#',
  offers: (id: string) => '#',
  details: (id: string) => '#',
};

export default path;
