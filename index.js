var qs = require('qs');
var request = require('request');

function endpoint(route, options, cb){
  if (typeof options === 'function') cb = options;
  request('https://archive.org/'+ route + '?' + qs.stringify(options) + '&output=json',
    function(err, res, body) {
      if (err) cb(err);
      else if (res.statusCode == 200) {
        var parsedContent;
        try {
          parsedContent = JSON.parse(body);          
        } catch(e) {
          cb(new Error("Error parsing content from Internet Aarchive API. Try checking your query..."));
        }
        cb(null, parsedContent);
      }
    }
  )
}

function meta(id, cb){
	request('https://archive.org/metadata/' + id + '&output=json',
    function(err, res, body) {
      if (err) cb(err);
      else if (res.statusCode == 200)  {
        var parsedContent;
        try {
          parsedContent = JSON.parse(body);          
        } catch(e) {
          cb(new Error("Error parsing content from Internet Aarchive API. Try checking your query..."));
        }
        cb(null, parsedContent);
      }
    }
  )
}

module.exports = {
  advancedSearch: function(options, cb) {endpoint("advancedsearch.php", options, cb)},
  metadata: function(id, cb) {meta(id, cb)}
}