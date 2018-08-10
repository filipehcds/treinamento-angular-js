// Karma configuration
// Generated on Fri Dec 16 2016 18:53:47 GMT-0500 (Eastern Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
        './node_modules/angular/angular.js',
        './node_modules/angular-ui-router/release/angular-ui-router.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-sanitize/angular-sanitize.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './app/scripts/main.js',
        './app/scripts/**/*.js',
        './app/templates/**/*.html',
        /*
        './app/scripts/hero.factory.js',
        './app/scripts/hero.service.js',
        './app/scripts/users.js',
        './app/scripts/hero.factory.spec.js',
        './app/scripts/hero.service.spec.js'
        */
        './tests/scripts/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      //stripPrefix: 'public/',
      //stripSuffix: '.ext',
      // prepend this to the
      prependPrefix: 'tests/',

      // or define a custom transform function
      // - cacheId returned is used to load template
      //   module(cacheId) will return template at filepath
      cacheIdFromPath: function(filepath) {
        // example strips 'public/' from anywhere in the path
        // module(app/templates/template.html) => app/public/templates/template.html
        var cacheId = filepath.replace('app/', '');
        
        console.log("cacheId:",cacheId);
        return cacheId;
      },

      // - setting this option will create only a single module that contains templates
      //   from all the files, so you can load them all with module('templates')
      // - you may provide a function(htmlPath, originalPath) instead of a string
      //   if you'd like to generate modules dynamically
      //   htmlPath is a originalPath stripped and/or prepended
      //   with all provided suffixes and prefixes
      moduleName: 'templates'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','junit'],

    junitReporter: {
      outputDir: '', // results will be saved as $outputDir/$browserName.xml 
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile 
      suite: '', // suite will become the package name attribute in xml testsuite element 
      useBrowserName: true, // add browser name to report and classes names 
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element 
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element 
      properties: {} // key value pair of properties to add to the <properties> section of the report 
    },
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
