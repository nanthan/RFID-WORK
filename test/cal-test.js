//test/cal-test.js
var assert = require('assert');
var cal = require('../app/cal');
//jasmin style
describe('cal', function(){
	describe('add', function(){
		it('should add correctly', function(){
			assert.equal(5, cal.add(2, 3));
		})
	})
})


/*describe('cal', function(){
	describe('add', function(done){
		it('should add correctly', function(){
			assert.equal(5, cal.add(2, 3));
			done();
		})
	})
})*/