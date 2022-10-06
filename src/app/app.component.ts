import { Component } from '@angular/core';
import { utils } from './utils/utils';
import { IRow, ITimeTrack } from './interfaces/ITimeTrack';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timer Keeper';
  rows: IRow[] = [];
  groupedRows:any[] = [];

  defaultTimeTrack: ITimeTrack = {
    guid: utils.generateNewGuid()
  }

  defaultRow: IRow = {
    guid: utils.generateNewGuid(),
    dateGroup: new Date(),
    timeTrack: this.defaultTimeTrack
  }

  ngOnInit(): void {
    this.loadRows();
    this.groupedRows = utils.groupRowsByDate(this.rows);
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

  discard() {
    localStorage.removeItem('groupedTimeTrack');
    this.loadRows();
    location.reload();
  }
}
