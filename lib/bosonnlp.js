'use strict';

var http = require('http');

var postOptions = {
	host: "api.bosonnlp.com",
	port: 80,
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	}
};

module.exports = BosonNLP;

function BosonNLP (token) {
	postOptions.headers["X-Token"] = token;
};

BosonNLP.prototype.tag = function (data, callback) {
	postOptions.path = "/tag/analysis";
	var datas = parseDatas(data);
	sendPost(postOptions, datas, callback);
};

BosonNLP.prototype.ner = function (data, callback) {
	postOptions.path = "/ner/analysis";
	var datas = parseDatas(data);
	sendPost(postOptions, datas, callback);
};

BosonNLP.prototype.extractKeywords = function (data, callback) {
	postOptions.path = "/keywords/analysis";
	var datas = parseDatas(data);
	sendPost(postOptions, datas, callback);
};

BosonNLP.prototype.sentiment = function (data, callback) {
	postOptions.path = "/sentiment/analysis";
	var datas = parseDatas(data);
	sendPost(postOptions, datas, callback);
};

BosonNLP.prototype.depparser = function (data, callback) {
	postOptions.path = "/depparser/analysis";
	var datas = parseDatas(data);
	sendPost(postOptions, datas, callback);
};

BosonNLP.prototype.classify = function (data, callback) {
	postOptions.path = "/classify/analysis";
	var datas = parseDatas(data);
	sendPost(postOptions, datas, callback);
};


BosonNLP.prototype.suggest = function (data, callback) {
	postOptions.path = "/suggest/analysis";
	var datas = parseDatas(data);
	sendPost(postOptions, datas, callback);
};

function parseDatas (data) {
	var datas = [];
	if (Array.isArray(data)) {
		for (var i = 0; i < data.length; i++) {
			datas.push(encodeString(data[i]));
		}
	} else {
		datas.push(encodeString(data));
	}
	return '[' + datas.toString() + ']';
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
	data = restorePunctuation(data);
	return data;
};

function restorePunctuation (data) {
	data = data.replace("\\20", " "); 
	data = data.replace("\\21", "!");
	data = data.replace("\\22", "\"");
	data = data.replace("\\23", "#");
	data = data.replace("\\24", "$");
	data = data.replace("\\25", "%");
	data = data.replace("\\26", "&");
	data = data.replace("\\27", "\'");
	data = data.replace("\\28", "(");
	data = data.replace("\\29", ")");
	data = data.replace("\\2C", ",");
	data = data.replace("\\3A", ":");
	data = data.replace("\\3B", ";");
	data = data.replace("\\3C", "<");
	data = data.replace("\\3D", "=");
	data = data.replace("\\3E", ">");
	data = data.replace("\\3F", "?");
	data = data.replace("\\5B", "[");
	data = data.replace("\\5D", "]");
	data = data.replace("\\5E", "^");
	data = data.replace("\\7B", "{");
	data = data.replace("\\7D", "}");
	return data;
};

