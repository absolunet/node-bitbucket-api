//--------------------------------------------------------
//-- put - Unit tests
//--------------------------------------------------------
import { given, when, then } from './put.gwt';


describe(`Validate that put works`, () => {

	beforeEach(() => {
		given.noException();
		given.noResponse();
		given.noSpies();
		given.bitbucketAPIInstance();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});


	//-- Check if the same as axios.put()
	test(`Ensure when called it behaves as axios.put()`, async () => {
		given.bitbucketAPIPutSpy();
		given.bitbucketAPIAxiosPutReturns();
		await when.methodCalled();
		then.axiosPutShouldHaveBeenCalled();
		then.axiosPutShouldHaveReceivedTheSameParameters();
		then.axiosPutShouldReturnTheSame();
	});

	test(`Ensure when axios calls fails it throws`, async () => {
		given.bitbucketAPIPutSpy();
		given.bitbucketAPIAxiosPutThrows();
		await when.methodCalled();
		then.shouldHaveThrown();
	});

});
