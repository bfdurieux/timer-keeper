export interface ITimeTrack {
  guid: string;
  task?: string;
  description?: string;
  timeSpent?: string;
  startTime?: string;
  endTime?: string;
  totalTime?: string;
}

export interface IRow {
  dateGroup: Date;
  timeTrack: ITimeTrack;
  guid: string;
}
