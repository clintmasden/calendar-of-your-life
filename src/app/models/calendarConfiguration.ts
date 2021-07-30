import { WeekEvent } from "./weekEvent";
import { WeekSummary } from "./weekSummary";
import { YearSummary } from "./yearSummary";

export class CalendarConfiguration {


    readonly numberOfWeeks: number = 52;
    readonly numberOfYears: number = 100;
    readonly localStorageItemKeyName: string = "calendarConfiguration";

    readonly tableColumns: Array<number> = new Array(this.numberOfWeeks);
    readonly tableRows: Array<number> = new Array(this.numberOfYears);


    dateOfBirth: Date;
    summaries: YearSummary[];

    constructor() {

        if (this.hasLocalStorageItem()) {
            this.parseJsonToCalendarConfiguration(localStorage.getItem(this.localStorageItemKeyName))
            return;
        }

        this.dateOfBirth = new Date(1991, 2, 18)
        this.generateYearSummariesFromDateOfBirth();

    }

    private hasDateOfBirth(): boolean {
        return this.dateOfBirth != undefined;
    }

    generateYearSummariesFromDateOfBirth() {
        if (this.hasDateOfBirth) {
            this.summaries = this.getAutoGenerateYearSummaries();
            this.saveConfigurationToLocalStorage();
        }
    }

    private hasLocalStorageItem(): boolean {
        return localStorage.getItem(this.localStorageItemKeyName) != undefined
    }

    saveConfigurationToLocalStorage() {
        localStorage.setItem(this.localStorageItemKeyName, JSON.stringify(this))
    }

    parseJsonToCalendarConfiguration(contents: string) {
        let localStorageCalendarConfiguration: CalendarConfiguration = JSON.parse(contents);

        let yearSummaries: YearSummary[] = [];

        for (let localYearSummary of localStorageCalendarConfiguration.summaries) {

            let yearSummary = new YearSummary();
            yearSummary.yearId = localYearSummary.yearId;
            yearSummary.date = new Date(localYearSummary.date);

            for (let localWeekSummary of localYearSummary.summaries) {

                let weekSummary = new WeekSummary();
                weekSummary.yearId = localWeekSummary.yearId;
                weekSummary.weekId = localWeekSummary.weekId;
                weekSummary.date = new Date(localWeekSummary.date);
                weekSummary.description = localWeekSummary.description;

                for (let localEvent of localWeekSummary.events) {

                    let event = new WeekEvent()
                    event.id = localEvent.id;
                    event.title = localEvent.title;
                    event.description = localEvent.description;

                    weekSummary.events.push(event);
                }

                yearSummary.summaries.push(weekSummary);
            }

            yearSummaries.push(yearSummary);
        }

        this.dateOfBirth = localStorageCalendarConfiguration.dateOfBirth;
        this.summaries = yearSummaries;
    }

    deleteConfigurationFromLocalStorage() {
        localStorage.removeItem(this.localStorageItemKeyName);
    }

    private getAutoGenerateYearSummaries(): YearSummary[] {
        let yearSummaries: YearSummary[] = [];

        for (let yearIndex = 0; yearIndex < this.numberOfYears; yearIndex++) {

            let yearSummary = new YearSummary();
            yearSummary.yearId = yearIndex;

            let yearDate: Date = new Date(this.dateOfBirth);
            yearDate.setFullYear(yearDate.getFullYear() + yearIndex)

            yearSummary.date = yearDate;

            for (let weekIndex = 0; weekIndex < this.numberOfWeeks; weekIndex++) {
                let weekSummary = new WeekSummary();

                let weekDate = new Date(yearDate)
                weekDate.setDate(yearDate.getDate() + (weekIndex * 7));

                weekSummary.yearId = yearIndex;
                weekSummary.weekId = weekIndex;
                weekSummary.date = weekDate;
                weekSummary.description = `You are ${yearSummary.yearId} year(s) and ${weekSummary.weekId} week(s) old.`;

                yearSummary.summaries.push(weekSummary);
            }

            yearSummaries.push(yearSummary);
        }

        return yearSummaries;
    }
}