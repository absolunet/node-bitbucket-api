# @absolunet/bitbucket-api

[![npm](https://img.shields.io/npm/v/@absolunet/bitbucket-api.svg)](https://www.npmjs.com/package/@absolunet/bitbucket-api)
[![npm dependencies](https://david-dm.org/absolunet/node-bitbucket-api/status.svg)](https://david-dm.org/absolunet/node-bitbucket-api)
[![npms](https://badges.npms.io/%40absolunet%2Fbitbucket-api.svg)](https://npms.io/search?q=%40absolunet%2Fbitbucket-api)
[![Travis CI](https://travis-ci.com/absolunet/node-bitbucket-api.svg?branch=master)](https://travis-ci.com/absolunet/node-bitbucket-api/builds)
[![Code style ESLint](https://img.shields.io/badge/code_style-@absolunet/node-659d32.svg)](https://github.com/absolunet/eslint-config-node)

> [Bitbucket](https://bitbucket.org) [API](https://developer.atlassian.com/bitbucket/api/2/reference/) wrapper via OAuth2

Authenticate to Bitbutcket APIv2 via OAuth2 then call API directly


## Install

```sh
$ npm install @absolunet/bitbucket-api
```


## Usage

```js
const BitbucketAPI = require('@absolunet/bitbucket-api');

const CONSUMER_KEY    = 'zyxwvutsrqponmlkji';
const CONSUMER_SECRET = 'abcdefghijklmnopqrstuvwxyz012345';

const bitbucket      = new BitbucketAPI();
const authentication = await bitbucket.authenticate(CONSUMER_KEY, CONSUMER_SECRET);

if (authentication.success) {
	const { success, data } = bitbucket.get('/repositories/{uuid}/my-project');

	if (success) {
		console.log(data);
	}
}
```


## API - Login

### authenticate(consumerKey, consumerSecret)
Login to Bitbucket API<br>
`Promise` returns an `Object` with a `success` property

#### consumerKey
*Required*<br>
Type: `String`<br>
OAuth consumer key

#### consumerSecret
*Required*<br>
Type: `String`<br>
OAuth consumer secret



<br>

### user
Type: `Object`<br>
Currently logged user data






<br>

## API - Calls
All calls are `Promises` that returns an `Object` with `success` and `data` properties<br>
`url` param replaces `{uuid}` token with current user's UUID<br>

### put(url *[, data]*)
Calls API with PUT method<br>
`Promise` returns an `Object` described above

#### url
*Required*<br>
Type: `String`<br>
Truncated url to call

#### data
Type: `Object`<br>
Additional params to send in request body



<br>

### post(url *[, data]*)
Calls API with POST method<br>
`Promise` returns an `Object` described above

#### url
*Required*<br>
Type: `String`<br>
Truncated url to call

#### data
Type: `Object`<br>
Additional params to send in request body



<br>

### get(url *[, data]*)
Calls API with GET method<br>
`Promise` returns an `Object` described above

#### url
*Required*<br>
Type: `String`<br>
Truncated url to call

#### data
Type: `Object`<br>
Additional params to send in request body



<br>

### delete(url *[, data]*)
Calls API with DELETE method<br>
`Promise` returns an `Object` described above

#### url
*Required*<br>
Type: `String`<br>
Truncated url to call

#### data
Type: `Object`<br>
Additional params to send in request body






<br><br>

## License

MIT © [Absolunet](https://absolunet.com)
