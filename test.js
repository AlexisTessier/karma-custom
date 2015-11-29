'use strict';

var assert = require('assert');
var chalk = require('chalk');

function report(msg, color, logger){
	(logger ? logger : console).log(color ? chalk[color](msg) : msg);
}

report.notice = function(msg, logger) {
	report(msg, 'cyan', logger);
}

report.success = function(msg, logger) {
	report(msg+' => OK', 'green', logger);
};

report.error = function(msg, logger) {
	report('Error: '+msg, 'red', logger);
};

report.complete = function(logger) {
	report('==Test OK==', 'green', logger);
};

/*===Mock===*/
//set window.karma and window.karmaCustomEnv
(function (window) {
	window.__karma__ = {};

	window.karmaCustomEnv = {
		karmaInstance: null,
		execute: function(karma) {
			this.karmaInstance = karma;
		}
	}
})(global);

//logger mock to test the report functions above
var logger = {
	lastLog : null,
	log : function(msg) {
		logger.lastLog = msg;
	}
};
/*==========*/

try{
	report.notice('==Test started==');
	var spec;

	//===========//
	var reportLog;

	spec = 'Testing the report function';
	reportLog = "test value report";
	report(reportLog, null, logger);
	assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
	report.success(spec)

	spec = 'Testing the report function notice';
	reportLog = "test value report notice";
	report.notice(reportLog, logger);
	assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
	report.success(spec)

	spec = 'Testing the report function success';
	reportLog = "test value report success";
	report.success(reportLog, logger);
	assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
	report.success(spec)

	spec = 'Testing the report function error';
	reportLog = "test value report error";
	report.error(reportLog, logger);
	assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
	report.success(spec)

	spec = 'Testing the report function complete';
	report.complete(logger);
	assert(logger.lastLog.indexOf('==Test OK==') >= 0, spec);
	report.success(spec)

	//===========//

	//include the adapter
	spec = 'The adapter set the karma start function'
	require('./adapter.js');
	assert(typeof global.__karma__.start === 'function', spec);
	report.success(spec);

	spec = 'If called, the karma start function must call window.karmaCustomEnv.execute(karma)'
	global.__karma__.start();
	assert(Object.is(global.karmaCustomEnv.karmaInstance, global.__karma__), spec);
	report.success(spec);

	report.complete();
}
catch(err){
	report.error(err.message);
	throw err;
}