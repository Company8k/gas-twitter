// Pinned Lists

/**
 * Enables the authenticated user to pin a List.
 *
 * @param {string} id The user ID who you are pinning a List on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} list_id The ID of the List that you would like the user <code>id</code> to pin.
 * @return {Object} returns parsed response
 */
function pinnList(id,list_id){ return fetchPost_(ENDPOINT.concat(`users/${id}/pinned_lists`),{ list_id:list_id }); }

/**
 * Enables the authenticated user to unpin a List.
 *
 * @param {string} id 	The user ID who you are unpin a List on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} list_id The ID of the List that you would like the user <code>id</code> to unpin.
 * @return {Object} returns parsed response
 */
function unpinList(id,list_id){ return fetchDelete_(ENDPOINT.concat(`users/${id}/pinned_lists/${list_id}`)); }

/**
 * Returns the Lists pinned by a specified user.
 *
 * @param {string} id The user ID whose pinned Lists you would like to retrieve. The user’s ID must correspond to the user ID of the authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/pinned-lists/api-reference/get-users-id-pinned_lists for possible fields
 * @return {Object} returns parsed response
 */
function getPinnedLists(id,fields){
  if( !id ) throw 'user id is required';
  return fetchGet_(ENDPOINT.concat(`users/${id}/pinned_lists`),fields);
}


// List follows

/**
 * Enables the authenticated user to unfollow a List.
 *
 * @param {string} id The user ID who you are unfollowing a List on behalf of.
 * @param {string} list_id The ID of the List that you would like the user id to unfollow.
 * @return {Object} returns parsed response
 */
function unfollowList(id,list_id){ return fetchDelete_(ENDPOINT.concat(`users/${id}/followed_lists/${list_id}`)); }

/**
 * Enables the authenticated user to follow a List.
 *
 * @param {string} id The user ID who you are following a List on behalf of.
 * @param {string} list_id The ID of the List that you would like the user <code>id</code> to follow.
 * @return {Object} returns parsed response
 */
function followList(id,list_id){ return fetchPost_(ENDPOINT.concat(`users/${id}/followed_lists`),{ list_id:list_id }); }

/**
 * Returns all Lists a specified user follows.
 *
 * @param {string} id The user ID whose followed Lists you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/list-follows/api-reference/get-users-id-followed_lists for possible fields
 * @return {Object} returns parsed response
 */
function followedLists(id,fields){
  if( !id ) throw 'user id is required';
  return fetchGet_(ENDPOINT.concat(`users/${id}/followed_lists`),fields);
}

/**
 * Returns a list of users who are followers of the specified List.
 *
 * @param {string} id The ID of the List whose followers you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/list-follows/api-reference/get-lists-id-followers for possible fields
 * @return {Object} returns parsed response
 */
function listFollowers(id,fields){
  if( !id ) throw 'list id is required';
  return fetchGet_(ENDPOINT.concat(`lists/${id}/followers`),fields);
}


// List members

/**
 * Enables the authenticated user to add a member to a List they own.
 *
 * @param {stirng} id The ID of the List you are adding a member to.
 * @param {string} user_id The ID of the user you wish to add as a member of the List.
 * @return {Object} returns parsed response
 */
function addListMember(id,user_id){ return fetchPost_(ENDPOINT.concat(`lists/${id}/members`),{ user_id:user_id }); }

/**
 * Enables the authenticated user to remove a member from a List they own.
 *
 * @param {string} id The ID of the List you are removing a member from.
 * @param {string} user_id The ID of the user you wish to remove as a member of the List.
 * @return {Object} returns parsed response
 */
function deleteListMember(id,user_id){ return fetchDelete_(ENDPOINT.concat(`lists/${id}/members/${user_id}`)); }

/**
 * Returns all Lists a specified user is a member of.
 *
 * @param {string} id The user ID whose List memberships you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/list-members/api-reference/get-users-id-list_memberships for possible fields
 * @return {Object} returns parsed response
 */
function listMemberships(id,fields){
  if( !id ) throw 'user id is required';
  return fetchGet_(ENDPOINT.concat(`users/${id}/list_memberships`),fields);
}

/**
 * Returns a list of users who are members of the specified List.
 *
 * @param {string} id The ID of the List whose members you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/list-members/api-reference/get-lists-id-members for possible fields
 * @return {Object} returns parsed response
 */
function listMembers(id,fields){
  if( !id ) throw 'list id is required';
  return fetchGet_(ENDPOINT.concat(`lists/${id}/members`),fields );
}

// List Tweets lookup

/**
 * Returns a list of Tweets from the specified List.
 *
 * @param {string} id The ID of the List whose Tweets you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/list-tweets/api-reference/get-lists-id-tweets for possible fields
 * @return {Object} returns parsed response
 */
function getListTweets(id,fields){
  if( !id ) throw 'list id is required';
  return fetchGet_(ENDPOINT.concat(`lists/${id}/tweets`),fields );
}


// Manage Lists

/**
 * Enables the authenticated user to delete a List that they own.
 *
 * @param {string} id The ID of the List to be deleted.
 * @return {Object} returns parsed response
 */
function deleteList(id){ return fetchDelete_(ENDPOINT.concat(`lists/${id}`)); }

/**
 * Enables the authenticated user to update the meta data of a specified List that they own.
 *
 * @param {string} id The ID of the List to be updated.
 * @param {Object} body see https://developer.twitter.com/en/docs/twitter-api/lists/manage-lists/api-reference/put-lists-id for possible params
 * @return {Object} returns parsed response
 */
function updateList(id,body){ return fetchPut_(ENDPOINT.concat(`lists/${id}`),body); }

/**
 * Enables the authenticated user to create a List.
 *
 * @param {Object} body see https://developer.twitter.com/en/docs/twitter-api/lists/manage-lists/api-reference/post-lists for possible params
 * @return {Object} returns parsed response
 */
function createList(body){ return fetchPost_(ENDPOINT.concat('lists'),body); }


// List lookup

/**
 * Returns all Lists owned by the specified user.
 *
 * @param {string} id The user ID whose owned Lists you would like to retrieve.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-users-id-owned_lists for possible fields
 * @return {Object} returns parsed response
 */
function getownedLists(id,fields){
  if( !id ) throw 'user id is required';
  return fetchGet_(ENDPOINT.concat(`users/${id}/owned_lists`),fields);
}

/**
 * Returns the details of a specified List.
 *
 * @param {(string|number)} id The ID of the List to lookup.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/lists/list-lookup/api-reference/get-lists-id for possible fields
 * @return {Object} returns parsed response
 */
function getList(id, fields){
  if( !id ) throw 'list id is required';
  return fetchGet_(ENDPOINT.concat(`lists/${id}`),fields);
}
