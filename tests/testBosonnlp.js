'use strict';

var bosonnlp = require('../index');
var boson = new bosonnlp.BosonNlp("59G4ZvQp.2193.0YmDde8uiv3e");

exports.testNER = function (test) {
	boson.ner("地址在北京东四北大街", function (data) {
		var entity = data.entity[0];
		test.equal(data.word.slice(entity[0], entity[1]).join(''), "北京东四北大街");
		test.equal(entity[2], "location");
		test.done();
	});
};
