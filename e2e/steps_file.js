
'use strict';
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    wait4Redirect: function waitForRedirect(necessaryUrlFragment, timeout) {
    let hasRedirected = false;
    browser.wait(() => {
      browser.getCurrentUrl()
        .then(url => { url.includes(necessaryUrlFragment)})
        .then(hasNavigated => {
          hasRedirected = hasNavigated;
        });

      return hasRedirected;
    }, timeout);
    }

    // wait4Redirect: function waitForRedirect (expectedUrl, timeout) {
    //     var loaded = false;
    //
    //     browser.wait(function () {
    //         browser.executeScript(function () {
    //             return {
    //                 url: window.location.href,
    //                 haveAngular: !!window.angular
    //             };
    //         }).then(function (obj) {
    //             loaded = (obj.url == expectedUrl && obj.haveAngular);
    //         });
    //
    //         return loaded;
    //     }, timeout);
    // }(expectedUrl, timeout)


  });
}
