var express = require('express');
var fs = require('fs');
var https = require('https');
var crypto = require('crypto');
var compressor = require('node-minify');

var app = express();

var slim;

new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'slim.js',
    fileOut: 'slim.min.gcc.js',
    callback: function(err, min) {
      slim = fs.readFileSync('slim.min.gcc.js').toString().replace('__HOST__',process.env.PUBLIC_HOST);
    }
});

new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'public/script.js',
    fileOut: 'public/script.min.gcc.js',
    callback: function(err, min) {
    }
});

app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {

  var path = req.url;
  var lines;
  if (path[path.length - 1] === ']')
  {
  	 lines = path.substring(path.lastIndexOf('[') + 1, path.length - 1).split('-');
  	console.dir(lines);
  	path = path.substr(0, path.lastIndexOf('['));
  }

    var options = {
	  host: 'raw.githubusercontent.com',
	  path: path,
	  port: 443
	};

    callback = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function(chunk) {
      str += chunk;
    });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function() {

  	if (lines)
  	{
  		str = str.split('\n').splice(lines[0], lines[1] - lines[0]).join('\n');
  	}

  	var b = new Buffer(str).toString('base64');

    res.set('Content-Type', 'text/javascript');
    var shasum = crypto.createHash('sha1');
    shasum.update(req.url);
    var d = shasum.digest('hex');
    res.send('var hash="' + d + '";\n'
    	+ 'var link="' + req.url + '";\n'
    	+ 'var raw_content="' + b + '";\n'
    	+ slim);

  });
};

	https.request(options, callback).end();

});

var server = app.listen(8080, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('CodeMirror GitHub app listening at http://%s:%s', host, port);

});
