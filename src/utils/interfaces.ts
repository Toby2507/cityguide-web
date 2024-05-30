import { StaticImageData } from 'next/image';

export type Roles = 'admin' | 'user';

// Forms
export interface IFormLoginUser {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

// Stored Details
export interface IUserDetails {
  id: string;
  fullName: string;
  imgUrl: string;
}

// External Data
export interface IOffers {
  id: string;
  name: string;
  description?: string;
  imgUrl: StaticImageData;
  link: string;
}
