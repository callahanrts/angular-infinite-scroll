// conf.js
exports.config = {
  baseUrl: "file:///" + __dirname + "/",
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/*.js'],
  capabilities: {
      'browserName': 'firefox' // or 'safari'
  },
  onPrepare: function() {
    // By default, Protractor use data:text/html,<html></html> as resetUrl, but
    // location.replace (see http://git.io/tvdSIQ) from the data: to the file: protocol is not allowed
    // (we'll get ‘not allowed local resource’ error), so we replace resetUrl with one
    // with the file: protocol (this particular one will open system's root folder)
    browser.resetUrl = 'file://';

    // This isn't required and used to avoid ‘Cannot extract package’ error showed
    // before Protractor have redirected node-webkit to resetUrl.
    browser.driver.get('file://');
  }
}
