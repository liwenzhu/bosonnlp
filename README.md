BosonNLP
========

BosonNLP is a node sdk for http://bosonnlp.com .

[![NPM](https://nodei.co/npm/bosonnlp.png?stars&downloads)](https://nodei.co/npm/bosonnlp/) [![NPM](https://nodei.co/npm-dl/bosonnlp.png)](https://nodei.co/npm/bosonnlp/)

###Installation

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

* __ner(content, callback)__ - Named-entity recognition.

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



