//--------------------------------------------------------
//-- BitbucketAPI - Feature tests
//--------------------------------------------------------
import { given, when, then } from './index.gwt';


describe(`Validate that it works`, () => {

	beforeEach(() => {
		given.noException();
		given.noImportedPackage();
	});


	test(`Ensure import works`, () => {
		when.imported();
		then.importShouldContainMainComponent();
		then.mainComponentShouldBeValid();
	});

});

