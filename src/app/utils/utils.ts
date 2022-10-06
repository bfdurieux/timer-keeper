import { IRow } from '../interfaces/ITimeTrack';

export class utils {

  static getDateString(date?: Date): string {
    if(date != undefined)
      return date.getDate().toString();

    return new Date().getDate().toString();
  }

  static getDateDifference(end: Date, start: Date): string {
     return Math.abs(new Date(end).getTime() - new Date(start).getTime()).toString();
  }

  static generateNewGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

  static groupRowsByDate(rows: IRow[]) {
    let groupedRows = [];
    let distinctDates =  [...new Set(rows.map(x => new Date(x.dateGroup).getDate()))];
    distinctDates.forEach(date => {
      groupedRows.push(rows.filter(x => new Date(x.dateGroup).getDate() == date));
    })
    return groupedRows;
  }
}
