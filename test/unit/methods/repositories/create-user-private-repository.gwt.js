//--------------------------------------------------------
//-- createUserPrivateRepository - Unit tests
//--------------------------------------------------------
import * as gwt from '../../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let response;
let repository;
let bitbucketAPIPost;


//-- Given - Reset
given.noResponse = () => {
	response = undefined;
};

given.noRepository = () => {
	repository = undefined;
};

given.noSpies = () => {
	bitbucketAPIPost = undefined;
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
given.bitbucketAPIPostSpy = () => {
	bitbucketAPIPost = jest.spyOn(bitbucketAPI, 'post');
};

given.bitbucketAPIPostReturns = () => {
	given.bitbucketAPIPostSpy();
	bitbucketAPIPost.mockReturnValueOnce({ data: { full_name: 'foo/bar' } });  // eslint-disable-line camelcase
};

given.bitbucketAPIPostThrows = () => {
	given.bitbucketAPIPostSpy();
	bitbucketAPIPost.mockImplementationOnce(() => { throw new Error('Mocked thrown error'); });
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		response = await bitbucketAPI.repositories.createUserPrivateRepository(repository);
	});
};


//-- Then
then.shouldHaveCallAValidUrl = () => {
	expect(bitbucketAPIPost).toHaveBeenCalled();
	expect(bitbucketAPIPost.mock.calls[0]).toEqual([
		'/repositories/{uuid}/lorem',
		{
			scm: 'git',
			is_private: true  // eslint-disable-line camelcase
		}
	]);
};

then.shouldReturnAValidResponse = () => {
	expect(response).toStrictEqual({
		response: { data: { full_name: 'foo/bar' } },  // eslint-disable-line camelcase
		https: `https://bitbucket.org/foo/bar`,
		ssh:   `ssh://git@bitbucket.org/foo/bar.git`
	});
};


export { given, when, then };
