import { Injectable } from '@angular/core';
import { utils } from '../utils/utils';
import { IRowGroup } from '../view-components/time-report/time-report.component';

const STORAGE_KEY: string = 'groupedTimeTrack';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  loadRows(): any[] {
    let storedData = undefined;
    try{
      storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

      if(storedData != undefined && storedData != '')
        return storedData;
      else
        return [{
          dateGroup: new Date,
          guid: utils.generateNewGuid(),
          timeTrack: {guid: utils.generateNewGuid()}
        }]
    }catch(e) {
      console.error(e);
    }
  }

  save(groups: IRowGroup[]) {
    let jsonRows = JSON.stringify(groups);
    localStorage.setItem(STORAGE_KEY, jsonRows);
  }

  discardAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
