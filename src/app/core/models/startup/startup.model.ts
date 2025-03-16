import {Sector} from "../sector/sector.model";
import {Stage} from "../stage/stage.model";
import {User} from "../user/user.model";

export interface Startup {
  id?: number;
  companyName: string;
  description: string;
  pitchVideoUrl?: string;
  fundingNeeded: number;
  foundedYear: number;
  teamSize: number;
  revenue: number;
  growthRate: number;
  headquarters: string;
  contactInfo: string;
  sectors: Sector[];
  stages: Stage[];
  imagePath?: string;
  likes: number;
  comments: Comment[];
  user?: User;
}
