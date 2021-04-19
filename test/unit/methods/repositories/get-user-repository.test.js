//--------------------------------------------------------
//-- getUserRepository - Unit tests
//--------------------------------------------------------
import { given, when, then } from './get-user-repository.gwt';


describe(`Validate that getUserRepository works`, () => {

	beforeEach(() => {
		given.noException();
		given.noResponse();
		given.noRepository();
		given.bitbucketAPIInstance();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});


	//-- Repository parameter validation
	test(`Ensure when repository is not defined it fails`, async () => {
		given.repository();
		await when.methodCalled();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when repository is not a string it fails`, async () => {
		given.repository(123);
		await when.methodCalled();
		then.shouldHaveThrownMessageContaining('must be a string');
	});

	test(`Ensure when repository is empty string it fails`, async () => {
		given.repository('');
		await when.methodCalled();
		then.shouldHaveThrownMessageContaining('is not allowed to be empty');
	});


	//-- Call validation
	test(`Ensure when called the API call is valid`, async () => {
		given.validRepository();
		given.bitbucketAPIGetReturns();
		await when.methodCalled();
		then.shouldHaveCallAValidUrl();
	});

	test(`Ensure when called the response is valid`, async () => {
		given.validRepository();
		given.bitbucketAPIGetReturns();
		await when.methodCalled();
		then.shouldReturnAValidResponse();
	});

	test(`Ensure when API call fails it throws`, async () => {
		given.validRepository();
		given.bitbucketAPIGetThrows();
		await when.methodCalled();
		then.shouldHaveThrown();
	});

});
