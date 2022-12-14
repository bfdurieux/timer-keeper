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

  ngOnInit(): void {
    this.rows = this.storageService.loadRows();
    let groupedRows = utils.groupRowsByDate(this.rows);
    groupedRows.forEach(group => {
      this.groupedRows.push({
        guid: utils.generateNewGuid(),
        dateGroup: group[0].dateGroup ?? new Date(),
        rows: group
      })
    })
    console.log(this.groupedRows);
  }

  discard() {
    this.storageService.discardAll();
    this.rows = this.storageService.loadRows();
    location.reload();
  }
}

export interface IRowGroup {
  guid: string;
  rows: IRow[];
  dateGroup: Date;
}
