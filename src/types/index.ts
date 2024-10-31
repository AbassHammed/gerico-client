export type ILoginInputs = {
  email: string;
  password: string;
};

export type ISiteConfig = {
  url: string;
  name: string;
  description: string;
  ogImage: string;
  authors: {
    name: string;
    url: string;
  }[];
  creator: string;
};

export type IChangePasswordInput = {
  password: string;
  confirmPassword: string;
};

export type ResetPasswordType = {
  uid: string;
  reset_code: string;
  password: string;
  confirm_password: string;
};
