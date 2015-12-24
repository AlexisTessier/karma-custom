'use strict';

var report = require('@alexistessier/report');

try{
	report('notice', '==Test started==');

	require('./adapter-test');

	report('success', '==Test ended==');
}
catch(err){
	report('error', err.message);
	throw err;
}