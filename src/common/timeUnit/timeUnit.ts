export interface TimeUnit {
    name: TimeUnitType;
    createTimeline(count: number): Date[];
}

export enum TimeUnitType {
    Day = 'day',
    Week = 'week',
    Month = 'month',
}
