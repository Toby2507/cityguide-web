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
