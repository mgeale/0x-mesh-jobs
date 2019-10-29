import { DayTimeUnit } from './dayTimeUnit';
import { TimeUnitType } from './timeUnit';

export class TimeUnitFactory {
    public static createTimeUnit(timeUnit: string) {
        switch (timeUnit) {
            case TimeUnitType.Day:
                return new DayTimeUnit();
        }
        throw new Error('timeUnit not supported');
    }
}
