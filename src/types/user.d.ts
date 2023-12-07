export interface FormType{
  username: string;
  password: string;
  account_type: string;
}

export interface User {
  user_id: string | undefined,
  account_type: string | undefined
}
