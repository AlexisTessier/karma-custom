'use strict';

var assert = require('assert');
var report = require('./report');

//logger mock to test the report functions above
var logger = {
	lastLog : null,
	log : function(msg) {
		logger.lastLog = msg;
	}
};
/*-----------*/

report.notice('==report test started==');

//----------//
var reportLog;
var spec;

spec = 'Testing the report function'
reportLog = "test value report";
report(reportLog, null, logger);
assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
report.success(spec)

spec = 'Testing the report function notice'
reportLog = "test value report notice";
report.notice(reportLog, logger);
assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
report.success(spec)

spec = 'Testing the report function success'
reportLog = "test value report success";
report.success(reportLog, logger);
assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
report.success(spec)

spec = 'Testing the report function error'
reportLog = "test value report error";
report.error(reportLog, logger);
assert(logger.lastLog.indexOf(reportLog) >= 0, spec);
report.success(spec)

spec = 'Testing the report function complete'
report.complete(logger);
assert(logger.lastLog.indexOf('==Test OK==') >= 0, spec);
report.success(spec)