import { WeekEvent } from "./weekEvent";
import { WeekStageType } from "./weekStageType";

export class WeekSummary {

    yearId: number;
    weekId: number;
    date: Date;
    description: string;

    events: WeekEvent[];

    constructor() {
        this.events = [];
    }

    get isCurrentYear(): boolean {
        return this.isDateCurrentYear(this.date);
    }

    private isDateCurrentYear(date: Date): boolean {
        return new Date(date).getFullYear() == new Date().getFullYear();
    }


    get isCurrentWeek(): boolean {
        return this.isDateCurrentWeek(this.date);
    }

    private isDateCurrentWeek(date: Date): boolean {

        const currentDate = new Date();
        const todayDate = currentDate.getDate();
        const todayDay = currentDate.getDay();

        // get first date of week
        const firstDayOfWeek = new Date(currentDate.setDate(todayDate - todayDay));

        // get last date of week
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

        // if date is equal or within the first and last dates of the week
        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }

    //https://mycolor.space/?hex=%23845EC2&sub=1
    //https://www.color-hex.com/color-palettes/popular.php
    get stageType(): WeekStageType {

        if (this.yearId < 13) {
            return new WeekStageType("Childhood (Age 0-12)", (this.isCurrentYear) ? "#f9f871" : "#845ec2");
        }
        else if (this.yearId <= 19) {
            return new WeekStageType("Adolescence (Age 13-19)", (this.isCurrentYear) ? "#f9f871" : "#d65db1");
        }
        else if (this.yearId <= 34) {
            return new WeekStageType("Early Adulthood (Age 20-34)", (this.isCurrentYear) ? "#f9f871" : "#ff6f91")
        }
        else if (this.yearId <= 49) {
            return new WeekStageType("Middle Adulthood (Age 35-49)", (this.isCurrentYear) ? "#f9f871" : "#ff9671")
        }
        else if (this.yearId <= 74) {
            return new WeekStageType("Mature Adulthood (Age 50-74)", (this.isCurrentYear) ? "#f9f871" : "#ffc75f")
        }

        return new WeekStageType("Late Adulthood (Age 75-100)", (this.isCurrentYear) ? "#f9f871" : "#008e9b")
    }

    get hasEvents(): boolean {
        return this.events.length > 0;
    }
}