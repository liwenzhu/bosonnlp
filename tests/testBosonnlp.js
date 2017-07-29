'use strict';

var bosonnlp = require('../index');

// This API_TOKEN is only for travis ci
var boson = new bosonnlp.BosonNLP("59G4ZvQp.2193.0YmDde8uiv3e");

var ENTITY_START_POSITION_INDEX = 0;
var ENTITY_END_POSITION_INDEX = 1;
var ENTITY_TYPE = 2;

function getEntityWord(word, entity) {
	var wordStartPosition = entity[ENTITY_START_POSITION_INDEX];
	var wordEndPosition = entity[ENTITY_END_POSITION_INDEX];
	return word.slice(wordStartPosition, wordEndPosition).join('');
}

exports.testPunctuation = function (test) {
	boson.ner("[成都商报]记者 姚永忠", function (data) {
		data = JSON.parse(data)[0];
		var entity = data.entity[0];
		test.equal(data.word.slice(entity[0], entity[1]).join(''), "成都商报");
		test.equal(entity[2], "product_name");
	});

	boson.ner("成都商报,记者 姚永忠", function (data) {
		data = JSON.parse(data)[0];
		var entity = data.entity[0];
		test.equal(data.word.slice(entity[0], entity[1]).join(''), "成都商报");
		test.equal(entity[2], "product_name");
		test.done();
	})
}

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
		test.equal(getEntityWord(data[0].word, entity), "郑尚金");
		test.equal(entity[ENTITY_TYPE], "person_name");
		entity = data[1].entity[0]
		test.equal(getEntityWord(data[1].word, entity), "成都商报");
		test.equal(entity[ENTITY_TYPE], "product_name");
		entity = data[1].entity[1]
		test.equal(getEntityWord(data[1].word, entity), "记者");
		test.equal(entity[ENTITY_TYPE], "job_title");
		entity = data[1].entity[2]
		test.equal(getEntityWord(data[1].word, entity), "姚永忠");
		test.equal(entity[ENTITY_TYPE], "person_name");
		test.done();
	});
};

exports.testTagSingle = function (test) {
    var text = "这个世界好复杂";
    boson.tag(text, function (data) {
		data = JSON.parse(data)[0];
		test.deepEqual(data.tag, ["r", "n", "d", "a"]);
		test.deepEqual(data.word, ["这个", "世界", "好", "复杂"]);
		test.done();
	});
};

exports.testTagMulti = function (test) {
	var text = ['这个世界好复杂', '计算机是科学么'];
	boson.tag(text, function (data) {
		data = JSON.parse(data);
		test.deepEqual(data[0].tag, ["r", "n", "d", "a"]);
		test.deepEqual(data[0].word, ["这个", "世界", "好", "复杂"]);
		test.deepEqual(data[1].tag, ["n", "vshi", "n", "y"]);
		test.deepEqual(data[1].word, ["计算机", "是", "科学", "么"]);
		test.done();
	});
};

exports.testExtractKeywordsSingle = function (test) {
	var text = ["病毒式媒体网站：让新闻迅速蔓延"];
	var WORD_INDEX = 1;
	boson.extractKeywords(text, function (data) {
		data = JSON.parse(data)[0];
		// result of data is [weight, word]
		test.equal(data[0][WORD_INDEX],'蔓延');
		test.equal(data[1][WORD_INDEX],'病毒');
		test.equal(data[2][WORD_INDEX],'迅速');
		test.equal(data[3][WORD_INDEX],'网站');
		test.equal(data[4][WORD_INDEX],'新闻');
		test.equal(data[5][WORD_INDEX],'媒体');
		test.equal(data[6][WORD_INDEX],'式');
		test.equal(data[7][WORD_INDEX],'让');
		test.done();
	});
};

exports.testSentiment = function (test) {
	var text = ['他是个傻逼','美好的世界'];
	boson.sentiment(text, function (data) {
		test.equal(true, !!data)
		test.done();
	});
};

exports.testDepparser = function (test) {
	var text = ['我以最快的速度吃了午饭']
	boson.depparser(text, function (data) {
		data = JSON.parse(data)[0]
		var head = data.head;
		var role = data.role;
		var tag = data.tag;
		var word = data.word;
		test.deepEqual(head, [6, 6, 3, 4, 5, 1, -1, 6, 6]);
		test.deepEqual(role, ["SBJ", "MNR", "VMOD", "DEC", "NMOD", "POBJ", "ROOT", "VMOD", "OBJ"]);
		test.deepEqual(tag, ["PN", "P", "AD", "VA", "DEC", "NN", "VV", "AS", "NN"]);
		test.deepEqual(word, ["我", "以", "最", "快", "的", "速度", "吃", "了", "午饭"]);
		test.done();
	});
};

exports.testClassify = function (test) {
	var text = ['俄否决安理会谴责叙军战机空袭阿勒颇平民',
    			'邓紫棋谈男友林宥嘉：我觉得我比他唱得好',
    			'Facebook收购印度初创公司'];
	boson.classify(text, function (data) {
		test.deepEqual(JSON.parse(data), [5, 4, 8]);
		test.done();
	});
};

exports.testSuggest = function (test) {
	var term = '粉丝';
	var options = {};
	options.top_k = 2;
	boson.suggest(term, options, function (data) {
		boson.suggest(term, function(data){
			test.done();
		});
	});
};



















