karma-custom
================

[![Build Status](https://travis-ci.org/AlexisTessier/karma-custom.svg?branch=master)](https://travis-ci.org/AlexisTessier/karma-custom)
[![Coverage Status](https://coveralls.io/repos/AlexisTessier/karma-custom/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlexisTessier/karma-custom?branch=master)

[Home Page](https://github.com/AlexisTessier/karma-custom#readme)

A karma adapter to run custom and framework free test suites

Purpose
-------

- Testing your own test framework (It's why I created this pluggin first)
- Testing in browser very tiny modules which may not require a formal BDD method but still need to be tested (Cucumber, Jasmine, or others are maybe too much to test a simple addTwoNumbers function...)

Install
-------

```
npm install karma-custom
```

How to use
----------

Add 'custom' to the list of available frameworks in you karma.conf.js

```javascript
//in your main-test-file.js

//if you want to, for example, use the node assert module (via browserify)
var assert = require('assert');

window.karmaCustomEnv = {};
window.karmaCustomEnv.execute = function(karma, window) {
	//You have access to the karma framework API
	karma.info({dump: "started"});

	try{
		//do your custom test here
		assert(false);

		karma.result({success: true})
	}catch(err){
		karma.error({
			success: false,
			log: [err.message]
		});
	}

	karma.complete({});
};

```