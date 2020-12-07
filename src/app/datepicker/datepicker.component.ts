import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as moment from 'moment-jalaali';
import { DatePickerService } from './classes/datepicker.class';
import { Day } from './classes/day.class';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  animations: [
    trigger('daysIn', [
      state('in', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale(0)'
        }),
        animate(300)
      ])
    ]),
    trigger('navIn', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ])
    ])
  ]
})
export class DatepickerComponent implements OnInit {

  datePicker: DatePickerService;
  toDay: Day; // today
  selectedDate: Day; // Selected Date By User
  selectedDateArray: any[] = []; // selected Date By user For Making Animation
  weekDays: string[] = []; // Name of day in the weeks
  yearMonths: string[] = []; // Name of month in the year
  datePickerMonth: Day[] = [];

  constructor() { }

  ngOnInit() {

    this.toDay = new Day(moment()); // initial today
    this.selectedDate = this.toDay; // initial selected date = today

    // settingUp the datePicker
    this.datePicker = new DatePickerService();
    this.datePicker.setLocale('fa'); // setting the locale
    this.datePicker.setToday(this.toDay); // setting today Date in datepicker
    this.weekDays = this.datePicker.weekDays(); // name of day in the weeks
    this.yearMonths = this.datePicker.yearMonths(); // name of month in the year
    this.updateSelectedDate(this.selectedDate);
    this.datePickerMonth = this.datePicker.getDatePickerMonth(this.selectedDate);
  }

  // going throw Month
  private Day2Moment(day: Day): moment.Moment {
    return moment(`${day.dayYear}/${day.dayMonth}/${day.dayDate}`, 'jYYYY/jM/jD');
  }

  onPrevMonth() {
    const updatedSelectedDate = this.Day2Moment(this.selectedDate).subtract(1, 'jMonth');
    this.selectedDate = new Day(updatedSelectedDate);
    this.datePickerMonth = this.datePicker.getDatePickerMonth(this.selectedDate);
    this.updateSelectedDate(this.selectedDate);
  }
  onNextMonth() {
    const updatedSelectedDate = this.Day2Moment(this.selectedDate).add(1, 'jMonth');
    this.selectedDate = new Day(updatedSelectedDate);
    this.datePickerMonth = this.datePicker.getDatePickerMonth(this.selectedDate);
    this.updateSelectedDate(this.selectedDate);
  }
  // going throw Month

  onGoToToday() {
    this.selectedDate = this.toDay;
    this.datePickerMonth = this.datePicker.getDatePickerMonth(this.toDay);
    this.updateSelectedDate(this.toDay);
  }

  onDateClick(day: Day) {
    this.selectedDate = day;
    this.updateSelectedDate(day);
  }

  updateSelectedDate(newDate: Day) {
    this.selectedDateArray = [];
    this.selectedDateArray.push(this.yearMonths[newDate.dayMonth - 1]);
    this.selectedDateArray.push(newDate.dayDate);
    this.selectedDateArray.push(newDate.dayYear);
  }

}
