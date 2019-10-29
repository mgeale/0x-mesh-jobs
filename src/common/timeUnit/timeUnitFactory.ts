import { NotSupportedError } from '@incent-loyalty/incent-error';
import { IncentServiceName } from '../../common/services';
import { DayTimeUnit } from './dayTimeUnit';
import { TimeUnitType } from './timeUnit';

export class TimeUnitFactory {
    public static createTimeUnit(timeUnit: string) {
        switch (timeUnit) {
            case TimeUnitType.Day:
                return new DayTimeUnit();
        }
        throw new NotSupportedError(IncentServiceName.Exchange, 'timeUnit not supported');
    }
}
