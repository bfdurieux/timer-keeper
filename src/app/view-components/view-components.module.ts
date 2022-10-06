import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeTableComponent } from './time-table/time-table.component';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from './time-picker/time-picker.component';

@NgModule({
  declarations: [TimeTableComponent, TimePickerComponent],
  exports: [
    TimeTableComponent,
    TimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ViewComponentsModule { }
