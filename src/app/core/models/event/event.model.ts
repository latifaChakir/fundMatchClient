import {Sector} from "../sector/sector.model";

export enum EventType {
  PITCH_EVENT = 'PITCH_EVENT',
  NETWORKING = 'NETWORKING',
  WORKSHOP = 'WORKSHOP'
}
export interface Event {
  id?: number;
  title: string;
  description: string;
  date: string;
  location: string;
  cost: number;
  type: EventType;
  maxParticipants: number;
  sector?: Sector;
  imagePath?: string;
  isPublished : boolean;
}
