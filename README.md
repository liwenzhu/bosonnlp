BosonNLP
========

BosonNLP is a node sdk for http://bosonnlp.com .

[![Build Status](https://travis-ci.org/liwenzhu/bosonnlp.svg?branch=master)](https://travis-ci.org/liwenzhu/bosonnlp)
[![npm](https://img.shields.io/npm/v/bosonnlp.svg)](https://npmjs.org/package/bosonnlp)
[![NPM Downloads](https://img.shields.io/npm/dt/bosonnlp.svg)](https://npmjs.org/package/bosonnlp)


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
//  "word": ["成都", "商报", "记者", "姚永忠"], 
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

[POS Tagging DOC](http://docs.bosonnlp.com/tag_rule.html)

```javascript
var bosonnlp = require('bosonnlp');
var nlp = new bosonnlp.BosonNLP('YOUR_API_KEY');

var text = "这个世界好复杂";
boson.tag(text, function (data) {
	console.log(data);
});
// [{"tag": ["r", "n", "d", "a"], 
// "word": ["这个", "世界", "好", "复杂"]}]

var text = ['这个世界好复杂', '计算机是科学么'];
boson.tag(text, function (data) {
	data = JSON.parse(data); 

	// ["r", "n", "d", "a"]
	console.log(data[0].tag); 

	// ["这个", "世界", "好", "复杂"]
	console.log(data[0].word); 

	// ["n", "vshi", "n", "y"]
	console.log(data[1].tag); 

	// ["计算机", "是", "科学", "么"]
	console.log(data[1].word); 
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
//  "word": ["成都", "商报", "记者", "姚永忠"], 
//  "entity": [[0, 2, "product_name"], [3, 4, "person_name"]]}]

var content = ["对于该小孩是不是郑尚金的孩子，目前已做亲子鉴定，结果还没出来，",
                "纪检部门仍在调查之中。成都商报记者 姚永忠"];
nlp.ner(content, function (result) {
	console.log(result);
});
//[{"tag": ["p","r","n","vshi","d","vshi","nr","ude","n","wd","t","d","v","n","n","wd","n","d","d","v","wd"],
//  "word": ["对于","该","小孩","是","不","是","郑尚金","的","孩子","，","目前","已","做","亲子","鉴定","，",
// "结果","还","没","出来","，"], 
//  "entity": [[6, 7, "person_name"]]},
//  {"tag": ["n","n","d","p","v","f","wj","ns","n","n","nr"], 
//  "word": ["纪检","部门","仍","在","调查","之中","。","成都","商报","记者","姚永忠"], 
//  "entity": [[7,9,"product_name"],[9,10,"job_title"],[10,11,"person_name"]]}]
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
    // [非负面概率, 负面概率]
    // [[0.6519134382562579, 0.34808656174374203], [0.92706110187413, 0.07293889812586994]]
	console.log(data);
});
```

depparser
---------
[Depparser Doc](http://docs.bosonnlp.com/depparser.html)

名称 | 解释	 |举例
----|--------|---
ROOT	| 核心词	| 警察*打击*犯罪。
SBJ	| 主语成分	| *警察*打击犯罪。
OBJ	| 宾语成分	| 警察打击*犯罪*。
PU	| 标点符号	| 你好*!*
TMP	| 时间成分	| *昨天下午*下雨了。
LOC	| 位置成分	| 我*在北京*开会。
MNR	| 方式成分	| 我*以最快的速度*冲向了终点。
POBJ	| 介宾成分	| 他*对客人*很热情。
PMOD	| 介词修饰	| 这个产品*直*到今天才完成。
NMOD	| 名词修饰	| 这是一个*大*错误。
VMOD	| 动词修饰	| 我*狠狠地*打*了*他。
VRD	| 动结式 | （第二动词为第一动词结果）	福建省*涌现出*大批人才。
DEG	| 连接词| “的”结构	*我*的妈妈是超人。
DEV	| “地”结构|	他*狠狠*地看我一眼。
LC	| 位置词结构	| 我在*书房*里吃饭。
M	| 量词结构	| 我有*一*只小猪。
AMOD	| 副词修饰	| 一批*大*中企业折戟上海。
PRN	| 括号成分	| 北京（首都）很大。
VC	| 动词| “是”修饰	我把你*看做*是妹妹。
COOR	| 并列关系	| 希望能*贯彻* *执行*该方针
CS	| 从属连词成分	| 如果*可行*，我们进行推广。
DEC	| 关系从句| “的”	这是*以前不曾遇到过*的情况。

```javascript
var text = ['我以最快的速度吃了午饭']
boson.depparser(text, function (data) {
	console.log("depparser:", data);
});
```

classify
--------
[Classes Doc](http://docs.bosonnlp.com/classify.html)

编号 | 分类
----|----
0   | 体育
1   | 教育
2	| 财经
3	| 社会
4	| 娱乐
5	| 军事
6	| 国内
7	| 科技
8	| 互联网
9	| 房产
10	| 国际
11	| 女人
12	| 汽车
13	| 游戏

```javascript
var text = ['俄否决安理会谴责叙军战机空袭阿勒颇平民',
			'邓紫棋谈男友林宥嘉：我觉得我比他唱得好',
			'Facebook收购印度初创公司'];
boson.classify(text, function (data) {
    // [5, 4, 8]
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

var options = {};
// options.top_k default 10
options.top_k = 2;
boson.suggest(term, options, function (data) {
	console.log("suggest:", data);
});

```







