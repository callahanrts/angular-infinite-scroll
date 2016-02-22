
module.exports = function(grunt) {

  grunt.initConfig({
    protractor: {
      options: {
        configFile: "conf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
        all: {}
        //options: {
        //  configFile: "e2e.conf.js", // Target-specific config file
        //  args: {} // Target-specific arguments
        //}
      },
    },

    protractor_webdriver: {
      options: {
        // Task-specific options go here.
        path: './node_modules/protractor/bin/',
        command: 'webdriver-manager start'
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      },
    },

  })

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-protractor-webdriver');

  // Default task(s).
  grunt.registerTask('test', ['protractor_webdriver', 'protractor']);

};
