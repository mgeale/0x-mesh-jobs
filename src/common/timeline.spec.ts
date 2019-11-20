import { createTimeline, createTotalOrdersTimeline, TimeUnitType } from './timeline';

describe('timeline', () => {
    beforeAll(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(1572509167000));
    });

    afterAll(() => {
        jasmine.clock().uninstall();
    });

    const totalOrders = [
        {
            timestamp: 1572149967000,
            totalOrders: 101
        },
        {
            timestamp: 1572236367000,
            totalOrders: 105
        },
        {
            timestamp: 1572322767000,
            totalOrders: 98
        },
        {
            timestamp: 1572409167000,
            totalOrders: 100
        }
    ];

    it('should create timeline for 7 days', () => {
        const result = createTimeline(TimeUnitType.Day, 7);
        expect(result.length).toEqual(7);
    });

    it('should allocate total orders to timeline', () => {
        const dates = createTimeline(TimeUnitType.Day, 7);
        const result = createTotalOrdersTimeline(TimeUnitType.Day, totalOrders, dates);
        expect(result[0].totalOrders).toEqual(null);
        expect(result[1].totalOrders).toEqual(null);
        expect(result[2].totalOrders).toEqual(totalOrders[0].totalOrders);
        expect(result[3].totalOrders).toEqual(totalOrders[1].totalOrders);
        expect(result[4].totalOrders).toEqual(totalOrders[2].totalOrders);
        expect(result[5].totalOrders).toEqual(totalOrders[3].totalOrders);
        expect(result[6].totalOrders).toEqual(null);
    });
});
