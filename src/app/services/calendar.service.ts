import { Injectable } from '@angular/core';
import { CalendarConfiguration } from '../models/calendarConfiguration';


@Injectable({
  providedIn: 'root',
})

export class CalendarService {

  calendarConfiguration: CalendarConfiguration

  constructor() {
    this.calendarConfiguration = new CalendarConfiguration();
  }
}
