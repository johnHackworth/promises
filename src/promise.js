// Do yourself a favor and use Q ;)

var Promise = function() {
  this.callbacks = [];
};
Promise.prototype = {
  rejected: false,
  resolved: false,
  then: function(callback) {
    this.callbacks.push(callback);
    this.processCallbacks();
    return this;
  },
  fail: function(callback) {
    this.callbackFail = callback;
    this.processCallbacks();
  },
  processCallbacks: function() {
    if (this.rejected) {
      this.callbackFail.call(this, this.rejectedParam);
    }
    if (this.resolved) {
      while (this.callbacks.length) {
        var callback = this.callbacks.shift();
        var callbackResponse = callback.call(this, this.resolvedParam);
        if (callbackResponse && callbackResponse.then) {
          callbackResponse.then(this.resolve.bind(this)).fail(this.reject.bind(this));
          break;
        }
      }
    }
  },
  reject: function(param) {
    this.rejectedParam = param;
    this.rejected = true;
    this.processCallbacks();
  },
  resolve: function(param) {
    this.resolvedParam = param;
    this.resolved = true;
    this.processCallbacks();
  }
};
module.exports = Promise;
