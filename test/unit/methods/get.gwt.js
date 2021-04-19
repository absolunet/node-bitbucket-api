//--------------------------------------------------------
//-- get - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let response;
let bitbucketAPIGet;
let bitbucketAPIAxiosGet;


//-- Given - Reset
given.noResponse = () => {
	response = undefined;
};

given.noSpies = () => {
	bitbucketAPIGet      = undefined;
	bitbucketAPIAxiosGet = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};


//-- Given - Spies
given.bitbucketAPIGetSpy = () => {
	bitbucketAPIGet = jest.spyOn(bitbucketAPI, 'get');
};

given.bitbucketAPIAxiosGetSpy = () => {
	bitbucketAPIAxiosGet = jest.spyOn(bitbucketAPI.axios, 'get');
};

given.bitbucketAPIAxiosGetReturns = () => {
	given.bitbucketAPIAxiosGetSpy();
	bitbucketAPIAxiosGet.mockReturnValueOnce({ data: { lorem: 'ipsum' } });
};

given.bitbucketAPIAxiosGetThrows = () => {
	given.bitbucketAPIAxiosGetSpy();
	bitbucketAPIAxiosGet.mockImplementationOnce(() => { throw new Error('Mocked thrown error'); });
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		response = await bitbucketAPI.get('/lorem', { foo: 'bar' });
	});
};


//-- Then
then.axiosGetShouldHaveBeenCalled = () => {
	expect(bitbucketAPIAxiosGet).toHaveBeenCalled();
};

then.axiosGetShouldHaveReceivedTheSameParameters = () => {
	expect(bitbucketAPIAxiosGet.mock.calls[0]).toStrictEqual(bitbucketAPIGet.mock.calls[0]);
};

then.axiosGetShouldReturnTheSame = () => {
	expect(response).toStrictEqual({ data: { lorem: 'ipsum' } });
};


export { given, when, then };
