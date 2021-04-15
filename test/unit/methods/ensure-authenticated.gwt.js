//--------------------------------------------------------
//-- ensureAuthenticated - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let bitbucketAPIAuthenticate;


//-- Given - Reset
given.noSpies = () => {
	bitbucketAPIAuthenticate = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};

given.bitbucketAPIAuthenticateSpy = () => {
	bitbucketAPIAuthenticate = jest.spyOn(bitbucketAPI, 'authenticate').mockImplementationOnce(async () => { /**/ });
};

given.authenticated = () => {
	jest.spyOn(bitbucketAPI, 'authenticated', 'get').mockReturnValueOnce(true);
};


//-- When
when.methodCalled = () => {
	return when.attemptingAsync(async () => {
		await bitbucketAPI.ensureAuthenticated();
	});
};


//-- Then
then.authenticateShouldHaveBeenCalled = () => {
	expect(bitbucketAPIAuthenticate).toHaveBeenCalled();
};

then.authenticateShouldNotHaveBeenCalled = () => {
	expect(bitbucketAPIAuthenticate).not.toHaveBeenCalled();
};


export { given, when, then };
