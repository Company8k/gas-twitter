// Hide replies

/**
 * Hides or unhides a reply to a Tweet.
 *
 * @param {string} id Unique identifier of the Tweet to hide or unhide. The Tweet must belong to a conversation initiated by the authenticating user.
 * @param {boolean} hidden Indicates the action to perform. Specify true to hide the Tweet, false to unhide. Trying to hide a Tweet that's already hidden (or unhide a Tweet that is not hidden) will result in a successful call.
 * @return {Object} returns parsed response
 */
function hide(id, hidden){ return fetchPut_(ENDPOINT.concat(`tweets/${id}/hidden`), {hidden: hidden}); }

// Likes

/**
 * Allows a user or authenticated user ID to unlike a Tweet.
 *
 * The request succeeds with no action when the user sends a request to a user they're not liking the Tweet or have already unliked the Tweet.
 *
 * @param {string} id The user ID who you are removing a Like of a Tweet on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} tweet_id The ID of the Tweet that you would like the <code>id</code> to unlike.
 */
function deleteLike(id, tweet_id){ fetchDelete_(ENDPOINT.concat(`users/${id}/likes/${tweet_id}`)); }

/**
 * Causes the user ID identified in the path parameter to Like the target Tweet.
 *
 * @param {string} id The user ID who you are liking a Tweet on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} tweet_id 	The ID of the Tweet that you would like the user <code>id</code> to Like.
 * @return {Object} returns parsed response
 */
function like(id, tweet_id){ return fetchPost_(ENDPOINT.concat(`users/${id}/likes`),{tweet_id: tweet_id}); }

/**
 * Allows you to get information about a user’s liked Tweets.
 *
 * @param {string} id User ID of the user to request liked Tweets for.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/likes/api-reference/get-users-id-liked_tweets for possible fields
 * @return {Object} returns parsed response
 */
function likedTweets(id, fields){
  if( !id ) throw 'User ID of the user is requierd';
  return fetchGet_(ENDPOINT.concat(`users/${id}/liked_tweets`),fields);
}

/**
 * Allows you to get information about a Tweet’s liking users.
 *
 * You will receive the most recent 100 users who liked the specified Tweet.
 *
 * @param {string} id Tweet ID of the Tweet to request liking users of.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/likes/api-reference/get-tweets-id-liking_users for possible fields
 * @return {Object} returns parsed response
 */
function likingUsers(id, fields){
  if( !id ) throw 'Tweet ID of the Tweet is requierd';
  return fetchGet_(ENDPOINT.concat(`tweets/${id}/liking_users`),fields);
}

// Retweets

/**
 * Allows a user or authenticated user ID to remove the Retweet of a Tweet.
 *
 * The request succeeds with no action when the user sends a request to a user they're not Retweeting the Tweet or have already removed the Retweet of.
 *
 * @param {string} user_id The user ID who you are removing a the Retweet of a Tweet on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} source_tweet_id The ID of the Tweet that you would like the <code>id</code> to remove the Retweet of.
 * @return {Object} returns parsed response
 */
function deleteRetweet(user_id, source_tweet_id){ fetchDelete_(ENDPOINT.concat(`users/${user_id}/retweet/${source_tweet_id}`)); }

/**
 * Causes the user ID identified in the path parameter to Retweet the target Tweet.
 *
 * @param {string} id The user ID who you are Retweeting a Tweet on behalf of. It must match your own user ID or that of an authenticating user, meaning that you must pass the Access Tokens associated with the user ID when authenticating your request.
 * @param {string} tweet_id The ID of the Tweet that you would like the user id to Retweet.
 * @return {Object} returns parsed response
 */
function retweet(id, tweet_id){ return fetchPost_(ENDPOINT.concat(`users/${id}/retweets`),{tweet_id: tweet_id}); }

/**
 * Allows you to get information about who has Retweeted a Tweet.
 *
 * @param {string} id Tweet ID of the Tweet to request Retweeting users of.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/retweets/api-reference/get-tweets-id-retweeted_by for possible fields
 * @return {Object} returns parsed response
 */
function retweetedBy(id, fields){
  if( !id ) throw 'id is requierd';
  return fetchGet_(ENDPOINT.concat(`tweets/${id}/retweeted_by`),fields);
}

