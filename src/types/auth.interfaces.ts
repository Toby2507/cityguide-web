export interface IFormLoginUser {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}

export interface IFormUpgradeUser {
  errors: {
    phoneNumber?: string[];
    dateOfBirth?: string[];
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
    dateOfBirth?: string[];
    isPartner?: string[];
    _form?: string[];
  };
}

export interface IFormCreateEstablishment {
  errors: {
    name?: string[];
    description?: string[];
    address?: string[];
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

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  emailIsVerified: boolean;
  imgUrl: string | null;
  favouriteProperties: string[];
  isSocial: boolean;
  isPartner: boolean;
  cancellationPolicy: boolean;
  createdAt: string;
  updatedAt: string;
}
