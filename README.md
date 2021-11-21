# Twitter API v2 for Google Apps Script

This library enables programmatic access to Twitter. Except for Spaces and Streams almost every method is implementet.

## Use

To use this library select "Add a library" in the Apps Script editor and paste the following id `1RmiFeiuIGCmuVXQOJAHjxrjRBwdAiSyqib_8vYl5thOwB3QEctwI5U_I`. In order to enable the autocomplete future you should choose `Twitter` for the identifier or see [Deployment Docs](https://script.google.com/macros/library/d/1RmiFeiuIGCmuVXQOJAHjxrjRBwdAiSyqib_8vYl5thOwB3QEctwI5U_I/3).

### Initialization

Depending on the access level you need for your application, you will either need to set _OAuth 1.0a User context_ or _OAuth 2.0 Bearer token_.

The setter methods for the keys return the `Twitter` instance. You can set them either in the root of your Script App or in a variable.

```
Twitter.setKey("YOUR KEY").setOtherKey("YOUR OTHER KEY");
```
and then use the `Twitter` varable. or
```
const TWITTER = Twitter.setKey("FIRST KEY").setOtherKey("OTHER KEY");
```
and use the `TWITTER` variable for further use.

The autocomplete future should be clear about the setter methods available.

### Using fields and params

To pass in additional params or fields you can simply use an object with a string as value for params and an array of strings for fields, if you request multiple fields. See [Twitter Docs](https://developer.twitter.com/en/docs/twitter-api/fields) for more information.

The library detects [Non public Metrics](https://developer.twitter.com/en/docs/twitter-api/metrics) automatically. But you will need to set the appropriate keys for this to function.

### Building a query
In order to search for Tweets you can use
```
Twitter.search(query,fields);
```
It could bee that the query contains special characters. So if you encounter an error try to use `encodeURIComponent` before passing the query string. See [Building a query](https://developer.twitter.com/en/docs/twitter-api/tweets/search/integrate/build-a-query) for more details on how queries work.
