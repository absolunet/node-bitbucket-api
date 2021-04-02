//--------------------------------------------------------
//-- AbsolunetBitbucketAPI
//--------------------------------------------------------
import axios        from 'axios';
import ow           from 'ow';
import simpleOAuth2 from 'simple-oauth2';
import __           from '@absolunet/private-registry';



// Base parameters
const baseParameters = {
	baseURL:        'https://api.bitbucket.org/2.0',
	responseType:   'json',
	validateStatus: () => { return true; }
};


// Axios instance
const axiosBitbucket = axios.create(baseParameters);


// Call wrapper
const call = async (url, options = {}) => {
	const parameters = {
		url,
		method:  options.method,
		data:    options.data,
		headers: options.token ? { Authorization: `Bearer ${options.token}` } : undefined
	};

	const response = await axiosBitbucket(parameters);

	return {
		...response,
		success: response.status === 200
	};
};


// URL parameters replacement
const replaceParameters = (url, user) => {
	let finalUrl = url;

	if (user) {
		const replacements = {
			'{uuid}': user.uuid
		};

		Object.keys(replacements).forEach((id) => {
			finalUrl = finalUrl.replaceAll(id, replacements[id]);
		});
	}

	return finalUrl;
};





/**
 * Bitbucket API.
 */
class AbsolunetBitbucketAPI {

	/**
	 * The {@link https://axios-http.com/docs/instance/ axios instance}.
	 *
	 * @type {object}
	 */
	get axios() {
		return axiosBitbucket;
	}


	/**
	 * Current {@link https://developer.atlassian.com/bitbucket/api/2/reference/resource/user Bitbucket user}.
	 *
	 * @type {object}
	 */
	get user() {
		return __(this).get('user');
	}


	/**
	 * Authenticate via OAuth2.
	 *
	 * @async
	 * @param {string} consumerKey - The OAuth2 consumer key.
	 * @param {string} consumerSecret - The OAuth2 consumer secret.
	 * @returns {AuthenticationResponse} Response.
	 */
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
	/**
	 * PUT method.
	 *
	 * @async
	 * @param {string} url - Url to call.
	 * @param {object} data - Data to send.
	 * @returns {CallResponse} Response.
	 */
	put(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParameters(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'PUT',
			data
		});
	}


	/**
	 * POST method.
	 *
	 * @async
	 * @param {string} url - Url to call.
	 * @param {object} data - Data to send.
	 * @returns {CallResponse} Response.
	 */
	post(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParameters(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'POST',
			data
		});
	}


	/**
	 * GET method.
	 *
	 * @async
	 * @param {string} url - Url to call.
	 * @param {object} data - Data to send.
	 * @returns {CallResponse} Response.
	 */
	get(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParameters(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'GET',
			data
		});
	}


	/**
	 * DELETE method.
	 *
	 * @async
	 * @param {string} url - Url to call.
	 * @param {object} data - Data to send.
	 * @returns {CallResponse} Response.
	 */
	delete(url, data) {
		ow(url,  ow.string.nonEmpty);
		ow(data, ow.optional.object);

		return call(replaceParameters(url, __(this).get('user')), {
			token:  __(this).get('token'),
			method: 'DELETE',
			data
		});
	}

}


export default AbsolunetBitbucketAPI;
