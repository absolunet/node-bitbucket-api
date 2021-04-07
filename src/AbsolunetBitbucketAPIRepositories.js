//--------------------------------------------------------
//-- AbsolunetBitbucketAPIRepositories
//--------------------------------------------------------
import { Joi, validateArgument } from '@absolunet/joi';
import __                        from '@absolunet/private-registry';



const addRepositoryUrls = (data) => {
	return {
		data,
		https: `https://bitbucket.org/${data.full_name}`,
		ssh:   `ssh://git@bitbucket.org/${data.full_name}.git`
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
	 * @throws {Error} If call fails.
	 * @returns {Repository|null} Repository data.
	 */
	async getUserRepository(repository) {
		validateArgument('repository', repository, Joi.string().required().empty());

		const { success, response: { data } } = await this.bitbucketAPI.get(`/repositories/{uuid}/${repository}`);

		if (!success) {
			if (data.error.message.endsWith(`${repository} not found`)) {
				return null;
			}

			throw new Error(data.error.message);
		}

		return addRepositoryUrls(data);
	}


	/**
	 * Create a user private git repository.
	 *
	 * @async
	 * @param {string} repository - Repository name.
	 * @throws {Error} If call fails.
	 * @returns {Repository} Repository data.
	 */
	async createUserRepository(repository) {
		validateArgument('repository', repository, Joi.string().required().empty());

		const { success, response: { data } } = await this.bitbucketAPI.post(
			`/repositories/{uuid}/${repository}`,
			{
				scm: 'git',
				is_private: true  // eslint-disable-line camelcase
			}
		);

		if (!success) {
			throw new Error(data.error.message);
		}

		return addRepositoryUrls(data);
	}

}


export default AbsolunetBitbucketAPIRepositories;
