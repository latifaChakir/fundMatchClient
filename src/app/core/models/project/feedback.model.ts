import {Investor} from "../investor/investor.model";
import {Project} from "./project.model";

export enum FeedbackType{
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
  NEUTRAL = "NEUTRAL",
}
export interface Feedback {
  id?: number;
  content: string;
  isPrivate : boolean;
  type: FeedbackType;
  investor?: Investor;
  project?: Project;
}
