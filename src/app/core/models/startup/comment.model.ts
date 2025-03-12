import { User } from "../user/user.model";

export interface Comment {
  id?: number;
  content: string;
  user?: User;
}
