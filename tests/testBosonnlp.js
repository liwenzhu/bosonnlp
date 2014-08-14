'use strict';

var bosonnlp = require('../index');
var boson = new bosonnlp.BosonNlp("YOUR_API_KEY");

exports.testNERSingle = function (test) {
	var text = "成都商报记者 姚永忠";
	boson.ner(text, function (data) {
		data = JSON.parse(data)[0]; 
		var entity = data.entity[0];
		test.equal(data.word.slice(entity[0], entity[1]).join(''), "成都商报");
		test.equal(entity[2], "product_name");
		test.done();
	});
};

exports.testNERMulti = function (test) {
	var text = ["对于该小孩是不是郑尚金的孩子，目前已做亲子鉴定，结果还没出来，", "纪检部门仍在调查之中。成都商报记者 姚永忠"];
	boson.ner(text, function (data) {
		data = JSON.parse(data);
		var entity = data[0].entity[0];
		test.equal(data[0].word.slice(entity[0], entity[1]).join(''), "郑尚金");
		test.equal(entity[2], "person_name");
		entity = data[1].entity[0]
		test.equal(data[1].word.slice(entity[0], entity[1]).join(''), "纪检部门");
		test.equal(entity[2], "org_name");
		entity = data[1].entity[1]
		test.equal(data[1].word.slice(entity[0], entity[1]).join(''), "成都商报");
		test.equal(entity[2], "product_name");
		entity = data[1].entity[2]
		test.equal(data[1].word.slice(entity[0], entity[1]).join(''), "姚永忠");
		test.equal(entity[2], "person_name");
		test.done();
	});
};
