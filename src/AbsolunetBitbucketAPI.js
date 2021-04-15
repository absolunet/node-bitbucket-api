//--------------------------------------------------------
//-- AbsolunetBitbucketAPI
//--------------------------------------------------------
import axios                             from 'axios';
import { ClientCredentials }             from 'simple-oauth2';
import { Joi, validateArgument }         from '@absolunet/joi';
import __                                from '@absolunet/private-registry';
import AbsolunetBitbucketAPIRepositories from './AbsolunetBitbucketAPIRepositories';



// URL parameters replacement
const replaceParameters = (url, user = {}) => {
	let finalUrl = url;

	const replacements = {
		'{uuid}': user.uuid
	};

	Object.keys(replacements).forEach((id) => {
		finalUrl = finalUrl.replaceAll(id, replacements[id]);
	});

	return finalUrl;
};






/**
 * Bitbucket API.
 */
class AbsolunetBitbucketAPI {

	/**
	 * Create a Bitbucket API instance.
	 *
	 * @param {string} consumerKey - The OAuth2 consumer key.
	 * @param {string} consumerSecret - The OAuth2 consumer secret.
	 */
	constructor(consumerKey, consumerSecret) {
		validateArgument('consumerKey',    consumerKey,    Joi.string().required().empty().alphanum().length(18));
		validateArgument('consumerSecret', consumerSecret, Joi.string().required().empty().alphanum().length(32));

		// Consumer credentials
		__(this).set('consumerKey',    consumerKey);
		__(this).set('consumerSecret', consumerSecret);


		// Set axios
		const bitbucketAxios = axios.create({
			baseURL:        'https://api.bitbucket.org/2.0',
			responseType:   'json',
			validateStatus: () => { return true; }
		});

		bitbucketAxios.interceptors.request.use(async (config) => {

			// Ensure authentication
			if (!this.authenticated) {
				await this.authenticate();
			}

			// Add OAuth2 token
			if (__(this).get('token')) {
				config.headers.Authorization = `Bearer ${__(this).get('token')}`;
			}

			// Replace data in url
			config.url = replaceParameters(config.url, this.user);

			return config;
		}, (error) => { return Promise.reject(error); });

		__(this).set('axios', bitbucketAxios);


		// Submodule
		__(this).set('repositories', new AbsolunetBitbucketAPIRepositories(this));
	}


	/**
	 * Get repositories methods.
	 *
	 * @type {AbsolunetBitbucketAPIRepositories}
	 */
	get repositories() {
		return __(this).get('repositories');
	}


	/**
	 * The {@link https://axios-http.com/docs/instance/ axios instance}.
	 *
	 * @type {object}
	 */
	get axios() {
		return __(this).get('axios');
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
	 * Is currently authenticated.
	 *
	 * @type {boolean}
	 */
	get authenticated() {
		return Boolean(__(this).get('token'));
	}


	/**
	 * Authenticate via OAuth2.
	 *
	 * @async
	 * @throws {Error} If access token can't be fetched.
	 * @returns {object} User.
	 */
	async authenticate() {
		const client = new ClientCredentials({
			client: {
				id:     __(this).get('consumerKey'),
				secret: __(this).get('consumerSecret')
			},
			auth: {
				tokenHost: 'https://bitbucket.org/site/',
				tokenPath: 'oauth2/access_token'
			}
		});


		// Fetch access token
		try {
			const accessToken = await client.getToken();
			if (!accessToken.token.access_token) {
				throw new Error('No token received');
			}

			__(this).set('token', accessToken.token.access_token);

		} catch (error) {
			throw new Error(`Access token can't be fetched: ${error.message}`);
		}


		// Fetch user data
		const { data } = await this.get('/user');
		__(this).set('user', data);


		return this.user;
	}



	//-- Raw API methods
	/**
	 * PUT method.
	 *
	 * @async
	 * @param {*} parameters - Same parameters as {@link https://axios-http.com/docs/api_intro/ axios.put()}.
	 * @returns {AxiosResponse} An {@link https://axios-http.com/docs/res_schema/ axios response}.
	 */
	put(...parameters) {
		return this.axios.put(...parameters);
	}


	/**
	 * POST method.
	 *
	 * @async
	 * @param {*} parameters - Same parameters as {@link https://axios-http.com/docs/api_intro/ axios.post()}.
	 * @returns {AxiosResponse} An {@link https://axios-http.com/docs/res_schema/ axios response}.
	 */
	post(...parameters) {
		return this.axios.post(...parameters);
	}


	/**
	 * GET method.
	 *
	 * @async
	 * @param {*} parameters - Same parameters as {@link https://axios-http.com/docs/api_intro/ axios.get()}.
	 * @returns {AxiosResponse} An {@link https://axios-http.com/docs/res_schema/ axios response}.
	 */
	get(...parameters) {
		return this.axios.get(...parameters);
	}


	/**
	 * DELETE method.
	 *
	 * @async
	 * @param {*} parameters - Same parameters as {@link https://axios-http.com/docs/api_intro/ axios.delete()}.
	 * @returns {AxiosResponse} An {@link https://axios-http.com/docs/res_schema/ axios response}.
	 */
	delete(...parameters) {
		return this.axios.delete(...parameters);
	}

}


export default AbsolunetBitbucketAPI;
