const path = {
  home: () => '/',
  login: (referer?: string) => `/login${referer ? `/${referer}` : ''}`,
  register: (referer?: string) => `/signup${referer ? `/${referer}` : ''}`,
  listProperty: () => '/listproperty',
  partner: () => '/listproperty/partner',
  otp: (email: string, referer?: string) => `/otp/${email}${referer ? `/${referer}` : ''}`,
  forgotPassword: () => '#',
  profile: () => '#',
  userLicense: () => '#',
  offers: (id: string) => '#',
  stayDetail: (id: string) => `/stay/${id}`,
  reserveStay: (id: string) => `/reservation/stay/${id}`,
  // Admin paths
  admin: () => '/admin',
  stays: () => '/admin/stay',
  restaurants: () => '/admin/restaurant',
  createStay: () => '/admin/stay/create',
  createRestaurant: () => '/admin/restaurant/create',
};

export default path;
