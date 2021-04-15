//--------------------------------------------------------
//-- AbsolunetBitbucketAPIRepositories
//--------------------------------------------------------
import { Joi, validateArgument } from '@absolunet/joi';
import __                        from '@absolunet/private-registry';



const addRepositoryUrls = (response) => {
	return {
		response,
		https: `https://bitbucket.org/${response.data.full_name}`,
		ssh:   `ssh://git@bitbucket.org/${response.data.full_name}.git`
	};
};






/**
 * Repositories helpers.
 */
class AbsolunetBitbucketAPIRepositories {

	/**
	 * Create a helper instance.
	 *
	 * @param {AbsolunetBitbucketAPI} bitbucketAPI - Instance of BitbucketAPI.
	 */
	constructor(bitbucketAPI) {
		validateArgument('bitbucketAPI', bitbucketAPI, Joi.object().required());

		__(this).set('bitbucketAPI', bitbucketAPI);
	}


	/**
	 * BitbucketAPI instance.
	 *
	 * @type {AbsolunetBitbucketAPI}
	 */
	get bitbucketAPI() {
		return __(this).get('bitbucketAPI');
	}


	/**
	 * Get a user git repository urls.
	 *
	 * @async
	 * @param {string} repository - Repository name.
	 * @returns {Repository} Repository data.
	 */
	async getUserRepository(repository) {
		validateArgument('repository', repository, Joi.string().required().empty());

		return addRepositoryUrls(await this.bitbucketAPI.get(`/repositories/{uuid}/${repository}`));
	}


	/**
	 * Create a user private git repository.
	 *
	 * @async
	 * @param {string} repository - Repository name.
	 * @returns {Repository} Repository data.
	 */
	async createUserPrivateRepository(repository) {
		validateArgument('repository', repository, Joi.string().required().empty());

		return addRepositoryUrls(await this.bitbucketAPI.post(
			`/repositories/{uuid}/${repository}`,
			{
				scm: 'git',
				is_private: true  // eslint-disable-line camelcase
			}
		));
	}

}


export default AbsolunetBitbucketAPIRepositories;
