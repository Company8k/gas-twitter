// Mutes

/**
 * Allows an authenticated user ID to unmute the target user.
 *
 * The request succeeds with no action when the user sends a request to a user they're not muting or have already unmuted.
 *
 * @param {string} source_user_id The user ID who you would like to initiate an unmute on behalf of. The user’s ID must correspond to the user ID of the authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} target_user_id The user ID of the user that you would like the <code>source_user_id</code> to unmute.
 */
function unmute( source_user_id,target_user_id ){ fetchDelete_(ENDPOINT.concat(`users/${source_user_id}/muting/${target_user_id}`)); }

/**
 * Allows an authenticated user ID to mute the target user.
 *
 * @param {string} id The user ID who you would like to initiate the mute on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} target_user_id The user ID of the user that you would like the <code>id</code> to mute. The body should contain a string of the user ID inside of a JSON object.
 * @return {Object} returns parsed response
 */
function mute( id,target_user_id ){ return fetchPost_(ENDPOINT.concat(`users/${id}/muting`),{target_user_id: target_user_id}); }

/**
 * Returns a list of users who are muted by the specified user ID.
 *
 * @param {string} id The user ID whose muted users you would like to retrieve. The user’s ID must correspond to the user ID of the authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/mutes/api-reference/get-users-muting for possible fields
 * @return {Object} returns parsed response
 */
function getMutes( id,fields ){
  if( !id ) throw 'User id is requiered';
  return fetchGet_(ENDPOINT.concat(`users/${id}/muting`),fields)
}


// Blocks

/**
 * Allows a user or authenticated user ID to unblock another user.
 *
 * The request succeeds with no action when the user sends a request to a user they're not blocking or have already unblocked.
 *
 * @param {string} source_user_id The user ID who you would like to initiate an unblock on behalf of. The user’s ID must correspond to the user ID of the authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} target_user_id The user ID of the user that you would like the <code>source_user_id</code> to unblock.
 */
function unblock( source_user_id,target_user_id ){ fetchDelete_(ENDPOINT.concat(`users/${source_user_id}/blocking/${target_user_id}`)); }

/**
 * Causes the user (in the path) to block the target user. The user (in the path) must match the user context authorizing the request.
 *
 * @param {string} id The user ID who you would like to initiate the block on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} target_user_id The user ID of the user that you would like the <code>id</code> to block.
 * @return {Object} returns parsed response
 */
function block( id,target_user_id ){ return fetchPost_(ENDPOINT.concat(`users/${id}/blocking`),{target_user_id: target_user_id}); }

/**
 * Returns a list of users who are blocked by the specified user ID.
 *
 * @param {string} id The user ID whose blocked users you would like to retrieve. The user’s ID must correspond to the user ID of the authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/blocks/api-reference/get-users-blocking for possible fields
 * @return {Object} returns parsed response
 */
function getBlocks( id,fields ){
  if( !id ) throw 'User id is requiered';
  return fetchGet_(ENDPOINT.concat(`users/${id}/blocking`),fields);
}


// Follows

/**
 * Allows a user ID to unfollow another user.
 *
 * The request succeeds with no action when the authenticated user sends a request to a user they're not following or have already unfollowed.
 *
 * @param {string} source_user_id The user ID who you would like to initiate the unfollow on behalf of. You must pass the Access Tokens that relate to this user when authenticating the request.
 * @param {string} target_user_id The user ID of the user that you would like the <code>source_user_id</code> to unfollow.
 */
function unfollow( source_user_id,target_user_id ){ fetchDelete_(ENDPOINT.concat(`users/${source_user_id}/following/${target_user_id}`)); }

/**
 * Allows a user ID to follow another user.
 *
 * If the target user does not have public Tweets, this endpoint will send a follow request.
 *
 * The request succeeds with no action when the authenticated user sends a request to a user they're already following, or if they're sending a follower request to a user that does not have public Tweets.
 *
 * @param {string} id The authenticated user ID who you would like to initiate the follow on behalf of. You must pass the Access Tokens that relate to this user when authenticating the request.
 * @param {string} target_user_id The user ID of the user that you would like the <code>id</code> to follow.
 * @return {Object|null} returns parsed response or null
 */
function follow( id, target_user_id ){ return fetchPost_(ENDPOINT.concat(`users/${id}/following`),{target_user_id: target_user_id}); }

/**
 * Returns a list of users who are followers of the specified user ID.
 *
 * @param {string} id The user ID whose followers you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-followers for possible fields
 * @return {Object} return parsed response
 */
function followers( id, fields){
  if( !id ) throw 'User id is requiered';
  return fetchGet_(ENDPOINT.concat(`users/${id}/followers`),fields);
}

/**
 * Returns a list of users the specified user ID is following.
 *
 * @param {string} id The user ID whose following you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/follows/api-reference/get-users-id-following for possible fields
 * @return {Object} returns the parsed response
 */
function following( id, fields){
  if( !id ) throw 'User id is requiered';
  return fetchGet_(ENDPOINT.concat(`users/${id}/following`),fields);
}


// User lookup

/**
 * Returns a variety of information about one user specified by their usernames.
 *
 * @param {string} username The Twitter username (handle) of the user.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username for possible fields
 * @return {Object} returns parsed response
 */
function getUserByUsername( username, fields){
  if( !username ) throw 'username is requiered';
  return fetchGet_(ENDPOINT.concat(`users/by/username/${username}`),fields);
}

/**
 * Returns a variety of information about one or more users specified by their usernames.
 *
 * @param {string[]} usernames An array of Twitter usernames (handles). Up to 100 are allowed in a single request.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by for possible fields
 * @return {Object} returns parsed response
 */
function getUsersByUsername( usernames,fields ){
  if( !Array.isArray(usernames) ) throw 'usernames must be an array of usernames';
  let endpoint = ENDPOINT.concat('users/by');
  if( checkNonPublicMetrics_(fields) ) return fetchGetOauth_(endpoint,{...{usernames:usernames},...fields});
  endpoint += '?usernames='.concat(usernames.join(','));
  if( fields ) endpoint += '&'.concat(fieldsToQuery_(fields));
  return fetchGetBearer_(endpoint);
}

/**
 * Returns a variety of information about a single user specified by the requested ID.
 *
 * @param {string} id The ID of the user to lookup.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-id for possible fields
 * @return {Object} returns parsed response
 */
function getUser(id, fields){
  if( !id ) throw 'user id is requiered';
  return fetchGet_(ENDPOINT.concat(`users/${id}`),fields);
}

/**
 * Returns a variety of information about one or more users specified by the requested IDs.
 *
 * @param {string[]} ids An array of user IDs. Up to 100 are allowed in a single request.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users for possible fields
 * @return {Object} returns parsed response
 */
function getUsers(ids, fields){
  if( !Array.isArray(ids) ) throw 'ids must be an array of user ids'
  let endpoint = ENDPOINT.concat('users');
  if( checkNonPublicMetrics_(fields) ) return fetchGetOauth_(endpoint,{...{ids:ids},...fields});
  endpoint += '?ids='.concat(ids.join(','));
  if( fields ) endpoint += '&'.concat(fieldsToQuery_(fields));
  return fetchGetBearer_(endpoint);
}
