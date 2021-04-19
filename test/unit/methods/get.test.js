//--------------------------------------------------------
//-- get - Unit tests
//--------------------------------------------------------
import { given, when, then } from './get.gwt';


describe(`Validate that get works`, () => {

	beforeEach(() => {
		given.noException();
		given.noResponse();
		given.noSpies();
		given.bitbucketAPIInstance();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});


	//-- Check if the same as axios.get()
	test(`Ensure when called it behaves as axios.get()`, async () => {
		given.bitbucketAPIGetSpy();
		given.bitbucketAPIAxiosGetReturns();
		await when.methodCalled();
		then.axiosGetShouldHaveBeenCalled();
		then.axiosGetShouldHaveReceivedTheSameParameters();
		then.axiosGetShouldReturnTheSame();
	});

	test(`Ensure when axios calls fails it throws`, async () => {
		given.bitbucketAPIGetSpy();
		given.bitbucketAPIAxiosGetThrows();
		await when.methodCalled();
		then.shouldHaveThrown();
	});

});
