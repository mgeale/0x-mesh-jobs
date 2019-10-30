import {createTimeline, createTotalOrdersTimeline, TimeUnitType} from './timeline';

fdescribe('timeline', () => {
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
		const dates = createTimeline(TimeUnitType.Day, 7);
		console.log(dates);
		const orders = createTotalOrdersTimeline(TimeUnitType.Day, totalOrders, dates);
		console.log(orders)
	});


});