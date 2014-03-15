'use strict';

var through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    validator = require('laravel-validator');

var PLUGIN_NAME = 'gulp-laravel-validator';

function gulpLaravelValidator() {
  var stream = through.obj(function(file, enc, callback) {
    // Do nothing if no contents
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    // We cannot handle streams without bufferring them first
    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Streaming not supported');
    }

    // For buffers read them and push the generated validators
    if (file.isBuffer()) {
      var generated;
      try {
        generated = validator.generate(file.base, file.path);
      } catch (err) {
        this.emit('error', err);
        return callback();
      }

      file.contents = new Buffer(generated);
      this.push(file);
      return callback();
    }
  });

  return stream;
}

module.exports = gulpLaravelValidator;
