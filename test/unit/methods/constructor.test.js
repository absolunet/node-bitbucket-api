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
		when.newInstance();
		then.shouldNotHaveThrown();
		then.instanceToBeValid();
	});


	//-- consumerKey fails
	test(`Ensure when consumerKey is not defined it fails`, () => {
		given.consumerKey();
		given.validConsumerSecret();
		when.newInstance();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when consumerKey is empty string it fails`, () => {
		given.consumerKey('');
		given.validConsumerSecret();
		when.newInstance();
		then.shouldHaveThrownMessageContaining('is not allowed to be empty');
	});

	test(`Ensure when consumerKey is not alpha-numeric it fails`, () => {
		given.consumerKey(':');
		given.validConsumerSecret();
		when.newInstance();
		then.shouldHaveThrownMessageContaining('must only contain alpha-numeric characters');
	});

	test(`Ensure when consumerKey is too short it fails`, () => {
		given.consumerKey('12345678901234567');
		given.validConsumerSecret();
		when.newInstance();
		then.shouldHaveThrownMessageContaining('length must be');
	});

	test(`Ensure when consumerKey is too long it fails`, () => {
		given.consumerKey('1234567890123456789');
		given.validConsumerSecret();
		when.newInstance();
		then.shouldHaveThrownMessageContaining('length must be');
	});


	//-- consumerSecret fails
	test(`Ensure when consumerSecret is not defined it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret();
		when.newInstance();
		then.shouldHaveThrownMessageContaining('is required');
	});

	test(`Ensure when consumerSecret is empty string it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret('');
		when.newInstance();
		then.shouldHaveThrownMessageContaining('is not allowed to be empty');
	});

	test(`Ensure when consumerSecret is not alpha-numeric it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret(':');
		when.newInstance();
		then.shouldHaveThrownMessageContaining('must only contain alpha-numeric characters');
	});

	test(`Ensure when consumerSecret is too short it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret('1234567890123456789012345678901');
		when.newInstance();
		then.shouldHaveThrownMessageContaining('length must be');
	});

	test(`Ensure when consumerSecret is too long it fails`, () => {
		given.validConsumerKey();
		given.consumerSecret('123456789012345678901234567890123');
		when.newInstance();
		then.shouldHaveThrownMessageContaining('length must be');
	});

});
