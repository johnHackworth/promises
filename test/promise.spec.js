var chai = require("chai");
var should = require('chai').should();
var Promise = require("../lib/promise");

describe('Promise', function() {

  it('should be able able to create and resolve a promise', function(done) {
    var pr = new Promise();
    pr.then(done);
    pr.resolve();
  });

  it('should be able able to create and reject a promise', function(done) {
    var pr = new Promise();
    pr.fail(done);
    pr.reject();
  });
  it('should be able able to create, chain and resolve several promises', function(done) {
    var pr = new Promise();
    pr.then(function() {
      var pr2 = new Promise();
      setTimeout(pr2.resolve.bind(pr2), 25);
      return pr2;
    }).then(done);
    pr.resolve();
  });
  it('should be auto resolve the promise if the promise is resolved when the callback is asigned', function(done) {
    var pr = new Promise();
    pr.resolve('test');
    pr.then(function(data) {
      data.should.equal('test');
      done();
    });
  });
  it('should be able able to create, chain and reject the first promise', function(done) {
    var pr = new Promise();
    pr.then(function() {
      var pr2 = new Promise();
      setTimeout(pr2.resolve.bind(pr2), 25);
      return pr2;
    }).fail(done);
    pr.reject();
  });
  it('should be able able to create, chain and reject the chained promise', function(done) {
    var pr = new Promise();
    pr.then(function() {
      var pr2 = new Promise();
      setTimeout(pr2.reject.bind(pr2), 25);
      return pr2;
    }).fail(done);
    pr.resolve();
  });
});