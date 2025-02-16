export interface RegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  token: string;
  isActive : boolean;
  roles: string[]
}
