import {UserModule} from "../../../user/user.module";
import {User} from "../user/user.model";

export enum MessageType {
  TEXT = "TEXT",
  FILE = "FILE",
  SYSTEM = "SYSTEM",
}
export interface Message {
  id?: number;
  content: string;
  timestamp : Date;
  isRead : boolean;
  type : MessageType;
  sent?: boolean;
  senderId : number | null;
  receiverId : number | null;
  sender?: User;   // Ajouter sender si nécessaire pour les détails de l'utilisateur
  receiver?: User;
}