// Tweet counts recent

/**
 * The recent Tweet counts endpoint returns count of Tweets from the last seven days that match a query.
 *
 * @param {string} query One query for matching Tweets.
 * @param {Object} options see https://developer.twitter.com/en/docs/twitter-api/tweets/counts/api-reference/get-tweets-counts-recent for possible fields
 * @return {Object} returns parsed response
 */
function counts(query, options){
  let endpoint = ENDPOINT + 'tweets/counts/recent';
  if( !query ) throw 'query is required'
  endpoint += '?query='.concat(percentEncode_(query));
  if(options) endpoint += '&'.concat(fieldsToQuery_(options));
  return fetchGetBearer_(endpoint);
}

// Timelines/Mentions

/**
 * Returns Tweets mentioning a single user specified by the requested user ID. By default, the most recent ten Tweets are returned per request. Using pagination, up to the most recent 800 Tweets can be retrieved.
 *
 * @param {string} id Returns Tweets mentioning a single user specified by the requested user ID. By default, the most recent ten Tweets are returned per request. Using pagination, up to the most recent 800 Tweets can be retrieved.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-mentions for possible fields
 * @return {Object} returns parsed response
 */
function mentions(id, fields){
  if( !id ) throw 'user_id is requiered';
  return fetchGet_(ENDPOINT.concat(`users/${id}/mentions`),fields);
}

/**
 * Returns Tweets composed by a single user, specified by the requested user ID. By default, the most recent ten Tweets are returned per request. Using pagination, the most recent 3,200 Tweets can be retrieved.
 *
 * @param {(string|number)} id User id
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets for possible fields
 * @return {Object} returns parsed response
 */
function timeline(id, fields){
  if( !id ) throw 'user_id is requiered'; return fetchGet_(ENDPOINT.concat(`users/${id}/tweets`),fields);
}

// Manage tweets

/**
 * Returns a variety of information about the Tweet specified by the requested ID or list of IDs.
 *
 * @param {(string[]|number[])} ids An array of Tweet IDs. Up to 100 are allowed in a single request.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets for possible fields
 * @return {Object} returns parsed response
 */
function getTweets(ids, fields){
  if( !Array.isArray(ids) ) throw 'ids must be an array of tweet ids';
  let endpoint = ENDPOINT.concat('tweets');
  if( checkNonPublicMetrics_(fields) ) return fetchGetOauth_(endpoint,{...{ids:ids},...fields});
  endpoint += '?ids='.concat(ids.join(','));
  if( fields ) endpoint += '&'.concat(fieldsToQuery_(fields));
  return fetchGetBearer_(endpoint);
}

/**
 * Returns a variety of information about a single Tweet specified by the requested ID.
 *
 * @param {(string|number)} id Unique identifier of the Tweet to request.
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id for possible fields
 * @return {Object} returns parsed response
 */
function getTweet(id, fields){
  if( !id ) throw 'tweet id is requiered';
  return fetchGet_(ENDPOINT.concat(`tweets/${id}`),fields);
}

/**
 * Creates a Tweet on behalf of an authenticated user.
 *
 * @param {Object} body see https://developer.twitter.com/en/docs/twitter-api/tweets/manage-tweets/api-reference/post-tweets for possible params
 * @return {Object} returns parsed response
 */
function tweet(body){ return fetchPost_(ENDPOINT.concat('tweets'), body); }

/**
 * Creates a Tweet on behalf of an authenticated user.
 *
 * @param {(string|number)} id The Tweet ID you are deleting.
 * @return {Object} returns parsed resposne
 */
function deleteTweet(id){ fetchDelete_(`${ENDPOINT}tweets/${id}`); }

//Search

/**
 * The recent search endpoint returns Tweets from the last seven days that match a search query.
 *
 * @param {string} query One query for matching Tweets. (requiered)
 * @param {Object} fields see https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent for possible params
 * @return {Object} returns parsed response
 */
function search(query, fields){
  let endpoint = ENDPOINT + 'tweets/search/recent';
  if( !query ) throw 'query is required'
  endpoint += '?query='.concat(percentEncode_(query));
  if(fields) endpoint += '&'.concat(fieldsToQuery_(fields));
  return fetchGetBearer_(endpoint);
}
