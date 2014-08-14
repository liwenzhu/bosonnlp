'use strict';

var bosonnlp = require('../index');
var boson = new bosonnlp.BosonNLP("YOUR_API_KEY");

exports.testNerSingle = function (test) {
	var text = "成都商报记者 姚永忠";
	boson.ner(text, function (data) {
		data = JSON.parse(data)[0]; 
		var entity = data.entity[0];
		test.equal(data.word.slice(entity[0], entity[1]).join(''), "成都商报");
		test.equal(entity[2], "product_name");
		test.done();
	});
};

exports.testNerMulti = function (test) {
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

exports.testTagSingle = function (test) {
	var text = "这个世界好复杂";
	boson.tag(text, function (data) {
		data = JSON.parse(data)[0]; 
		test.deepEqual(data.tag, ["DT", "M", "NN", "AD", "VA"]);
		test.deepEqual(data.word, ["\u8fd9", "\u4e2a", "\u4e16\u754c", "\u597d", "\u590d\u6742"]);
		test.done();
	});
};

exports.testTagMulti = function (test) {
	var text = ['这个世界好复杂', '计算机是科学么'];
	boson.tag(text, function (data) {
		data = JSON.parse(data); 
		test.deepEqual(data[0].tag, ["DT", "M", "NN", "AD", "VA"]);
		test.deepEqual(data[0].word, ["\u8fd9", "\u4e2a", "\u4e16\u754c", "\u597d", "\u590d\u6742"]);
		test.deepEqual(data[1].tag, ["NN", "VC", "NN", "SP"]);
		test.deepEqual(data[1].word, ["\u8ba1\u7b97\u673a", "\u662f", "\u79d1\u5b66", "\u4e48"]);
		test.done();
	});
};

exports.testExtractKeywordsSingle = function (test) {
	var text = ["病毒式媒体网站：让新闻迅速蔓延"];
	boson.extractKeywords(text, function (data) {
		//[[0.45765331753974986, "\u8513\u5ef6"], [0.44429093001057907, "\u75c5\u6bd2"], [0.37748530715728457, "\u8fc5\u901f"], [0.3456580244319953, "\u7f51\u7ad9"], [0.3416267532164443, "\u5a92\u4f53"], [0.3055030679162763, "\u65b0\u95fb"], [0.189440906633153, "\u5f0f"], [0.08788500588998195, "\u8ba9"]]
		data = JSON.parse(data);
		test.done();
	});
};













