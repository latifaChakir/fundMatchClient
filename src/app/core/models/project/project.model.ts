export enum ProjectStatus{
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
export interface Project {
  id?: number;
  title: string;
  description: string;
  fundingAmount: number;
  stage: string;
  createdAt: string;
  viewCount: number;
  status: ProjectStatus;
}
