(function(window) {

function createStartFn(karma) {
  // This function will be assigned to `window.__karma__.start`:
  return function () {
    window.karmaCustomEnv.execute(karma, window);
  };
}

window.__karma__.start = createStartFn(window.__karma__);

})(typeof window !== 'undefined' ? window : global);