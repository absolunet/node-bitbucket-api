//--------------------------------------------------------
//-- Bitbucket API
//--------------------------------------------------------
'use strict';

const axios        = require('axios');
const ow           = require('ow');
const simpleOAuth2 = require('simple-oauth2');
const __           = require('@absolunet/private-registry');


const call = async (url, options = {}) => {
	const params = {
		baseURL:        'https://api.bitbucket.org/2.0',
		url:            url,
		responseType:   'json',
		validateStatus: () => { return true; }
	};

	if (options.token) {
		params.headers = { Authorization: `Bearer ${options.token}` };
	}

	if (options.method) {
		params.method = options.method;
	}

	if (options.data) {
		params.data = options.data;
	}

	const { status, data } = await axios(params);

	return {
		success: status === 200,
		data:    data
	};
};


const replaceParams = (url, user) => {
	let finalUrl = url;

	if (user) {
		const replacements = {
			'{uuid}': user.uuid
		};

		Object.keys(replacements).forEach((id) => {
			finalUrl = finalUrl.replace(id, replacements[id]);
		});
	}

	return finalUrl;
};






class BitbucketAPI {

	//-- Full user object
	get user() {
		return __(this).get('user');
	}



	//-- Authenticate via OAuth2
	async authenticate(consumerKey, consumerSecret) {
		ow(consumerKey,    ow.string.nonEmpty.alphanumeric.length(18));
		ow(consumerSecret, ow.string.nonEmpty.alphanumeric.length(32));

		try {
			const oauth2 = simpleOAuth2.create({
				client: { id: consumerKey, secret: consumerSecret },
				auth: {
					tokenHost: 'https://bitbucket.org/site/oauth2',
					tokenPath: '/access_token'
				}
			});

			// Fetch access token
			const result      = await oauth2.clientCredentials.getToken();
			const accessToken = oauth2.accessToken.create(result);
			if (accessToken.token.access_token) {
				__(this).set('token', accessToken.token.access_token);
			}  else {
				throw new Error(`Access token can't be fetched`);
			}

			// Fetch user data
			const { success, data } = await this.get(`/user`);
			if (success) {
				__(this).set('user', data);
			} else {
				throw new Error(data.error ? data.error.message : `User info can't be fetched`);
			}

			return {
				success: true
			};

		} catch (error) {
			return {
				success: false,
				message: error.message
			};
		}
	}



	//-- Raw API methods
	put(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParams(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'PUT',
			data:   data
		});
	}


	post(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParams(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'POST',
			data:   data
		});
	}


	get(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParams(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'GET',
			data:   data
		});
	}


	delete(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParams(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'DELETE',
			data:   data
		});
	}

}


module.exports = BitbucketAPI;
