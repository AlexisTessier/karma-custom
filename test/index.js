'use strict';

var assert = require('assert');
var report = require('./report');

try{
	report.notice('==Test started==');

	require('./report-test');

	require('./adapter-test');

	report.complete();
}
catch(err){
	report.error(err.message);
	throw err;
}