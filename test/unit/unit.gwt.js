//--------------------------------------------------------
//-- Common - Unit tests
//--------------------------------------------------------
import * as gwt from '../base.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


//-- Given
given.importedBitbucketAPIInstance = () => {
	const { BitbucketAPI } = given.importedBitbucketAPI();

	return new BitbucketAPI('zyxwvutsrqponmlkji', 'abcdefghijklmnopqrstuvwxyz012345');
};


export { given, when, then };
