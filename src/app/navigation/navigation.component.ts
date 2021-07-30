import { Component, OnInit } from '@angular/core';
import { CalendarConfiguration } from '../models/calendarConfiguration';
import { CalendarService } from '../services/calendar.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'cl-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: []
})
export class NavigationComponent implements OnInit {

    calendarConfiguration: CalendarConfiguration;

    constructor(
        private calendarService: CalendarService
    ) { }

    ngOnInit() {
        this.calendarConfiguration = this.calendarService.calendarConfiguration;
    }

    openCalendarConfiguration($event): void {

        let input = $event.target;
        let fileReader = new FileReader();
        fileReader.readAsText(input.files[0]);

        fileReader.onload = (data) => {
            this.calendarConfiguration.parseJsonToCalendarConfiguration(fileReader.result.toString());
        }

        fileReader.onerror = function () {
            alert('Unable to read ' + input.files[0]);
        };
    };

    saveCalendarConfiguration() {

        let blob = new Blob([JSON.stringify(this.calendarConfiguration)], {
            type: "application/json"
        });

        FileSaver.saveAs(blob, "calendarConfiguration.export.json");
    }

    deleteCalendarConfiguration() {
        this.calendarConfiguration.deleteConfigurationFromLocalStorage();

        // hack to reload page 
        location.reload();
    }

    generateCalendarConfiguration() {
        this.calendarConfiguration.generateYearSummariesFromDateOfBirth();
    }
}
