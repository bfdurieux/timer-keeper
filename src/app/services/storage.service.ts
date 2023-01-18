import { Injectable } from '@angular/core';
import { utils } from '../utils/utils';
import { IRowGroup } from '../view-components/time-report/time-report.component';
import { IRow } from '../interfaces/IRow';
import { ITable } from '../interfaces/ITable';
import { ITimeTrack } from '../interfaces/ITimeTrack';
import { DateUtils } from '../utils/date-utils';

// const STORAGE_KEY: string = 'groupedTimeTrack';
const ROWS_KEY: string = 'rowsTimeTrack';
const TABLES_KEY: string = 'tablesTimeTrack'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  loadRows(): IRow[] {
    let storedData = undefined;
    try{
      storedData = JSON.parse(localStorage.getItem(ROWS_KEY));

      if(storedData != undefined && storedData != '')
        return storedData;
      else {
        let now = new Date();
        now.setHours(0 , 0, 0, 0);
        let tableId = this.getTableByDateGroup(now).guid;
        let defaultTimeTrack: ITimeTrack = {
          guid: utils.generateNewGuid(),
          dateGroup: now
        }

        let defaultRow: IRow = {
          guid: utils.generateNewGuid(),
          timeTrack: defaultTimeTrack,
          tableId: tableId
        //if no table.time == new Date(), create and get guid
        }
        return [defaultRow];
      }
    }catch(e) {
      console.error(e);
    }
  }

  private getTableByDateGroup(date: Date): ITable {
    let defaultTable = {dateGroup: date, guid: utils.generateNewGuid()};
    let tables = this.loadTables();
    let tableIndex = tables.findIndex(x => DateUtils.dateCompare(x.dateGroup, date) == 0);

    if(tableIndex > -1)
      return tables[tableIndex]
    else
      this.saveTable(defaultTable)

    return defaultTable;
  }

  loadTables(): ITable[] {
    let storedData = undefined;
    try{
      storedData = JSON.parse(localStorage.getItem(TABLES_KEY));

      if(storedData != undefined && storedData != '')
        return storedData;
      else
        return [{
          dateGroup: new Date,
          guid: utils.generateNewGuid()
        }]
    }catch(e) {
      console.error(e);
    }
  }

  saveRow(row: IRow) {
    let rows = this.loadRows();
    let rowIndex = rows.findIndex(x => x.guid == row.guid)
    if(rowIndex == -1)
      rows.push(row);
    else
      rows[rowIndex] = row;

    let jsonRows = JSON.stringify(rows);
    localStorage.setItem(ROWS_KEY, jsonRows);
  }

  saveTable(table: ITable) {
    let tables = this.loadTables();
    let index = tables.findIndex(x => x.guid == table.guid);
    if(index > -1)
      tables[index] = table;
    else
      tables.push(table);

    localStorage.setItem(TABLES_KEY, JSON.stringify(tables))
  }

  save(groups: IRowGroup[]) {
    // let jsonRows = JSON.stringify(groups);
    // localStorage.setItem(STORAGE_KEY, jsonRows);
  }

  discardAll() {
    localStorage.removeItem(ROWS_KEY);
    localStorage.removeItem(TABLES_KEY);
  }
}
