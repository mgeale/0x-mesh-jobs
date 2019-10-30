import moment from 'moment';

import { TimeUnit, TimeUnitType } from './timeUnit';

export class MonthTimeUnit implements TimeUnit {
    public name = TimeUnitType.Week;
    private readonly _amountHours: number = 84;

    public createTimeline(count: number): Date[] {
        const timeline = [];
        const midweek = moment()
            .utc()
            .startOf('month')
            .add(this._amountHours, 'hours')
            .format();

        let time = new Date(midweek);
        while (timeline.length < count) {
            timeline.push(time);
            time = moment(time)
                .subtract(1, 'week')
                .toDate();
        }
        return timeline.reverse();
    }
}
