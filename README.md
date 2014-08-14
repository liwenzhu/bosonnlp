BosonNLP
========

BosonNLP is a node sdk for http://bosonnlp.com .

###Installation

```bash
$ npm install bosonnlp
```

###Usage

```javascript
var bosonnlp = require('bosonnlp');
var nlp = new bosonnlp.BosonNLP('YOUR_API_KEY');
console.log(nlp.ner('成都商报记者 姚永忠'));
//[{"tag": ["ns", "n", "n", "nr"], 
//  "word": ["\u6210\u90fd", "\u5546\u62a5", "\u8bb0\u8005", "\u59da\u6c38\u5fe0"], 
//  "entity": [[0, 2, "product_name"], [3, 4, "person_name"]]}]
```

###API

-**ner(content, callback)**-Named-entity recognition

