/**
 * Set Twitter API Bearer token
 *
 * @param {string} token Twitter API Bearer token
 * @return {Twitter} returns Twitter Object this
 */
function setBearerToken(token) { this.bearerToken = token; return this; }

/**
 * Set Twitter API consumer key
 *
 * @param {string} key Twitter API consumer key
 * @return {Twitter} returns Twitter Object this
 */
function setConsumerKey(key){ this.consumerKey = key; return this; }

/**
 * Set Twitter API consumer secret
 *
 * @param {string} secret Twitter API consumer secret
 * @return {Twitter} returns Twitter Object this
 */
function setConsumerSecret(secret){ this.consumerSecret = secret; return this; }

/**
 * Set Twitter API access token
 *
 * @param {string} token Twitter API access token
 * @return {Twitter} returns Twitter Object this
 */
function setAccessToken(token){ this.accessToken = token; return this; }

/**
 * Set Twitter API access token secret
 *
 * @param {string} secret Twitter API access token secret
 * @return {Twitter} return Twitter Object this
 */
function setAccessTokenSecret(secret){ this.accessTokenSecret = secret; return this; }
