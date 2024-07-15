#!/usr/bin/node

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

// cache object where contents of cached files stored
var cache = {};


function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resourece not found');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    reponse.writeHead(
	200,
	{"Content-type": mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}


function serveStatic(response, cache, absPath)
{
    if (cache[absPath]) {
	sendFile(response, absPath, cache[absPath]);
    } else {
	fs.exists(absPath, function(exists) {
	    if (exists) {
		fs.readFile(absPath, function(err, data) {
		    if (err) {
			send404(response);
		    } else {
			cache[absPath] = data;
			sendFile(response, absPath, data);
		    }
		});
	    } else {
		send404(response);
	    }
	});
    }
}


var server = http.createServer(function(request, response) {
    var filePath= false;

    if(request.url == '/') {
	filePath = 'public/index.html';
    } else {
	filePath = 'Public' + request.url;
    }

    var absPath = './' + filePath;
    serverStatic(response, cache, absPath);
});

server.listen(3000, function(){
    console.log("Server listening 3000");
});
