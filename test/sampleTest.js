var chai = require('chai');
var should = chai.should();
describe('Array', function() {
  it('should start empty', function() {
    var arr = [];
    should.equal(arr.length, 0);
  });
});
