//--------------------------------------------------------
//-- authenticate - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let response;


//-- Mocks
const mockedSimpleOAuth2ClientCredentialsInstance = {
	getToken: jest.fn()
};

const mockedSimpleOAuth2ClientCredentials = jest.fn()
	.mockImplementation(() => {
		return mockedSimpleOAuth2ClientCredentialsInstance;
	})
;


//-- Given - Reset
given.noResponse = () => {
	response = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};


//-- Given - simple-oauth2 mocks
given.mockedSimpleOAuth2 = () => {
	jest.mock('simple-oauth2', () => {
		return { ClientCredentials: mockedSimpleOAuth2ClientCredentials };
	});
};

given.mockedSimpleOAuth2GetTokenReturns = (value) => {
	mockedSimpleOAuth2ClientCredentialsInstance.getToken.mockReturnValueOnce({ token: { access_token: value } });  // eslint-disable-line camelcase
};

given.mockedSimpleOAuth2GetTokenReturnsValidToken = () => {
	given.mockedSimpleOAuth2GetTokenReturns('1234567890');
};

given.mockedSimpleOAuth2GetTokenThrows = () => {
	mockedSimpleOAuth2ClientCredentialsInstance.getToken.mockImplementationOnce(() => {
		throw new Error('Mocked thrown error');
	});
};


//-- Given - bitbucketAPI.get('/user') mocks
given.mockedBitbucketAPIUserFetchReturns = () => {
	jest.spyOn(bitbucketAPI, 'get').mockReturnValueOnce({ data: { uuid: '123e4567-e89b-12d3-a456-426614174000' } });
};

given.mockedBitbucketAPIUserFetchThrows = () => {
	jest.spyOn(bitbucketAPI, 'get').mockImplementationOnce(() => {
		throw new Error('Mocked thrown error');
	});
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		response = await bitbucketAPI.authenticate();
	});
};


//-- Then
then.shouldHaveReturnedAUser = () => {
	expect(response).toStrictEqual({ uuid: '123e4567-e89b-12d3-a456-426614174000' });
};

then.instanceAuthenticatedPropertyShouldBeValid = () => {
	expect(bitbucketAPI.authenticated).toBe(true);
};

then.instanceUserPropertyShouldBeValid = () => {
	expect(bitbucketAPI.user).toStrictEqual({ uuid: '123e4567-e89b-12d3-a456-426614174000' });
};


export { given, when, then };
