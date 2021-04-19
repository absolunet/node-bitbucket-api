/**
 * Repository data + git https and ssh urls.
 *
 * @typedef {object} Repository
 * @property {object} response - An {@link https://axios-http.com/docs/res_schema/ axios response} containing a {@link https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D#get Bitbucket repository}.
 * @property {string} https - Repository https url.
 * @property {string} ssh - Repository ssh url.
 */
