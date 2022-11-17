import { IRow } from './IRow';

export interface ITable {
  guid: string;
  dateGroup: Date;
  rowsNavigation?: IRow[];
}
