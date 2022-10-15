import { Injectable } from '@angular/core';
import { utils } from '../utils/utils';
import { IRow } from '../interfaces/ITimeTrack';

const STORAGE_KEY: string = 'groupedTimeTrack';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  loadRows(): any[] {
    let storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    console.log(storedData);

    if(storedData != undefined && storedData != '')
      return storedData;
    else
      return [{
        dateGroup: new Date,
        guid: utils.generateNewGuid(),
        timeTrack: {guid: utils.generateNewGuid()}
      }]
  }

  save(rows: IRow[]) {
    let jsonRows = JSON.stringify(rows);
    console.log(jsonRows);
    localStorage.setItem(STORAGE_KEY, jsonRows);
  }

  discardAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
