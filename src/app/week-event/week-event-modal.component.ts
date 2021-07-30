import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormArray } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WeekSummary } from '../models/weekSummary';
import { CalendarService } from '../services/calendar.service';

@Component({
    selector: 'dc-week-event-component',
    templateUrl: './week-event-modal.component.html',
    styleUrls: ['./week-event-modal.component.css']
})

export class WeekEventModal implements OnInit {

    @Input() weekSummary: WeekSummary;
    weekSummaryForm: FormGroup;

    get weekSummaryFormEvents(): FormArray {
        return <FormArray>this.weekSummaryForm.get('events');
    }

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private calendarService: CalendarService
    ) {
        this.generateWeekSummaryForm();
    }

    ngOnInit() {
        this.pushWeekSummaryForm();
    }

    generateWeekSummaryForm() {
        this.weekSummaryForm = this.fb.group({
            yearId: [''],
            weekId: [''],
            date: [''],
            description: [''],
            isCurrentYear: [''],
            isCurrentWeek: [''],
            stageType: [''],
            events: this.fb.array([])
        });
    }

    generateWeekSummaryFormEvent(): FormGroup {
        return this.fb.group({
            id: [0],
            title: [''],
            description: [''],
        });
    }

    pushWeekSummaryForm(): void {
        if (this.weekSummaryForm) {
            this.weekSummaryForm.reset();
        }

        for (let event of this.weekSummary.events) {
            this.weekSummaryFormEvents.push(this.generateWeekSummaryFormEvent());
        }

        this.weekSummaryForm.patchValue({
            yearId: this.weekSummary.yearId,
            weekId: this.weekSummary.weekId,
            date: formatDate(this.weekSummary.date, 'yyyy-MM-dd', 'en'),
            description: this.weekSummary.description,
            isCurrentYear: this.weekSummary.isCurrentYear,
            isCurrentWeek: this.weekSummary.isCurrentWeek,
            stageType: this.weekSummary.stageType,
            events: this.weekSummary.events
        });
    }

    addEvent(): void {
        this.weekSummaryFormEvents.push(this.generateWeekSummaryFormEvent());
    }

    removeEvent(id: number): void {
        this.weekSummaryFormEvents.removeAt(id);
    }

    onSubmit() {
        this.updateCalendarConfigurationWeekSummary();

        this.calendarService.calendarConfiguration.saveConfigurationToLocalStorage();
        this.activeModal.close();
    }

    updateCalendarConfigurationWeekSummary() {
        let weekSummary = this.calendarService.calendarConfiguration.summaries[this.weekSummary.yearId].summaries[this.weekSummary.weekId];
        weekSummary.description = this.weekSummaryForm.value.description;
        weekSummary.date = this.weekSummaryForm.value.date;
        weekSummary.events = this.weekSummaryForm.value.events;
    }
}
