BosonNLP
========

BosonNLP is a node sdk for http://bosonnlp.com .

[![NPM](https://nodei.co/npm/bosonnlp.png?stars&downloads)](https://nodei.co/npm/bosonnlp/) [![NPM](https://nodei.co/npm-dl/bosonnlp.png)](https://nodei.co/npm/bosonnlp/)

Installation
------------

```bash
$ npm install bosonnlp
```

Usage
-----

```javascript
var bosonnlp = require('bosonnlp');
var nlp = new bosonnlp.BosonNLP('YOUR_API_KEY');
nlp.ner('成都商报记者 姚永忠', function (result) {
	console.log(result);
});
//[{"tag": ["ns", "n", "n", "nr"], 
//  "word": ["\u6210\u90fd", "\u5546\u62a5", "\u8bb0\u8005", "\u59da\u6c38\u5fe0"], 
//  "entity": [[0, 2, "product_name"], [3, 4, "person_name"]]}]
```

API
---

* __tag(content, callback)__ - Tokenization and part of speech tagging.
* __ner(content, callback)__ - Named-entity recognition.
* __extractKeywords(content, callback)__ - Tokenization and compute word weight.
* __sentiment(content, callback)__ - Automatic detection of opinions embodied in text.
* __depparser(content, callback)__ - Work out the grammatical structure of sentences
* __classify(content, callback)__ - categorization the given articles.
* __suggest(term, callback)__ - Get relative words.

tag
---

POS Tagging use [宾州大学标准](http://www.cis.upenn.edu/~chinese/posguide.3rd.ch.pdf)

```javascript
var bosonnlp = require('bosonnlp');
var nlp = new bosonnlp.BosonNLP('YOUR_API_KEY');

var text = "这个世界好复杂";
boson.tag(text, function (data) {
	console.log(data);
});
// [{"tag": ["DT", "M", "NN", "AD", "VA"], 
// "word": ["\u8fd9", "\u4e2a", "\u4e16\u754c", "\u597d", "\u590d\u6742"]}]

var text = ['这个世界好复杂', '计算机是科学么'];
boson.tag(text, function (data) {
	data = JSON.parse(data); 

	// ["DT", "M", "NN", "AD", "VA"]
	console.log(data[0].tag); 

	// ["\u8fd9", "\u4e2a", "\u4e16\u754c", "\u597d", "\u590d\u6742"]
	console.lgo(data[0].word); 

	// ["NN", "VC", "NN", "SP"]
	console.lgo(data[1].tag); 

	// ["\u8ba1\u7b97\u673a", "\u662f", "\u79d1\u5b66", "\u4e48"]
	console.lgo(data[1].word); 
});
```

ner
---

```javascript
var bosonnlp = require('bosonnlp');
var nlp = new bosonnlp.BosonNLP('YOUR_API_KEY');
nlp.ner('成都商报记者 姚永忠', function (result) {
	console.log(result);
});
//[{"tag": ["ns", "n", "n", "nr"], 
//  "word": ["\u6210\u90fd", "\u5546\u62a5", "\u8bb0\u8005", "\u59da\u6c38\u5fe0"], 
//  "entity": [[0, 2, "product_name"], [3, 4, "person_name"]]}]

var content = ["对于该小孩是不是郑尚金的孩子，目前已做亲子鉴定，结果还没出来，",
                "纪检部门仍在调查之中。成都商报记者 姚永忠"];
nlp.ner(content, function (result) {
	console.log(result);
});
//[{"tag": ["p", "rz", "n", "v", "nr", "ude1", "n", "wd", "t", "d", "v", 
//			"n", "v", "wd", "n", "d", "v", "vf", "wd"],
//  "word": ["\u5bf9\u4e8e", "\u8be5", "\u5c0f\u5b69", "\u662f\u4e0d\u662f", 
//			"\u90d1\u5c1a\u91d1", "\u7684", "\u5b69\u5b50", "\uff0c", 
//			"\u76ee\u524d", "\u5df2", "\u505a", "\u4eb2\u5b50", "\u9274\u5b9a",
//			 "\uff0c", "\u7ed3\u679c", "\u8fd8", "\u6ca1", "\u51fa\u6765", "\uff0c"], 
//  "entity": [[4, 5, "person_name"]]},
//  {"tag": ["n", "n", "d", "p", "vn", "f", "wj", "ns", "n", "n", "nr"], 
//  "word": ["\u7eaa\u68c0", "\u90e8\u95e8", "\u4ecd", "\u5728", "\u8c03\u67e5", 
//			"\u4e4b\u4e2d", "\u3002", "\u6210\u90fd", "\u5546\u62a5", "\u8bb0\u8005", 
//			"\u59da\u6c38\u5fe0"], 
//  "entity": [[0, 2, "org_name"], [7, 9, "product_name"], [10, 11, "person_name"]]}]
```

extractKeywords
---------------

```javascript
var bosonnlp = require('bosonnlp');
var nlp = new bosonnlp.BosonNLP('YOUR_API_KEY');
var text = ["病毒式媒体网站：让新闻迅速蔓延"];
nlp.extractKeywords(text, function (data) {
	data = JSON.parse(data);
	console.log(data);
});
```

sentiment
---------

```javascript
var text = ['他是个傻逼','美好的世界'];
boson.sentiment(text, function (data) {
	console.log(data);
});
```

depparser
---------

```javascript
var text = ['我以最快的速度吃了午饭']
boson.depparser(text, function (data) {
	console.log("depparser:", data);
});
```

classify
--------

```javascript
var text = ['俄否决安理会谴责叙军战机空袭阿勒颇平民',
			'邓紫棋谈男友林宥嘉：我觉得我比他唱得好',
			'Facebook收购印度初创公司'];
boson.classify(text, function (data) {
	console.log("classify:", data);
	test.done();
});
```

suggest
-------

```javascript
var term = '粉丝';
boson.suggest(term, function (data) {
	console.log("suggest:", data);
});
```







