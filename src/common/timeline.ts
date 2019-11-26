import moment from 'moment';

import { TotalOrdersModel } from '../models/TotalOrdersModel';

export interface TimeUnit {
    name: TimeUnitType;
    createTimeline(count: number): Date[];
}

export interface TotalOrdersTimeline {
    date: Date;
    totalOrders: number;
}

export enum TimeUnitType {
    Day = 'day',
    Week = 'week',
    Month = 'month'
}

export function createTimeline(timeUnitType: TimeUnitType, count: number): Date[] {
    const timeline = [];
    const start = moment()
        .utc()
        .startOf(timeUnitType)
        .format();

    let time = new Date(start);
    while (timeline.length < count) {
        timeline.push(time);
        time = moment(time)
            .subtract(1, timeUnitType)
            .toDate();
    }
    return timeline.reverse();
}
