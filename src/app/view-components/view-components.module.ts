import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTableComponent } from './time-table/time-table.component';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { DirectivesModule } from '../utils/directives/directives.module';
import { TimeReportComponent } from './time-report/time-report.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  declarations: [TimeTableComponent, TimePickerComponent, TimeReportComponent, DatePickerComponent],
  exports: [
    TimeTableComponent,
    TimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule
  ]
})
export class ViewComponentsModule { }
