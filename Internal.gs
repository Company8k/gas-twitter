// HTTP related

/**
 * Fetch Twitter API via GET Both ways
 *
 * @param {string} endpoint Entpoint to fetch
 * @param {Object} params Request Params
 * @return {Object} parsed response
 */
function fetchGet_( endpoint,params ){
  if( checkNonPublicMetrics_(params) ) return fetchGetOauth_(endpoint, params);
  if(params) endpoint += '?'.concat(fieldsToQuery_(params));
  return fetchGetBearer_(endpoint);
}


/**
 * Fetch Twitter API via GET and OAuth signature
 *
 * @param {string} url URL to fetch
 * @param {Object} params Request Params
 * @return {Object} returns the parsed response
 */
function fetchGetOauth_(url, params){
  let method = "GET", oauth_headers = oauthHeaders_();
  let params_to_sign = Object.keys(params).reduce( (obj,key,index,arr) => {
    obj[key] = (Array.isArray(params[key])) ? params[key].join(',') : params[key];
    return obj;
  },{});
  oauth_headers.oauth_signature = sign_(method, url, {...params_to_sign, ...oauth_headers});
  url += '?'.concat(fieldsToQuery_(params));
  let fetch = UrlFetchApp.fetch(url, {
    method: method, headers: { Authorization: authorize_(oauth_headers) }
  });
  return JSON.parse(fetch.getContentText());
}

/**
 * Fetch Twitter API via GET and Bearer token
 *
 * @param {string} url URL to fetch
 * @return {Object} returns the parsed response
 */
function fetchGetBearer_(url){
  let fetch = UrlFetchApp.fetch(url,{
    method: 'GET', headers: { Authorization: `Bearer ${this.bearerToken}` }
  });
  return JSON.parse(fetch.getContentText());
}

/**
 * Fetch Twitter API via POST
 *
 * @param {string} url Endpoint to fetch
 * @param {Object} params Additional params to send
 * @return {Object} returns the parsed response
 */
function fetchPost_(url,params){
  let method = "POST", oauth_headers = oauthHeaders_();
  oauth_headers.oauth_signature = sign_(method, url, oauth_headers);
  let fetch = UrlFetchApp.fetch(url, {
    method: method, contentType: 'application/json', payload: JSON.stringify(params), headers: {
      Authorization: authorize_(oauth_headers)
    }
  });
  return JSON.parse(fetch.getContentText());
}

/**
 * Fetch Twitter API via PUT
 *
 * @param {string} url Endpoint to fetch
 * @param {Object} params Additional params to send
 * @return {Object} returns the parsed response
 */
function fetchPut_(url,params){
  let method = "PUT", oauth_headers = oauthHeaders_();
  oauth_headers.oauth_signature = sign_(method, url, oauth_headers);
  let fetch = UrlFetchApp.fetch(url, {
    method: method, contentType: 'application/json', payload: JSON.stringify(params), headers: {
      Authorization: authorize_(oauth_headers)
    }
  });
  return JSON.parse(fetch.getContentText());
}

/**
 * Fetch Twitter API via DELETE
 *
 * @param {string} url Endpoint to fetch
 */
function fetchDelete_(url){
  let method = "DELETE", oauth_headers = oauthHeaders_();
  oauth_headers.oauth_signature = sign_(method, url, oauth_headers);
  UrlFetchApp.fetch(url, {
    method: method, headers: {
      Authorization: authorize_(oauth_headers)
    }
  });
}

//Signature related

/**
 * Default OAuth headers without signature
 *
 * @returns {Object} return Default OAuth headers
 */
function oauthHeaders_() {
  return {
    oauth_consumer_key: this.consumerKey,
    oauth_nonce: Utilities.base64EncodeWebSafe(Utilities.getUuid()),
    oauth_signature_method: OAUTH_SIGNATURE_METHOD,
    oauth_timestamp: parseInt(new Date().getTime()/1000, 10),
    oauth_token: this.accessToken,
    oauth_version: OAUTH_VERSION
  }
}

/**
 * Percent encode string
 *
 * @param {string} str String to encode
 * @returns {string} encoded string
 */
function percentEncode_(str){
  return encodeURIComponent(str).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}

/**
 * Sign OAuth header
 *
 * @param {string} method HTTP method
 * @param {string} endpoint Endpoint URL
 * @param {Object} headers Headers to sign
 * @return {string} returns Calculated signature
 */
function sign_(method, endpoint, headers){
  let str_to_sign = method.toUpperCase().concat('&').concat(percentEncode_(endpoint)).concat('&');
  str_to_sign += percentEncode_(Object.keys(headers).map(percentEncode_).sort().reduce( (str,key, index, arr) => {
      str = str.concat(key).concat('=').concat(percentEncode_(headers[key]));
      return ( arr.length-1 != index ) ? str.concat('&') : str
    },''));
  let signing_key = percentEncode_(this.consumerSecret).concat('&').concat(percentEncode_(this.accessTokenSecret));
  let signing_bytes = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_1,str_to_sign,signing_key);
  return Utilities.base64Encode(signing_bytes);
}

/**
 * Authorize request
 *
 * @param {Object} headers Header values in an object
 * @return {string} returns the OAuth header string
 */
function authorize_(headers){
  return Object.keys(headers).map(percentEncode_).sort().reduce( (str,key,index,arr) => {
    str = str.concat(key).concat('="').concat(percentEncode_(headers[key])).concat('"');
    return ( arr.length - 1 != index) ? str.concat(', ') : str;
  },'OAuth ');
}

// Helpers

/**
 * Checks if non public metrics are presend
 *
 * @param {Object} fields Fields to process
 * @return {boolen} returns if non public metrics are present
 */
function checkNonPublicMetrics_(fields){
  if(fields){
    for( const [key, value] of Object.entries(fields)){
      if( Array.isArray(value)){
        if( value.indexOf('non_public_metrics') != -1 || value.indexOf('organic_metrics') != -1 || value.indexOf('promoted_metrics') != -1 ) return true;
      }
      if( typeof value === 'string'){
        if( value == 'non_public_metrics' || value == 'organic_metrics' || value == 'promoted_metrics' ) return true;
      }
    }
  }
}

/**
 * Converts field parameters in to a string
 *
 * @param {Object} fields Requested fileds
 * @return {string} returns params as query string
 */
function fieldsToQuery_(fields){
  return Object.keys(fields).reduce( (str,key,index,arr) => {
    str += key.concat("=");
    str += (Array.isArray(fields[key])) ? fields[key].join(',') : fields[key];
    return ( arr.length-1 != index ) ? str.concat('&') : str
  }, '')
}
