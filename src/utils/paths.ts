const path = {
  home: () => '/',
  login: () => '/login',
  register: () => '/signup',
  otp: (email: string) => `/otp/${email}`,
  forgotPassword: () => '#',
  profile: () => '#',
  userLicense: () => '#',
  offers: (id: string) => '#',
  details: (id: string) => '#',
};

export default path;
