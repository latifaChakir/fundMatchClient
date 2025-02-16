export interface Role{
  id? : number;
  name: string;
}
export interface RegisterRequest {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  token?: string;
  isActive : boolean;
  roles: number[]
}
