'use strict';

var http = require('http');

module.exports = BosonNlp;

var nerPostOptions;

function BosonNlp (token) {
	nerPostOptions = {
		host: "api.bosonnlp.com",
		port: 80,
		path: "/ner/analysis",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"X-Token": token
		}
	};
	// nerPostOptions.headers.X-Token = token;
};

BosonNlp.prototype.ner = function (data, callback) {
	data = "\"" + escape(data).replace(/\%/g, '\\') + "\"";
	var postReq = http.request(nerPostOptions, function(res){
		res.setEncoding('utf8');
		res.on('data', function(chunk){
			chunk = JSON.parse(chunk.slice(1, chunk.length-1));// remove "[" and "]" to get a JSON Object
			callback (chunk);
		});
	});	
	postReq.end(data);
};

