var url = require('url');
var http = require('http');
var querystring = require('querystring');


// The url to connect to:
var urlStr = process.argv[3] || 'http://localhost:4000/';

var url = url.parse(urlStr);

var options = {
    host: url.hostname,
    path: url.path,
    port: url.port || 80,
    method: 'GET'
  };

function createResponseHandler (callback) {
 
  function responseHandler(res) {
    var str = ''+'fname,lname,id,phone,address'+'\r\n';
    console.log(str);
    res.on('data', function (chunk) {
      		callback(chunk.toString());
    });
  }
  return responseHandler;
}

// Create a basic handler:
var handler = createResponseHandler(function (data) {
 	var cur=JSON.parse(data);
	var s=cur.fname+','+cur.lname+','+cur.id+','+cur.phone+','+cur.address+'\r\n';
	console.log(s); 	
});


console.log(' --> connecting to ' + options.host + ' on port ' + options.port);
console.log(' --> resource ' + options.path);


var req = http.request(options, handler);
req.end();



