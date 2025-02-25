import {Sector} from "../sector/sector.model";

export interface Investor {
  id?: number;
  organization: string;
  sectors: Sector[];
  minInvestment: number;
  maxInvestment: number;
  investmentType: string;
  location: string;
  experienceYears: number;
  averageInvestmentsPerYear: number;
  investmentStrategy: string;
  preferredGeographies: string[];
  contactInfo: string;
}
