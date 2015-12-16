'use strict';

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

module.exports = report;