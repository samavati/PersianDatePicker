import * as moment from 'moment-jalaali';
import { Day } from './day.class';
import { Month } from './month.class';

export class DatePickerService {

  private monthMaker = new Month();

  private toDay: Day;
  private datePickerMonth: Day[] = [];
  private locale: string;

  constructor() { }

  private makeDatePickerMonth(specificDate: Day) {
    const prevMonth = this.monthMaker.getNMonthByJsonDay(-1, specificDate.dayYear, specificDate.dayMonth, specificDate.dayDate);
    const currentMonth = this.monthMaker.getNMonthByJsonDay(0, specificDate.dayYear, specificDate.dayMonth, specificDate.dayDate);
    const nextMonth = this.monthMaker.getNMonthByJsonDay(1, specificDate.dayYear, specificDate.dayMonth, specificDate.dayDate);
    const datePickerMonth: Day[] = [];
    const currentMonthStart = currentMonth[0].weekday();
    const currentMonthEnd = currentMonth[currentMonth.length - 1].weekday();
    currentMonth.forEach(day => {
      if ((day.dayYear === this.toDay.dayYear) && (day.dayMonth === this.toDay.dayMonth) && (day.dayDate === this.toDay.dayDate)) {
        day.setAsToday();
      }
      datePickerMonth.push(day);
    });
    //
    for (let index = 0; index < currentMonthStart; index++) {
      datePickerMonth.unshift(prevMonth[prevMonth.length - 1 - index]);
    }
    for (let index = 0; index < (6 - currentMonthEnd); index++) {
      datePickerMonth.push(nextMonth[index]);
    }
    this.datePickerMonth = datePickerMonth;
  }

  public getDatePickerMonth(selectedDate: Day): Day[] {
    this.makeDatePickerMonth(selectedDate);
    return this.datePickerMonth;
  }

  public setLocale(loc: string) {
    this.locale = loc;
    moment.locale(loc);
  }

  public weekDays(): string[] {
    let weekDaysList: string[] = [];
    if (this.locale === 'fa') {
      weekDaysList = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    } else {
      weekDaysList = moment.weekdaysMin();
    }
    return weekDaysList;
  }
  public yearMonths(): string[] {
    let weekDaysList: string[] = [];
    if (this.locale === 'fa') {
      weekDaysList = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    } else {
      weekDaysList = moment.months();
    }
    return weekDaysList;
  }

  public setToday(day: Day) {
    this.toDay = day;
  }
}
