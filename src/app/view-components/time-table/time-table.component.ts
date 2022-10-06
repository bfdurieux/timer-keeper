import { Component, Input, OnInit } from '@angular/core';
import { IRow, ITimeTrack } from '../../interfaces/ITimeTrack';
import { utils } from '../../utils/utils';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  @Input() group: IRow[] = [];

  defaultTimeTrack: ITimeTrack = {
    guid: utils.generateNewGuid()
  }

  defaultRow: IRow = {
    guid: utils.generateNewGuid(),
    dateGroup: new Date(),
    timeTrack: this.defaultTimeTrack
  }
  rows: IRow[] = [];
  groupedRows:any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadRows();
    this.groupedRows = utils.groupRowsByDate(this.rows);
  }

  addNewRow(dateGroup: string) {
    this.rows.push(this.defaultRow);

    this.autoSave();
  }

  removeRow(row: IRow) {
    this.rows.splice(this.rows.findIndex(x => x.guid == row.guid), 1);

    this.autoSave();
  }

  autoSave() {
    localStorage.setItem('groupedTimeTrack', JSON.stringify(this.rows));
  }

  loadRows() {
    let storedData = JSON.parse(localStorage.getItem('groupedTimeTrack'));

    if(storedData != undefined && storedData != '')
      this.rows = storedData;
    else
      this.rows = [{
        dateGroup: new Date,
        guid: utils.generateNewGuid(),
        timeTrack: {guid: utils.generateNewGuid()}
      }]
    }


  calculateRowTime(row: IRow) {
    if(row.timeTrack.timeSpent != undefined && row.timeTrack.timeSpent != '0')
      row.timeTrack.totalTime = row.timeTrack.timeSpent;
    if (row.timeTrack.endTime != undefined && row.timeTrack.startTime != undefined)
      row.timeTrack.totalTime = this.subtractTime(row.timeTrack.endTime, row.timeTrack.startTime);
    else
      row.timeTrack.totalTime = '0';

    if(row.timeTrack.startTime != undefined)
      row.dateGroup = new Date();

    this.autoSave();
  }

  subtractTime(timeA:string, timeB:string) {
    if(timeA == timeB)
      return '00:00';

    let splitA = timeA.split(':');
    let splitB = timeB.split(':');

    return this.toHours(((+splitA[0] * 60) + +splitA[1]) - ((+splitB[0] * 60) + +splitA[1]));
  }

  toHours(minutes: number): string {
    let hour: number = Math.floor(minutes / 60);
    let min: number = minutes % 60;
    let strHour = hour.toString();
    let strMin = min.toString();
    strHour = strHour.padStart(2, '0');
    strMin = strMin.padStart(2, '0');
    console.log(strHour + ':' + strMin)
    return strHour + ':' + strMin;
  }

  discard() {
    localStorage.removeItem('groupedTimeTrack');
    this.loadRows();
  }

  saveRow(row: IRow) {
    let date = new Date();
    date.setDate(parseInt(row.timeTrack.timeSpent));
    row.dateGroup = date;
    this.autoSave();
  }

  getDate(row: IRow) {
    if(row?.dateGroup != undefined)
      return new Date(row.dateGroup).getDate();
    else
      return '';
  }

  updateStartTime(time: string, row: IRow) {
    row.timeTrack.startTime = time;
    this.calculateRowTime(row);
  }

  updateEndTime(time: string, row:IRow) {
    row.timeTrack.endTime = time;
    this.calculateRowTime(row);
  }
}
