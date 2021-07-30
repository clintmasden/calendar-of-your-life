import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarConfiguration } from '../models/calendarConfiguration';
import { WeekSummary } from '../models/weekSummary';
import { CalendarService } from '../services/calendar.service';
import { WeekEventModal } from '../week-event/week-event-modal.component'

@Component({
  selector: 'cl-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarConfiguration: CalendarConfiguration;

  constructor(
    private modalService: NgbModal,
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.calendarConfiguration = this.calendarService.calendarConfiguration;
  }

  openModal(weekSummary: WeekSummary) {

    const modalRef = this.modalService.open(WeekEventModal, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.weekSummary = weekSummary;
    modalRef.result.then((result) => {
    }, (reason) => {
      // hack to update the calendar configuration after closing the modal
      this.calendarConfiguration = this.calendarService.calendarConfiguration;
    });
  }
}
