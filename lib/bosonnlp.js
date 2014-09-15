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
		var data = [];
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			data.push(chunk);
		});
		res.on('end', function () {
			callback(data.join(''))
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
	data = data.replace(/\\A0/g, " ");
	data = data.replace(/\\A2/g, "\\u00A2");
	data = data.replace(/\\A3/g, "\\u00A3");
	data = data.replace(/\\A4/g, "\\u00A4");
	data = data.replace(/\\A5/g, "\\u00A5");
	data = data.replace(/\\A6/g, "\\u00A6");
	data = data.replace(/\\A7/g, "\\u00A7");
	data = data.replace(/\\A8/g, "\\u00A8");
	data = data.replace(/\\A9/g, "\\u00A9");
	data = data.replace(/\\AA/g, "\\u00AA");
	data = data.replace(/\\AB/g, "\\u00AB");
	data = data.replace(/\\AC/g, "\\u00AC");
	data = data.replace(/\\AD/g, "\\u00AD");
	data = data.replace(/\\AE/g, "\\u00AE");
	data = data.replace(/\\AF/g, "\\u00AF");
	data = data.replace(/\\B0/g, "\\u00B0");
	data = data.replace(/\\B1/g, "\\u00B1");
	data = data.replace(/\\B2/g, "\\u00B2");
	data = data.replace(/\\B3/g, "\\u00B3");
	data = data.replace(/\\B4/g, "\\u00B4");
	data = data.replace(/\\B5/g, "\\u00B5");
	data = data.replace(/\\B6/g, "\\u00B6");
	data = data.replace(/\\B7/g, ".");
	data = data.replace(/\\B8/g, "\\u00B8");
	data = data.replace(/\\B9/g, "\\u00B9");
	data = data.replace(/\\BA/g, "\\u00BA");
	data = data.replace(/\\BB/g, "\\u00BB");
	data = data.replace(/\\BC/g, "\\u00BC");
	data = data.replace(/\\BD/g, "\\u00BD");
	data = data.replace(/\\BE/g, "\\u00BE");
	data = data.replace(/\\BF/g, "\\u00BF");
	data = data.replace(/\\D7/g, " ");
	data = data.replace(/\\0A/g, " ");
	data = data.replace(/\\0D/g, " ");
	data = data.replace(/\\20/g, " "); 
	data = data.replace(/\\21/g, "!");
	data = data.replace(/\\22/g, "\"");
	data = data.replace(/\\23/g, "#");
	data = data.replace(/\\24/g, "$");
	data = data.replace(/\\25/g, "%");
	data = data.replace(/\\26/g, "&");
	data = data.replace(/\\27/g, "\'");
	data = data.replace(/\\28/g, "(");
	data = data.replace(/\\29/g, ")");
	data = data.replace(/\\2C/g, ",");
	data = data.replace(/\\3A/g, ":");
	data = data.replace(/\\3B/g, ";");
	data = data.replace(/\\3C/g, "<");
	data = data.replace(/\\3D/g, "=");
	data = data.replace(/\\3E/g, ">");
	data = data.replace(/\\3F/g, "?");
	data = data.replace(/\\5B/g, "[");
	data = data.replace(/\\5D/g, "]");
	data = data.replace(/\\5E/g, "^");
	data = data.replace(/\\7B/g, "{");
	data = data.replace(/\\7C/g, "|");
	data = data.replace(/\\7D/g, "}");
	data = data.replace(/\\7E/g, "~");
	return data;
};

