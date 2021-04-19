//--------------------------------------------------------
//-- ensureAuthenticated - Unit tests
//--------------------------------------------------------
import { given, when, then } from './ensure-authenticated.gwt';


describe(`Validate that ensureAuthenticated works`, () => {

	beforeEach(() => {
		given.noException();
		given.noSpies();
		given.bitbucketAPIInstance();
		given.bitbucketAPIAuthenticateSpy();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});


	//-- Checks
	test(`Ensure when not authenticated it calls authenticate()`, async () => {
		await when.methodCalled();
		then.authenticateShouldHaveBeenCalled();
	});

	test(`Ensure when authenticated it does not call authenticate()`, async () => {
		given.authenticated();
		await when.methodCalled();
		then.authenticateShouldNotHaveBeenCalled();
	});

});
