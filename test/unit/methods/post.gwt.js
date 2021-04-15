//--------------------------------------------------------
//-- post - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let response;
let bitbucketAPIPost;
let bitbucketAPIAxiosPost;


//-- Given - Reset
given.noResponse = () => {
	response = undefined;
};

given.noSpies = () => {
	bitbucketAPIPost      = undefined;
	bitbucketAPIAxiosPost = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};


//-- Given - Spies
given.bitbucketAPIPostSpy = () => {
	bitbucketAPIPost = jest.spyOn(bitbucketAPI, 'post');
};

given.bitbucketAPIAxiosPostSpy = () => {
	bitbucketAPIAxiosPost = jest.spyOn(bitbucketAPI.axios, 'post');
};

given.bitbucketAPIAxiosPostReturns = () => {
	given.bitbucketAPIAxiosPostSpy();
	bitbucketAPIAxiosPost.mockReturnValueOnce({ data: { lorem: 'ipsum' } });
};

given.bitbucketAPIAxiosPostThrows = () => {
	given.bitbucketAPIAxiosPostSpy();
	bitbucketAPIAxiosPost.mockImplementationOnce(() => { throw new Error('Mocked thrown error'); });
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		response = await bitbucketAPI.post('/lorem', { foo: 'bar' }, { abc: 'xyz' });
	});
};


//-- Then
then.axiosPostShouldHaveBeenCalled = () => {
	expect(bitbucketAPIAxiosPost).toHaveBeenCalled();
};

then.axiosPostShouldHaveReceivedTheSameParameters = () => {
	expect(bitbucketAPIAxiosPost.mock.calls[0]).toStrictEqual(bitbucketAPIPost.mock.calls[0]);
};

then.axiosPostShouldReturnTheSame = () => {
	expect(response).toStrictEqual({ data: { lorem: 'ipsum' } });
};


export { given, when, then };
