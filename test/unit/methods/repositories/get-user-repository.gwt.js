//--------------------------------------------------------
//-- getUserRepository - Unit tests
//--------------------------------------------------------
import * as gwt from '../../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let response;
let repository;
let bitbucketAPIGet;


//-- Given - Reset
given.noResponse = () => {
	response = undefined;
};

given.noRepository = () => {
	repository = undefined;
};

given.noSpies = () => {
	bitbucketAPIGet = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};

given.repository = (value) => {
	repository = value;
};

given.validRepository = () => {
	given.repository('lorem');
};


//-- Given - Spies
given.bitbucketAPIGetSpy = () => {
	bitbucketAPIGet = jest.spyOn(bitbucketAPI, 'get');
};

given.bitbucketAPIGetReturns = () => {
	given.bitbucketAPIGetSpy();
	bitbucketAPIGet.mockReturnValueOnce({ data: { full_name: 'foo/bar' } });  // eslint-disable-line camelcase
};

given.bitbucketAPIGetThrows = () => {
	given.bitbucketAPIGetSpy();
	bitbucketAPIGet.mockImplementationOnce(() => { throw new Error('Mocked thrown error'); });
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		response = await bitbucketAPI.repositories.getUserRepository(repository);
	});
};


//-- Then
then.shouldHaveCallAValidUrl = () => {
	expect(bitbucketAPIGet).toHaveBeenCalled();
	expect(bitbucketAPIGet.mock.calls[0]).toEqual(['/repositories/{uuid}/lorem']);
};

then.shouldReturnAValidResponse = () => {
	expect(response).toStrictEqual({
		response: { data: { full_name: 'foo/bar' } },  // eslint-disable-line camelcase
		https: `https://bitbucket.org/foo/bar`,
		ssh:   `ssh://git@bitbucket.org/foo/bar.git`
	});
};


export { given, when, then };
