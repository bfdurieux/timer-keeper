import { Component, EventEmitter, Input, Output } from '@angular/core';
import { utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Output() pickedDateChanged = new EventEmitter();
  utils = utils;
  _selectedDate: Date;
  @Input() set selectedDate(value: Date) {
    this._selectedDate = value;
    if(value != undefined && Date.parse(value.toString()) != NaN)
      this.value = utils.getDateString(value.toString());
  };
  value: string = '';

  setDateValue(value: Date) {
    this.selectedDate = utils.stringToDate(this.value);
  }

  setDate($event: any) {
    this._selectedDate = $event;
    this.pickedDateChanged.emit(this._selectedDate);
  }
}
