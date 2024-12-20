const path = {
  home: () => '/',
  login: (referer?: string) => `/login${referer ? `/${referer}` : ''}`,
  register: (referer?: string) => `/signup${referer ? `/${referer}` : ''}`,
  otp: (email: string, referer?: string) => `/otp/${email}${referer ? `/${referer}` : ''}`,
  forgotPassword: () => '#',
  stays: () => '/stay',
  trendingStays: () => '/stay/trending',
  stayDetail: (id: string) => `/stay/${id}`,
  searchStay: (params?: string[]) => `/search/stay/${params?.join('/') || ''}`,
  reserveStay: (id: string) => `/reservation/stay/${id}`,
  restaurants: () => '/restaurant',
  trendingRestaurants: () => '/restaurant/trending/',
  restaurantDetail: (id: string) => `/restaurant/${id}`,
  searchRestaurant: (params?: string[]) => `search/restaurant/${params?.join('/') || ''}`,
  reserveRestaurant: (id: string) => `/reservation/restaurant/${id}`,
  nightlifes: () => '/nightlife',
  trendingNightlifes: () => '/nightlife/trending',
  nightlifeDetail: (id: string) => `/nightlife/${id}`,
  searchNightlife: (params?: string[]) => `search/nightlife/${params?.join('/') || ''}`,
  vtu: () => '/vtu',
  vtuDashboard: () => '/vtu/dashboard',
  vtuHistory: () => '/vtu/dashboard/history',
  vtuReceivers: () => '/vtu/dashboard/receivers',
  vtuPurchaseAirtime: () => '/vtu/dashboard/purchase/airtime',
  vtuPurchaseData: () => '/vtu/dashboard/purchase/data',
  listProperty: () => '/listproperty',
  partner: () => '/listproperty/partner',
  about: (section?: string) => `/about${section ? `#${section}` : ''}`,
  help: (section?: string) => `/help${section ? `#${section}` : ''}`,
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
  adminNightlifes: () => '/admin/nightlife',
  createNightlife: () => '/admin/nightlife/create',
  adminNightlife: (id: string) => `/admin/nightlife/${id}`,
  adminReservations: () => '/admin/reservation',
  adminReservation: (id: string) => `/admin/reservation/${id}`,
};

export default path;
