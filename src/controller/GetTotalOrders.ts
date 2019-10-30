import { Request, Response } from 'express';

import { TimeUnitType } from '../common/timeline';
import { TotalOrders } from '../entity/TotalOrders';
import { HistoricalDataService } from '../services/historicalDataService';

export interface RequestData {
    startTimestamp: number;
    finishTimestamp: number;
    timeUnit: TimeUnitType;
}

function fromDto(startDate: string, finishDate: string, timeUnit: string): RequestData {
    return {
        startTimestamp: new Date(startDate).getTime(),
        finishTimestamp: new Date(finishDate).getTime(),
        timeUnit: timeUnit as TimeUnitType
    };
}

/**
 * Loads all posts from the database.
 */
export async function getTotalOrders(request: Request, response: Response) {
    const count = request.query.count;
    const timeUnit = request.query.timeUnit;
    const totalOrders = new HistoricalDataService().getTotalOrdersAsync(timeUnit, count);
    response.send(totalOrders);
}
