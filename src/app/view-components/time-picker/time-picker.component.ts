import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  _pickedTime: string;
  @Input() set pickedTime(value: string) {
    this._pickedTime = value;
    this.pickedTimeChange.emit(value);
  }
  get pickedTime() {
    return this._pickedTime;
  }

  @Output() pickedTimeChange = new EventEmitter<string>();

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(_: KeyboardEvent) {
    if(this.isOpen)
      this.toggleOpen();
  }

  isOpen: boolean = false;

  getCurrentTime() {
    return new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
  }

  toggleOpen() {
    this._pickedTime = this._pickedTime ?? this.getCurrentTime();
    this.isOpen = !this.isOpen;
    this.pickedTimeChange.emit(this._pickedTime);
  }
}
