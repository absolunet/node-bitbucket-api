//--------------------------------------------------------
//-- axios - Unit tests
//--------------------------------------------------------
import { given, when, then } from './axios.gwt';


describe(`Validate that axios works`, () => {

	beforeEach(() => {
		given.noProperty();
		given.noActualPackages();
		given.noProperty();
		given.noSpies();
		given.noAxiosConfig();
		given.bitbucketAPIInstance();
		given.axiosMockAdapter();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});


	//-- Valid default state
	test(`Ensure axios is valid`, () => {
		given.actualAxios();
		given.property('axios');
		when.propertyFetched();
		then.propertyValueShouldBeAxiosInstance();
	});

	test(`Ensure default options are valid`, () => {
		given.property('axios');
		when.propertyFetched();
		then.defaultOptionsShouldBeValid();
	});


	//-- Interceptor works
	test(`Ensure it is authenticated`, async () => {
		given.bitbucketAPIEnsureAuthenticatedSpy();
		await when.axiosUsed();
		then.ensureAuthenticatedShouldHaveBeenCalled();
	});

	test(`Ensure token is in headers`, async () => {
		given.axiosMock();
		given.tokenFetched();
		await when.axiosUsed();
		then.headersShouldContainToken();
	});

	test(`Ensure data is replaced in url`, async () => {
		given.axiosMock();
		given.tokenFetched();
		given.userFetched();
		await when.axiosUsed();
		then.dataInUrlShouldBeReplaced();
	});

});
