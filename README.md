karma-custom
================

[![version](https://img.shields.io/badge/version-1.1.8-blue.svg)](https://github.com/AlexisTessier/karma-custom#readme)
[![npm version](https://badge.fury.io/js/karma-custom.svg)](https://badge.fury.io/js/karma-custom)

[![Build Status](https://travis-ci.org/AlexisTessier/karma-custom.svg?branch=master)](https://travis-ci.org/AlexisTessier/karma-custom)
[![Coverage Status](https://coveralls.io/repos/AlexisTessier/karma-custom/badge.svg?branch=master&service=github)](https://coveralls.io/github/AlexisTessier/karma-custom?branch=master)

[![Dependency Status](https://david-dm.org/AlexisTessier/karma-custom.svg)](https://david-dm.org/AlexisTessier/karma-custom)
[![devDependency Status](https://david-dm.org/AlexisTessier/karma-custom/dev-status.svg)](https://david-dm.org/AlexisTessier/karma-custom#info=devDependencies)

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

[Karma](http://karma-runner.github.io/)

Add 'custom' to the list of available frameworks in you karma.conf.js

```javascript
//in your main-test-file.js

window.karmaCustomEnv = {};
window.karmaCustomEnv.execute = function(karma, window) {
	//use the node assert module (via browserify)
    var assert = require('assert');

    //You have access to the karma framework API
    console.log("Test suite started");

    try{
        //do your custom test here
        assert(true);

        karma.result({success: true})

    }catch(err){
        karma.result({
            success: false,
            suite: [],
            log: [err.message]
        });
    }

    karma.complete({});
};

```