import { createTimeline, TimeUnitType } from './timeline';

describe('timeline', () => {
    it('should create timeline for 7 days', () => {
        const result = createTimeline(TimeUnitType.Day, 7);
        expect(result).toEqual([
            new Date('2018-11-28T00:00:00.000Z'),
            new Date('2018-11-29T00:00:00.000Z'),
            new Date('2018-11-30T00:00:00.000Z'),
            new Date('2018-12-01T00:00:00.000Z'),
            new Date('2018-12-02T00:00:00.000Z'),
            new Date('2018-12-03T00:00:00.000Z'),
            new Date('2018-12-04T00:00:00.000Z')
        ]);
    });

    it('should create timeline for 4 weeks', () => {
        const result = createTimeline(TimeUnitType.Week, 4);
        expect(result).toEqual([
            new Date('2018-11-11T00:00:00.000Z'),
            new Date('2018-11-18T00:00:00.000Z'),
            new Date('2018-11-25T00:00:00.000Z'),
            new Date('2018-12-02T00:00:00.000Z')
        ]);
    });

    it('should create timeline for 6 months', () => {
        const result = createTimeline(TimeUnitType.Month, 6);
        expect(result).toEqual([
            new Date('2018-07-01T01:00:00.000Z'),
            new Date('2018-08-01T01:00:00.000Z'),
            new Date('2018-09-01T01:00:00.000Z'),
            new Date('2018-10-01T01:00:00.000Z'),
            new Date('2018-11-01T00:00:00.000Z'),
            new Date('2018-12-01T00:00:00.000Z')
        ]);
    });
});
