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
  searchStay: (params?: string[]) => `/search/stay/${params?.join('/')}`,
  searchRestaurant: (params?: string[]) => `search/restaurant/${params?.join('/')}`,
  // Admin paths
  admin: () => '/admin',
  stays: () => '/admin/stay',
  createStay: () => '/admin/stay/create',
  adminStay: (id: string) => `/admin/stay/${id}`,
  restaurants: () => '/admin/restaurant',
  createRestaurant: () => '/admin/restaurant/create',
  adminRestaurant: (id: string) => `/admin/restaurant/${id}`,
};

export default path;
