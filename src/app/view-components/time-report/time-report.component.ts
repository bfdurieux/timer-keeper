import { Component, OnInit } from '@angular/core';
import { IRow, ITimeTrack } from '../../interfaces/ITimeTrack';
import { utils } from '../../utils/utils';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-time-report',
  templateUrl: './time-report.component.html',
  styleUrls: ['./time-report.component.css']
})
export class TimeReportComponent implements OnInit {
  title = 'Timer Keeper';
  rows: IRow[] = [];
  groupedRows: IRowGroup[] = [];

  constructor(private storageService: StorageService) {
  }

  defaultTimeTrack: ITimeTrack = {
    guid: utils.generateNewGuid()
  }

  defaultRow: IRow = {
    guid: utils.generateNewGuid(),
    dateGroup: new Date(),
    timeTrack: this.defaultTimeTrack
  }
  newDateGroup: any;

  ngOnInit(): void {
    this.rows = this.storageService.loadRows();
    let groupedRows = utils.groupRowsByDate(this.rows);
    groupedRows.forEach(group => {
      this.groupedRows.push({
        guid: group.guid,
        dateGroup: group[0].dateGroup ?? new Date(),
        rows: group.rows
      })
    })
    console.log(this.groupedRows);
  }

  discard() {
    this.storageService.discardAll();
    this.rows = [];
    // this.rows = this.storageService.loadRows();
    location.reload();
  }

  recalculateDateGroups() {
    console.log(this.groupedRows);
  }

  addNewDateGroup(newDateGroup: any) {
    console.log(newDateGroup);
    this.groupedRows.push({
      guid: utils.generateNewGuid(),
      dateGroup: new Date(newDateGroup),
      rows: [{
        guid: utils.generateNewGuid(),
        dateGroup: new Date(newDateGroup),
        timeTrack: {
            guid: utils.generateNewGuid()
          },
        }]
    })
  }

  autoSave(){
    this.storageService.save(this.groupedRows);
  }
}

export interface IRowGroup {
  guid: string;
  rows: IRow[];
  dateGroup: Date;
}
