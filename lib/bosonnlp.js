'use strict';

var http = require('http');

var nerPostOptions;

module.exports = BosonNlp;

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
};

BosonNlp.prototype.ner = function (data, callback) {
	var datas = [];
	if (Array.isArray(data)) {
		for (var i = 0; i < data.length; i++) {
			datas.push(encodeString(data[i]));
		}
	} else {
		datas.push(encodeString(data));
	}
	sendPost(nerPostOptions, '[' + datas.toString() + ']', callback);
};

function sendPost (options, body, callback) {
	var postReq = http.request(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			callback (chunk);
		});
	});

	postReq.end(body);
};

function encodeString (data) {
	data = "\"" + escape(data).replace(/\%/g, '\\') + "\"";
	data = data.replace("\\20", " ");
	return data;
};

