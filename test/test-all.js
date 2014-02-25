'use strict';

var laravelValidator = require('../index'),
    expect = require('expect.js'),
    fs = require('fs'),
    File = require('vinyl');

describe('gulp-laravel-validator', function() {
  it('should generate the min-example', function(done) {
    var stream = laravelValidator();

    fs.readFile('test/fixtures/min-example.val', function(err, buffer) {
      if (err) {
        throw err;
      }

      var fakeFile = new File({
        path: 'test/fixtures/min-example.val',
        base: 'test/fixtures',
        contents: buffer,
      });
      stream.write(fakeFile);

      stream.once('data', function(file) {
        expect(file.isBuffer()).to.be.ok();
        var expected = fs.readFileSync('test/expected/min-example.php');
        expect(file.contents.toString()).to.be.eql(expected.toString());
        done();
      });
    });
  });

  it('should generate the subfolder example', function(done) {
    var stream = laravelValidator();

    fs.readFile('test/fixtures/subfolder/example.val', function(err, buffer) {
      if (err) {
        throw err;
      }

      var fakeFile = new File({
        path: 'test/fixtures/subfolder/example.val',
        base: 'test/fixtures',
        contents: buffer,
      });
      stream.write(fakeFile);

      stream.once('data', function(file) {
        expect(file.isBuffer()).to.be.ok();
        var expected = fs.readFileSync('test/expected/subfolder/example.php');
        expect(file.contents.toString()).to.be.eql(expected.toString());
        done();
      });
    });
  });
});
