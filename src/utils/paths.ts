const path = {
  home: () => '/',
  login: (referer?: string) => `/login${referer ? `/${referer}` : ''}`,
  register: (referer?: string) => `/signup${referer ? `/${referer}` : ''}`,
  otp: (email: string, referer?: string) => `/otp/${email}${referer ? `/${referer}` : ''}`,
  forgotPassword: () => '#',
  stays: () => '/stay',
  stayDetail: (id: string) => `/stay/${id}`,
  searchStay: (params?: string[]) => `/search/stay/${params?.join('/') || ''}`,
  reserveStay: (id: string) => `/reservation/stay/${id}`,
  restaurants: () => '/restaurant',
  restaurantDetail: (id: string) => `/restaurant/${id}`,
  searchRestaurant: (params?: string[]) => `search/restaurant/${params?.join('/') || ''}`,
  listProperty: () => '/listproperty',
  partner: () => '/listproperty/partner',
  profile: () => '#',
  userLicense: () => '#',
  offers: (id: string) => '#',
  // Admin paths
  admin: () => '/admin',
  adminStays: () => '/admin/stay',
  createStay: () => '/admin/stay/create',
  adminStay: (id: string) => `/admin/stay/${id}`,
  adminRestaurants: () => '/admin/restaurant',
  createRestaurant: () => '/admin/restaurant/create',
  adminRestaurant: (id: string) => `/admin/restaurant/${id}`,
};

export default path;
