'use strict';

var task = require('@alexistessier/gulp-workflow-common-task');

task.mustache('readme-for-node-package');

task.build();
task.watch();

task.default('build');