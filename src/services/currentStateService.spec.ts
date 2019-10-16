import {CurrentStateService} from './currentStateService';

describe('current state service', () => {
	let service: CurrentStateService;

	beforeAll(() => {
		service = new CurrentStateService();
	});

	it('should run example test', () => {
		expect(service.tokenData).toEqual(undefined);
	})

});