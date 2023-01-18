import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns';

export class DateUtils {
  ///-1 if a < b
  ///0 if equal
  ///1 if a > b
  static dateCompare(dateA: Date, dateB: Date): number {
    // dateA
    return 0;
  }

  static newDate(date?: string): Date {
    let newDate = date == undefined ? new Date() : new Date(date);
    format(newDate, 'MM/dd/yyyy')
  }
  //
  // static parseDate(date: string): boolean {
  //   let dateArr = date.split('/');
  //   dateArr = dateArr.length <= 1 ? date.split('.') : dateArr;
  //
  //
  // }
}
