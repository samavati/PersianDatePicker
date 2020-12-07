import * as moment from 'moment-jalaali';
import { Day } from './day.class';

export class Month {

  constructor() { }

  private json2Moment(year: number, month: number, day: number): moment.Moment {
    return moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD');
  }

  public getNMonthByJsonDay(n: number, year: number, month: number, day: number): Day[] {
    const momentDay: moment.Moment = this.json2Moment(year, month, day);
    if (n >= 0) {
      momentDay.add(n, 'jMonth');
    } else {
      momentDay.subtract(-n, 'jMonth');
    }
    const customDay: Day = new Day(momentDay);
    const specificMonth: Day[] = [];
    const endOfMonth = customDay.getEndOfMonth.jDate();
    for (let index = 0; index < endOfMonth; index++) {
      const specificDay = customDay.getStartOfMonth.add(index, 'day');
      const newDay = new Day(specificDay);
      if (n === 0) {
        newDay.setAsCurrentMonth();
      }
      specificMonth.push(newDay);
    }
    return specificMonth;
  }
}
