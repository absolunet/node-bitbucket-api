//--------------------------------------------------------
//-- constructor - Unit tests
//--------------------------------------------------------
import * as gwt from '../unit.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let BitbucketAPI;
let instance;
let consumerKey;
let consumerSecret;



//-- Given - Reset
given.noInstance = () => {
	instance = undefined;
};

given.noConsumer = () => {
	consumerKey    = undefined;
	consumerSecret = undefined;
};


//-- Given
given.importedPackage = () => {
	({ BitbucketAPI } = given.importedBitbucketAPI());
};

given.consumerKey = (value) => {
	consumerKey = value;
};

given.consumerSecret = (value) => {
	consumerSecret = value;
};

given.validConsumerKey = () => {
	given.consumerKey('zyxwvutsrqponmlkji');
};

given.validConsumerSecret = () => {
	given.consumerSecret('abcdefghijklmnopqrstuvwxyz012345');
};

given.validConsumer = () => {
	given.validConsumerKey();
	given.validConsumerSecret();
};


//-- When
when.newInstance = (options) => {
	when.attempting(() => {
		instance = new BitbucketAPI(options);
	});
};

when.newInstanceWithNoConsumerKey = () => {
	return when.newInstance({ consumerSecret });
};

when.newInstanceWithNoConsumerSecret = () => {
	return when.newInstance({ consumerKey });
};

when.newInstanceWithFullOptions = () => {
	return when.newInstance({ consumerKey, consumerSecret });
};


//-- Then
then.instanceToBeValid = () => {
	expect(instance.constructor.name).toBe('AbsolunetBitbucketAPI');
};


export { given, when, then };
