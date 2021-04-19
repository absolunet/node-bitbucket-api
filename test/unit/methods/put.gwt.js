//--------------------------------------------------------
//-- put - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let response;
let bitbucketAPIPut;
let bitbucketAPIAxiosPut;


//-- Given - Reset
given.noResponse = () => {
	response = undefined;
};

given.noSpies = () => {
	bitbucketAPIPut      = undefined;
	bitbucketAPIAxiosPut = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};


//-- Given - Spies
given.bitbucketAPIPutSpy = () => {
	bitbucketAPIPut = jest.spyOn(bitbucketAPI, 'put');
};

given.bitbucketAPIAxiosPutSpy = () => {
	bitbucketAPIAxiosPut = jest.spyOn(bitbucketAPI.axios, 'put');
};

given.bitbucketAPIAxiosPutReturns = () => {
	given.bitbucketAPIAxiosPutSpy();
	bitbucketAPIAxiosPut.mockReturnValueOnce({ data: { lorem: 'ipsum' } });
};

given.bitbucketAPIAxiosPutThrows = () => {
	given.bitbucketAPIAxiosPutSpy();
	bitbucketAPIAxiosPut.mockImplementationOnce(() => { throw new Error('Mocked thrown error'); });
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		response = await bitbucketAPI.put('/lorem', { foo: 'bar' }, { abc: 'xyz' });
	});
};


//-- Then
then.axiosPutShouldHaveBeenCalled = () => {
	expect(bitbucketAPIAxiosPut).toHaveBeenCalled();
};

then.axiosPutShouldHaveReceivedTheSameParameters = () => {
	expect(bitbucketAPIAxiosPut.mock.calls[0]).toStrictEqual(bitbucketAPIPut.mock.calls[0]);
};

then.axiosPutShouldReturnTheSame = () => {
	expect(response).toStrictEqual({ data: { lorem: 'ipsum' } });
};


export { given, when, then };
