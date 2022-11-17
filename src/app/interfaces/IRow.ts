import { ITimeTrack } from './ITimeTrack';

export interface IRow {
  guid: string;
  tableId: string;
  timeTrack: ITimeTrack;
}
