//--------------------------------------------------------
//-- authenticate - Unit tests
//--------------------------------------------------------
import { given, when, then } from './authenticate.gwt';


describe(`Validate that authenticate works`, () => {

	beforeEach(() => {
		given.noException();
		given.noResponse();
		given.mockedSimpleOAuth2();
		given.bitbucketAPIInstance();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});


	//-- Token fetching
	test(`Ensure when token fetching throws it fails`, async () => {
		given.mockedSimpleOAuth2GetTokenThrows();
		await when.methodCalled();
		then.shouldHaveThrownMessageContaining(`Access token can't be fetched`);
	});

	test(`Ensure when token fetching response is empty it fails`, async () => {
		given.mockedSimpleOAuth2GetTokenReturns();
		await when.methodCalled();
		then.shouldHaveThrownMessageContaining('No token received');
	});


	//-- User fetching
	test(`Ensure when user fetching throws it fails`, async () => {
		given.mockedSimpleOAuth2GetTokenReturnsValidToken();
		given.mockedBitbucketAPIUserFetchThrows();
		await when.methodCalled();
		then.shouldHaveThrown();
	});

	test(`Ensure when user fetching returns, instance has an authenticated state`, async () => {
		given.mockedSimpleOAuth2GetTokenReturnsValidToken();
		given.mockedBitbucketAPIUserFetchReturns();
		await when.methodCalled();
		then.shouldHaveReturnedAUser();
		then.instanceUserPropertyShouldBeValid();
		then.instanceAuthenticatedPropertyShouldBeValid();
	});

});
