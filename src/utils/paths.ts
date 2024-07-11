const path = {
  home: () => '/',
  login: () => '/login',
  register: () => '/signup',
  listProperty: () => '/listproperty',
  partner: () => '/listproperty/partner',
  otp: (email: string) => `/otp/${email}`,
  forgotPassword: () => '#',
  profile: () => '#',
  userLicense: () => '#',
  offers: (id: string) => '#',
  stayDetail: (id: string) => `/stay/${id}`,
  // Admin paths
  admin: () => '/admin',
  createStay: () => '/admin/stay/create',
};

export default path;
