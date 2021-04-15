//--------------------------------------------------------
//-- BitbucketAPI - Feature tests
//--------------------------------------------------------
import * as gwt from '../base.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let BitbucketAPI;


//-- Given - Reset
given.noImportedPackage = () => {
	BitbucketAPI = undefined;
};


//-- When
when.imported = () => {
	({ BitbucketAPI } = jest.requireActual('../..'));
};


//-- Then
then.importShouldContainMainComponent = () => {
	expect(BitbucketAPI).toBeFunction();
};

then.mainComponentShouldBeValid = () => {
	expect(BitbucketAPI.name).toBe('AbsolunetBitbucketAPI');
};


export { given, when, then };
