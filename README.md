# @absolunet/bitbucket-api

[![npm][npm-badge]][npm-url]
[![npm dependencies][dependencies-badge]][dependencies-url]
[![Tests][tests-badge]][tests-url]
[![npms][npms-badge]][npms-url]
[![License: MIT][license-badge]][license-url]

> [Bitbucket API](https://developer.atlassian.com/bitbucket/api/2/reference/) wrapper via OAuth2

Authenticate to Bitbutcket APIv2 via OAuth2 then call API directly


## Install

```sh
$ npm install @absolunet/bitbucket-api
```


## Usage

```js
import { BitbucketAPI } from '@absolunet/bitbucket-api';

const bitbucket = new BitbucketAPI({
	consumerKey:    'zyxwvutsrqponmlkji',
	consumerSecret: 'abcdefghijklmnopqrstuvwxyz012345'
});

const { data } = await bitbucket.get('/repositories/{uuid}/my-project/commits');
console.log(data);

const { ssh } = await bitbucket.repositories.getUserRepository('my-project');
console.log(`The ssh url to my project is: ${ssh}`);
```


## Documentation

See the [full documentation](https://documentation.absolunet.com/node-bitbucket-api) for an in-depth look.

See the [Changelog](CHANGELOG.md) to see what has changed.


## Contribute

See the [Contributing Guidelines](CONTRIBUTING.md) for ways to get started.

See the [Support Guide](SUPPORT.md) for ways to get help.

See the [Security Policy](SECURITY.md) for sharing vulnerability reports.

This project has a [Code of Conduct](CODE_OF_CONDUCT.md).
By interacting with this repository, organization, or community you agree to abide by its terms.


## License

[MIT](LICENSE) © [Absolunet](https://absolunet.com)




[npm-badge]:          https://img.shields.io/npm/v/@absolunet/bitbucket-api?style=flat-square
[dependencies-badge]: https://img.shields.io/david/absolunet/node-bitbucket-api?style=flat-square
[tests-badge]:        https://img.shields.io/github/workflow/status/absolunet/node-bitbucket-api/tests/master?label=tests&style=flat-square
[npms-badge]:         https://badges.npms.io/%40absolunet%2Fbitbucket-api.svg?style=flat-square
[license-badge]:      https://img.shields.io/badge/license-MIT-green?style=flat-square

[npm-url]:          https://www.npmjs.com/package/@absolunet/bitbucket-api
[dependencies-url]: https://david-dm.org/absolunet/node-bitbucket-api
[tests-url]:        https://github.com/absolunet/node-bitbucket-api/actions?query=workflow%3Atests+branch%3Amaster
[npms-url]:         https://npms.io/search?q=%40absolunet%2Fbitbucket-api
[license-url]:      https://opensource.org/licenses/MIT
