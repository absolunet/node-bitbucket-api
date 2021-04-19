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
	const replacements = {
		'{uuid}': user.uuid
	};

	return Object.entries(replacements).reduce((finalUrl, [key, value]) => {
		return finalUrl.replaceAll(key, value);
	}, url);
};






/**
 * Bitbucket API.
 */
class AbsolunetBitbucketAPI {

	/**
	 * Create a Bitbucket API instance.
	 *
	 * @param {object} options - Options.
	 * @param {string} options.consumerKey - The OAuth2 consumer key.
	 * @param {string} options.consumerSecret - The OAuth2 consumer secret.
	 */
	constructor(options) {
		validateArgument('options', options, Joi.object({
			consumerKey:    Joi.string().required().empty().alphanum().length(18),
			consumerSecret: Joi.string().required().empty().alphanum().length(32)
		}).required());

		//-- Set client credentials
		const clientCredentials = new ClientCredentials({
			client: {
				id:     options.consumerKey,
				secret: options.consumerSecret
			},
			auth: {
				tokenHost: 'https://bitbucket.org/site/',
				tokenPath: 'oauth2/access_token'
			}
		});

		__(this).set('clientCredentials', clientCredentials);


		//-- Set axios
		const bitbucketAxios = axios.create({
			baseURL:      'https://api.bitbucket.org/2.0',
			responseType: 'json'
		});

		bitbucketAxios.interceptors.request.use(async (config) => {
			await this.ensureAuthenticated();

			// Add OAuth2 token
			if (__(this).get('token')) {
				config.headers.Authorization = `Bearer ${__(this).get('token')}`;
			}

			// Replace data in url
			config.url = replaceParameters(config.url, this.user);

			return config;
		}, (error) => { return Promise.reject(error); });

		__(this).set('axios', bitbucketAxios);


		//-- Submodule
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

		// Fetch access token
		try {
			const accessToken = await __(this).get('clientCredentials').getToken();
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


	/**
	 * Ensure authenticated.
	 *
	 * @returns {Promise} When authenticated.
	 */
	ensureAuthenticated() {
		return !this.authenticated ? this.authenticate() : undefined;
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
