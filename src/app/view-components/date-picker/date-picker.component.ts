import { Component, Input } from '@angular/core';
import { utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  utils = utils;
  _selectedDate: Date;
  @Input() set selectedDate(value: Date) {
    this._selectedDate = value;
    if(value != undefined && Date.parse(value.toString()) != NaN)
      this.value = utils.getDateString(value.toString());
  };
  value: string = '';

  setDateValue() {
    this.selectedDate = utils.stringToDate(this.value);
  }
}
