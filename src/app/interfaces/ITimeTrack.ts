export interface ITimeTrack {
  guid: string;
  dateGroup: Date;
  task?: string;
  description?: string;
  timeSpent?: string;
  startTime?: string;
  endTime?: string;
  totalTime?: string;
}
