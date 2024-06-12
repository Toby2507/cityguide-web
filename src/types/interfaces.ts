import { StaticImageData } from 'next/image';

// Forms
export interface IFormLoginUser {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export interface IFormCreateUser {
  errors: {
    firstName?: string[];
    lastName?: string[];
    phoneNumber?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export interface IFormVerifyOtp {
  errors: {
    otp?: string[];
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
