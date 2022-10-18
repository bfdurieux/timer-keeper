import { Component, Input, OnInit } from '@angular/core';
import { IRow } from '../../interfaces/ITimeTrack';
import { StorageService } from '../../services/storage.service';
import { utils } from '../../utils/utils';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  @Input() group: IRow[] = [];
  date: Date;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.date = this.group[0]?.dateGroup ?? new Date();
  }

  autoSave() {
    this.storageService.save(this.group);
  }

  calculateRowTime(row: IRow) {
    let timeSpentIsSet: boolean = row.timeTrack.timeSpent != undefined && row.timeTrack.timeSpent != '0';
    let startAndEndAreSet: boolean = row.timeTrack.endTime != undefined && row.timeTrack.startTime != undefined;

    if(timeSpentIsSet)
      row.timeTrack.totalTime = row.timeTrack.timeSpent;
    if (startAndEndAreSet)
      row.timeTrack.totalTime = this.subtractTime(row.timeTrack.endTime, row.timeTrack.startTime);
    else
      row.timeTrack.totalTime = '0';

    if(row.timeTrack.startTime != undefined)
      row.dateGroup = new Date();//set date group correctly when editable

    this.autoSave();
  }

  subtractTime(timeA:string, timeB:string): string {
    if(timeA == timeB)
      return '00:00';

    let splitA = timeA.split(':');
    let splitB = timeB.split(':');
    let totalTimeInMinutes = ((+splitA[0] * 60) + +splitA[1]) - ((+splitB[0] * 60) + +splitB[1]);

    return utils.timeToString(utils.minutesToHours({ hour: 0, minute: totalTimeInMinutes }));
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

    if(row.timeTrack.startTime != undefined)
      row.timeTrack.endTime = utils.getTimeSum(row.timeTrack.startTime, row.timeTrack.timeSpent);

    let time = utils.unformattedStringToTime(row.timeTrack.timeSpent);
    row.timeTrack.totalTime = utils.timeToString(time);
  }

  addRow() {
    let guid = utils.generateNewGuid();
    this.group.push({
      guid: guid,
      dateGroup: this.date,
      timeTrack: {
        guid: guid
      }
    })
  }

  removeRow(row: IRow) {
    this.group = this.group.filter(x => x.guid != row.guid);
  }
}
