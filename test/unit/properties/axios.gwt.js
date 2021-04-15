//--------------------------------------------------------
//-- axios - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let actualAxios;
let actualPrivateRegistry;
let propertyName;
let propertyValue;
let bitbucketAPIAuthenticate;
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
	bitbucketAPIAuthenticate = undefined;
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

given.privateRegistry = () => {
	actualPrivateRegistry = jest.requireActual('@absolunet/private-registry');
};

given.property = (name) => {
	propertyName = name;
};

given.bitbucketAPIAuthenticateSpy = () => {
	bitbucketAPIAuthenticate = jest.spyOn(bitbucketAPI, 'authenticate').mockImplementationOnce(() => { /**/ });
};

given.tokenFetched = () => {
	given.privateRegistry();
	actualPrivateRegistry(bitbucketAPI).set('token', '1234567890');
};

given.userFetched = () => {
	given.privateRegistry();
	actualPrivateRegistry(bitbucketAPI).set('user', { uuid: '123e4567-e89b-12d3-a456-426614174000' });
};

given.axiosRequestInterceptor = () => {
	bitbucketAPI.axios.interceptors.request.use((config) => {
		axiosConfig = config;
		throw new Error('Block actual call');
	});

	// Force this interceptor to be the last executed
	bitbucketAPI.axios.interceptors.request.handlers.push(bitbucketAPI.axios.interceptors.request.handlers.shift());
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
	expect(bitbucketAPI.axios.defaults.validateStatus()).toBe(true);
};

then.authenticateShouldHaveBeenCalled = () => {
	expect(bitbucketAPIAuthenticate).toHaveBeenCalled();
};

then.headersShouldContainToken = () => {
	expect(axiosConfig.headers.Authorization).toBe('Bearer 1234567890');
};

then.dataInUrlShouldBeReplaced = () => {
	expect(axiosConfig.url).toBe('/repositories/123e4567-e89b-12d3-a456-426614174000/my-project/commits');
};


export { given, when, then };
