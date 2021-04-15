//--------------------------------------------------------
//-- Properties: Default - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let bitbucketAPI;
let propertyName;
let propertyValue;


//-- Given - Reset
given.noProperty = () => {
	propertyName = undefined;
	propertyValue = undefined;
};


//-- Given
given.bitbucketAPIInstance = () => {
	bitbucketAPI = given.importedBitbucketAPIInstance();
};

given.property = (name) => {
	propertyName = name;
};


//-- When
when.propertyFetched = () => {
	propertyValue = bitbucketAPI[propertyName];
};


//-- Then
then.propertyValueShouldBeRepositories = () => {
	expect(propertyValue).toBeObject();
	expect(propertyValue.constructor.name).toBe('AbsolunetBitbucketAPIRepositories');
};

then.propertyValueShouldBe = (expected) => {
	expect(propertyValue).toBe(expected);
};


export { given, when, then };
