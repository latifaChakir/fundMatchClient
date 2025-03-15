import {Role} from "../auth/Register-request.model";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  token: string;
  isActive : boolean;
  roles : Role[];
}
