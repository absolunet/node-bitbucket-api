//--------------------------------------------------------
//-- Properties: Default - Unit tests
//--------------------------------------------------------
import { given, when, then } from './default.gwt';


describe(`Validate that properties works`, () => {

	beforeEach(() => {
		given.noProperty();
		given.bitbucketAPIInstance();
	});


	//-- Submodule
	test(`Ensure repositories is valid`, () => {
		given.property('repositories');
		when.propertyFetched();
		then.propertyValueShouldBeRepositories();
	});


	//-- Not authenticated
	test(`Ensure user is not defined before authentication`, () => {
		given.property('user');
		when.propertyFetched();
		then.propertyValueShouldBe();
	});

	test(`Ensure authenticated is false before authentication`, () => {
		given.property('authenticated');
		when.propertyFetched();
		then.propertyValueShouldBe(false);
	});

});
