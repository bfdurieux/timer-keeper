import { IRow } from '../interfaces/ITimeTrack';
import { ITime } from '../interfaces/ITime';

export class utils {

  // static getDateString(date?: Date): string {
  //   if(date != undefined)
  //     return date.getDate().toString();
  //
  //   return new Date().getDate().toString();
  // }

  static getDateDifference(end: Date, start: Date): string {
     return Math.abs(new Date(end).getTime() - new Date(start).getTime()).toString();
  }

  static getTimeSum(timeA: string, timeB: string): string {
    let a = utils.unformattedStringToTime(timeA);
    let b = utils.unformattedStringToTime(timeB);
    return utils.timeToString({ hour: a.hour + b.hour, minute: a.minute + b.minute })
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
    let dates = rows.map(x => utils.getDateString(x.dateGroup.toString()));
    let distinctDates =  [...new Set(dates)];
    distinctDates.forEach(date => {
      groupedRows.push(rows.filter(x => utils.getDateString(x.dateGroup.toString()) == date));
    })
    return groupedRows;
  }

  static getDateString(date: string): string {
    //example format 1968-11-16
    return date.split('T')[0];
  }

  static unformattedStringToTime(timeString: string): ITime {
    let split = this.splitTime(timeString);
    let time: ITime = { hour: split[0], minute: split[1] }

    return this.minutesToHours(time);
  }

  static timeToString(time: ITime): string {
    return time.hour.toString().padStart(2, '0') + ':' + time.minute.toString().padStart(2, '0');
  }

  static splitTime(value: string): number[] {
    let arr;
    if (this.hasSeparator(value, ':'))
      arr = value.split(':');
    else if (this.hasSeparator(value, 'h'))
      arr = value.split('h');
    else
      arr = ['00', value];

    arr[1] = this.removeNonDigitCharacters(arr[1]);
    arr[0] = +arr[0];
    arr[1] = +arr[1];
    return arr;
  }
  static hasSeparator(value: string, separator: string): boolean {
    return value.indexOf(separator) != -1;
  }

  static convertTimeFormat(value: string): string {
    //this should receive 00h00m and return 00:00;
    return '';
  }

  static minutesToHours(time: ITime): ITime {
    let minutes = time.minute;

    if(minutes <= 59)
      return time;
    else {
      let hour: number = Math.floor(minutes / 60);
      let min: number = minutes % 60;
      time.hour += hour;
      time.minute = min;
    }

    return time;
  }

  static removeNonDigitCharacters(value: string): string {
    return value.replace(/[^0-9\.]+/g, '');
  }
}
