'use strict';

var assert = require('assert');
var _report = require('@alexistessier/report');
var report = _report.extends({
	transformDictionary: _report.extendsTransformDictionary({
		success: function(msg) {
			return _report.transformDictionary.success(msg+' => OK');
		}
	})
});

var spec;

report('notice', '==adapter test started==');

//set window.karma and window.karmaCustomEnv
var globalObject = require('global');

(function (window) {
	window.__karma__ = {};

	window.karmaCustomEnv = {
		executeWasCalled: false,
		karmaInstance: null,
		globalObject: null,
		execute: function(karma, _global) {
			this.executeWasCalled = true;
			this.karmaInstance = karma;
			this.globalObject = _global;
		}
	}
})(globalObject);

//include the adapter
spec = 'The adapter set the karma start function'
require('../adapter.js');
assert(typeof globalObject.__karma__.start === 'function', spec);
report('success', spec);

spec = 'If called, the karma start function must call window.karmaCustomEnv.execute(karma, window)'
globalObject.__karma__.start();
assert(globalObject.karmaCustomEnv.executeWasCalled, spec);
report('success', spec);

spec = [
	'When window.karmaCustomEnv.execute(karma, window) was called,',
	'the first parameter "karma" must be the karma instance'
].join(' ');
assert(Object.is(globalObject.karmaCustomEnv.karmaInstance, globalObject.__karma__), spec);
report('success', spec);

spec = [
	'When window.karmaCustomEnv.execute(karma, window) was called,',
	'the second parameter "window" must be the global object'
].join(' ');
assert(Object.is(globalObject.karmaCustomEnv.globalObject, globalObject), spec);
report('success', spec);