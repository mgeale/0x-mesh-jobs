import { DayTimeUnit } from './dayTimeUnit';
import { MonthTimeUnit } from './monthTimeUnit';
import { TimeUnitType } from './timeUnit';
import { WeekTimeUnit } from './weekTimeUnit';

export class TimeUnitFactory {
    public static createTimeUnit(timeUnit: string) {
        switch (timeUnit) {
            case TimeUnitType.Day:
                return new DayTimeUnit();
            case TimeUnitType.Week:
                return new WeekTimeUnit();
            case TimeUnitType.Month:
                return new MonthTimeUnit();
        }
        throw new Error('timeUnit not supported');
    }
}
