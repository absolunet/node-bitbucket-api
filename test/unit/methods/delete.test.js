//--------------------------------------------------------
//-- delete - Unit tests
//--------------------------------------------------------
import { given, when, then } from './delete.gwt';


describe(`Validate that delete works`, () => {

	beforeEach(() => {
		given.noException();
		given.noResponse();
		given.noSpies();
		given.bitbucketAPIInstance();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});


	//-- Check if the same as axios.delete()
	test(`Ensure when called it behaves as axios.delete()`, async () => {
		given.bitbucketAPIDeleteSpy();
		given.bitbucketAPIAxiosDeleteReturns();
		await when.methodCalled();
		then.axiosDeleteShouldHaveBeenCalled();
		then.axiosDeleteShouldHaveReceivedTheSameParameters();
		then.axiosDeleteShouldReturnTheSame();
	});

	test(`Ensure when axios calls fails it throws`, async () => {
		given.bitbucketAPIDeleteSpy();
		given.bitbucketAPIAxiosDeleteThrows();
		await when.methodCalled();
		then.shouldHaveThrown();
	});

});
