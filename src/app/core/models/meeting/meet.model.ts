export interface Meeting {
  id?: number;
  name: string;
  topic: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  createdBy: string;
  type: string;
}
