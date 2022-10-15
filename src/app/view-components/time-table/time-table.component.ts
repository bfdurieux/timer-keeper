import { Component, Input, OnInit } from '@angular/core';
import { IRow, ITimeTrack } from '../../interfaces/ITimeTrack';
import { utils } from '../../utils/utils';
import { StorageService } from '../../services/storage.service';

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

  constructor(private storageService: StorageService) { }

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
    this.storageService.save(this.rows);
  }

  loadRows() {
    this.rows = this.storageService.loadRows();
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
    this.storageService.discardAll();
    this.rows = this.storageService.loadRows();
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

  updateTimeSpent(row: IRow) {
    if(row.timeTrack.timeSpent == undefined || row.timeTrack.timeSpent == '') {
      row.timeTrack.totalTime = '00:00';
      return;
    }

    let time: {hour: number, minute: number} = {hour: 0, minute: 0};
    let split = [];

    if(row.timeTrack.timeSpent.indexOf(':') != -1) {
      split = row.timeTrack.timeSpent.split(':');
      time.hour = parseInt(split[0]) != NaN ? +split[0] : 0;;
      time.minute = parseInt(split[1]) != NaN ? +split[1] : 0;;
    } else if(row.timeTrack.timeSpent.indexOf('h') != -1) {
      split = row.timeTrack.timeSpent.split('h');
      split[1] = split[1].replace(/[^0-9\.]+/g, '');
      time.hour = parseInt(split[0]) != NaN ? +split[0] : 0;
      time.minute = parseInt(split[1]) != NaN ? +split[1] : 0;
    } else {
      time.minute = parseInt(row.timeTrack.timeSpent.replace(/[^0-9\.]+/g, ''));
    }

    let toHours = '';
    if(time.minute > 59) {
      toHours = this.toHours(time.minute);
      let minuteHours = toHours.split(':');
      time.hour += +minuteHours[0];
      time.minute = +minuteHours[1];
    }

    row.timeTrack.totalTime = `${time.hour}:${time.minute}`;
  }
}
