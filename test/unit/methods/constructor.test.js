//--------------------------------------------------------
//-- constructor - Unit tests
//--------------------------------------------------------
import { given, when, then } from './constructor.gwt';


describe(`Validate that constructor works`, () => {

	beforeEach(() => {
		given.noException();
		given.noConsumer();
		given.noInstance();
		given.importedPackage();
	});


	//-- Works
	test(`Ensure when instantiated it works`, () => {
		given.validConsumer();
		when.newInstanceWithFullOptions();
		then.shouldNotHaveThrown();
		then.instanceToBeValid();
	});


	//-- Options
	test(`Ensure when options are not defined it fails`, () => {
		when.newInstance();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when options are empty not defined it fails`, () => {
		when.newInstance({});
		then.shouldHaveThrownMessageContaining('is required');
	});


	//-- consumerKey
	test(`Ensure when consumerKey does not exists it fails`, () => {
		given.validConsumerSecret();
		when.newInstanceWithNoConsumerKey();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when consumerKey is not defined it fails`, () => {
		given.consumerKey();
		given.validConsumerSecret();
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when consumerKey is empty string it fails`, () => {
		given.consumerKey('');
		given.validConsumerSecret();
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('is not allowed to be empty');
	});

	test(`Ensure when consumerKey is not alpha-numeric it fails`, () => {
		given.consumerKey(':');
		given.validConsumerSecret();
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('must only contain alpha-numeric characters');
	});

	test(`Ensure when consumerKey is too short it fails`, () => {
		given.consumerKey('12345678901234567');
		given.validConsumerSecret();
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('length must be');
	});

	test(`Ensure when consumerKey is too long it fails`, () => {
		given.consumerKey('1234567890123456789');
		given.validConsumerSecret();
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('length must be');
	});


	//-- consumerSecret fails
	test(`Ensure when consumerSecret does not exists it fails`, () => {
		given.validConsumerKey();
		when.newInstanceWithNoConsumerSecret();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when consumerSecret is not defined it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret();
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when consumerSecret is empty string it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret('');
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('is not allowed to be empty');
	});

	test(`Ensure when consumerSecret is not alpha-numeric it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret(':');
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('must only contain alpha-numeric characters');
	});

	test(`Ensure when consumerSecret is too short it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret('1234567890123456789012345678901');
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('length must be');
	});

	test(`Ensure when consumerSecret is too long it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret('123456789012345678901234567890123');
		when.newInstanceWithFullOptions();
		then.shouldHaveThrownMessageContaining('length must be');
	});

});
