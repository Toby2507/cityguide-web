const path = {
  home: () => '/',
  login: () => '/login',
  register: () => '/signup',
  otp: (email: string) => `/otp/${email}`,
  forgotPassword: () => '#',
  profile: () => '#',
  userLicense: () => '#',
  offers: (id: string) => '#',
  stayDetail: (id: string) => `/stay/${id}`,
};

export default path;
