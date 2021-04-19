//--------------------------------------------------------
//-- axios - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let actualAxios;
let axiosMockAdapter;
let actualPrivateRegistry;
let propertyName;
let propertyValue;
let bitbucketAPIEnsureAuthenticated;
let axiosConfig;


//-- Given - Reset
given.noActualPackages = () => {
	actualAxios = undefined;
	actualPrivateRegistry = undefined;
};

given.noProperty = () => {
	propertyName = undefined;
	propertyValue = undefined;
};

given.noSpies = () => {
	bitbucketAPIEnsureAuthenticated = undefined;
};

given.noAxiosConfig = () => {
	axiosConfig = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};

given.actualAxios = () => {
	actualAxios = jest.requireActual('axios');
};

given.axiosMockAdapter = () => {
	const MockAdapter = jest.requireActual('axios-mock-adapter');
	axiosMockAdapter = new MockAdapter(bitbucketAPI.axios);
};

given.privateRegistry = () => {
	actualPrivateRegistry = jest.requireActual('@absolunet/private-registry');
};

given.property = (name) => {
	propertyName = name;
};

given.bitbucketAPIEnsureAuthenticatedSpy = () => {
	bitbucketAPIEnsureAuthenticated = jest.spyOn(bitbucketAPI, 'ensureAuthenticated').mockImplementationOnce(async () => { /**/ });
};

given.tokenFetched = () => {
	given.privateRegistry();
	actualPrivateRegistry(bitbucketAPI).set('token', '1234567890');
};

given.userFetched = () => {
	given.privateRegistry();
	actualPrivateRegistry(bitbucketAPI).set('user', { uuid: '123e4567-e89b-12d3-a456-426614174000' });
};

given.axiosMock = () => {
	axiosMockAdapter.onGet().reply((config) => {
		axiosConfig = config;

		return [200, {}];
	});
};



//-- When
when.propertyFetched = () => {
	propertyValue = bitbucketAPI[propertyName];
};

when.axiosUsed = () => {
	return when.attemptingAsync(async () => {
		await bitbucketAPI.axios.get('/repositories/{uuid}/my-project/commits');
	});
};


//-- Then
then.propertyValueShouldBeAxiosInstance = () => {
	expect(propertyValue).toBeFunction();
	expect(propertyValue.constructor).toBe(actualAxios.create().constructor);
};

then.defaultOptionsShouldBeValid = () => {
	expect(bitbucketAPI.axios.defaults.baseURL).toBe('https://api.bitbucket.org/2.0');
	expect(bitbucketAPI.axios.defaults.responseType).toBe('json');
};

then.ensureAuthenticatedShouldHaveBeenCalled = () => {
	expect(bitbucketAPIEnsureAuthenticated).toHaveBeenCalled();
};

then.headersShouldContainToken = () => {
	expect(axiosConfig.headers.Authorization).toBe('Bearer 1234567890');
};

then.dataInUrlShouldBeReplaced = () => {
	expect(axiosConfig.url).toBe('/repositories/123e4567-e89b-12d3-a456-426614174000/my-project/commits');
};


export { given, when, then };
