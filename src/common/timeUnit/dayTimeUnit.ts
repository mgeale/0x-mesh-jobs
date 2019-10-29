import * as moment from 'moment';
import { TimeUnit, TimeUnitType } from './timeUnit';

export class DayTimeUnit implements TimeUnit {
    public name = TimeUnitType.Day;

    public createTimeline(count: number): Date[] {
        const timeline = [];
        const midday = moment()
            .utc()
            .startOf('day')
            .add(12, 'hours')
            .format();

        let time = new Date(midday);
        while (timeline.length < count) {
            timeline.push(time);
            time = moment(time)
                .subtract(1, 'day')
                .toDate();
        }
        return timeline.reverse();
    }
}
