//--------------------------------------------------------
//-- delete - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let response;
let bitbucketAPIDelete;
let bitbucketAPIAxiosDelete;


//-- Given - Reset
given.noResponse = () => {
	response = undefined;
};

given.noSpies = () => {
	bitbucketAPIDelete      = undefined;
	bitbucketAPIAxiosDelete = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};


//-- Given - Spies
given.bitbucketAPIDeleteSpy = () => {
	bitbucketAPIDelete = jest.spyOn(bitbucketAPI, 'delete');
};

given.bitbucketAPIAxiosDeleteSpy = () => {
	bitbucketAPIAxiosDelete = jest.spyOn(bitbucketAPI.axios, 'delete');
};

given.bitbucketAPIAxiosDeleteReturns = () => {
	given.bitbucketAPIAxiosDeleteSpy();
	bitbucketAPIAxiosDelete.mockReturnValueOnce({ data: { lorem: 'ipsum' } });
};

given.bitbucketAPIAxiosDeleteThrows = () => {
	given.bitbucketAPIAxiosDeleteSpy();
	bitbucketAPIAxiosDelete.mockImplementationOnce(() => { throw new Error('Mocked thrown error'); });
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		response = await bitbucketAPI.delete('/lorem', { foo: 'bar' });
	});
};


//-- Then
then.axiosDeleteShouldHaveBeenCalled = () => {
	expect(bitbucketAPIAxiosDelete).toHaveBeenCalled();
};

then.axiosDeleteShouldHaveReceivedTheSameParameters = () => {
	expect(bitbucketAPIAxiosDelete.mock.calls[0]).toStrictEqual(bitbucketAPIDelete.mock.calls[0]);
};

then.axiosDeleteShouldReturnTheSame = () => {
	expect(response).toStrictEqual({ data: { lorem: 'ipsum' } });
};


export { given, when, then };
