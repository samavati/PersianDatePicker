import * as moment from 'moment-jalaali';

export class Day {
  private year: number;
  private month: number;
  private day: number;
  private isToday = false;
  private isCurrentMonth = false;
  private customDay: moment.Moment;
  public weekDayName: string;
  private weekDayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه'];

  constructor(
    customDay: moment.Moment
  ) {
    this.year = customDay.jYear();
    this.month = customDay.jMonth() + 1;
    this.day = customDay.jDate();
    this.customDay = moment(`${this.year}/${this.month}/${this.day}`, 'jYYYY/jM/jD');
    this.weekDayName = this.weekDayNames[this.weekday()];
  }

  get dayYear(): number {
    return this.year;
  }
  get dayMonth(): number {
    return this.month;
  }
  get dayDate(): number {
    return this.day;
  }

  get getEndOfMonth(): moment.Moment {
    return this.customDay.endOf('jMonth');
  }

  get getStartOfMonth(): moment.Moment {
    return this.customDay.startOf('jMonth');
  }

  get isThisToday() {
    return this.isToday;
  }

  get isThisMonth() {
    return this.isCurrentMonth;
  }

  setAsToday() {
    this.isToday = true;
  }

  setAsCurrentMonth() {
    this.isCurrentMonth = true;
  }

  public weekday() {
    const a = this.customDay.isoWeekday();
    return (a + 1) % 7;
  }

}
