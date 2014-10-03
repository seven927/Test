var http = require('http');
var url  = require('url');
var fs = require('fs');

var result=[];
var server; 

function jsonHandler(request, response) {
	response.writeHead(200, { 'Content-Type' : 'text/json' });
	for(var i=0;i<result.length;i++){
  		var obj = {};
		obj["fname"]=result[i].fname;
		obj["lname"]=result[i].lname;
		obj["id"]=result[i].id;
		obj["phone"]=result[i].phone;
		obj["address"]=result[i].address;
		var json=JSON.stringify(obj);
		response.write(json);
	}
	response.end();
}

function setup(info){
	console.log('set up ...');
	var lines=info.split("\r\n");
	var header=lines[0].split(",");
	//console.log(lines.length);
	for(var i=1;i<lines.length;i++){
		var obj={};
		current=lines[i].split(",");
		for(var j=0;j<current.length;j++)
			obj[header[j]]=current[j];
		result.push(obj);
		//console.log(JSON.stringify(result[i-1]));
	}
	server= http.createServer(jsonHandler);
	server.listen(4000);
	console.log('Server is listening!');
}

fs.readFile('info.csv', function(err, data){
	if(err){
		console.log('there is an error:' + err);
	}
	else{
		setup(data.toString());		
	}
});	

