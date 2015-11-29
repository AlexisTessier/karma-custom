var path = require('path');

var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initCustom = function(files) {
  files.unshift(createPattern(path.join(__dirname, '/adapter.js')));
};

initCustom.$inject = ['config.files'];

module.exports = {
  'framework:custom': ['factory', initCustom]
};