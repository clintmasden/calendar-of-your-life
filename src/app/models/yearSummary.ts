import { WeekSummary } from "./weekSummary";

export class YearSummary {

    yearId: number;
    date: Date;

    summaries: WeekSummary[];

    constructor() {
        this.summaries = [];
    }
}