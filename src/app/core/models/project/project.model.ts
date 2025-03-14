export enum ProjectStatus{
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
export enum ProjectStage{
  IDEA = "IDEA",
  PROTOTYPE = "PROTOTYPE",
  DEVELOPMENT = "DEVELOPMENT",
  LAUNCH = "LAUNCH",
  SCALE = "SCALE",
}
export interface Project {
  id?: number;
  title: string;
  description: string;
  fundingAmount: number;
  stage: ProjectStage;
  createdAt: string;
  viewCount: number;
  status: ProjectStatus;
  imagePath?: string;
}
