//--------------------------------------------------------
//-- post - Unit tests
//--------------------------------------------------------
import { given, when, then } from './post.gwt';


describe(`Validate that post works`, () => {

	beforeEach(() => {
		given.noException();
		given.noResponse();
		given.noSpies();
		given.bitbucketAPIInstance();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});


	//-- Check if the same as axios.post()
	test(`Ensure when called it behaves as axios.post()`, async () => {
		given.bitbucketAPIPostSpy();
		given.bitbucketAPIAxiosPostReturns();
		await when.methodCalled();
		then.axiosPostShouldHaveBeenCalled();
		then.axiosPostShouldHaveReceivedTheSameParameters();
		then.axiosPostShouldReturnTheSame();
	});

	test(`Ensure when axios calls fails it throws`, async () => {
		given.bitbucketAPIPostSpy();
		given.bitbucketAPIAxiosPostThrows();
		await when.methodCalled();
		then.shouldHaveThrown();
	});

});
