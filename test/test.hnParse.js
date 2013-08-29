var assert = require('assert'),
	nock = require('nock'),
  	parse = require('./../hnParse').parse,
  	changeUrl = require('./../hnParse').changeUrl;

suite('parse', function() {
	test('parse returns non-empty object', function(done) {
		parse(function(error, data) {
			assert.ok(typeof data === "object" && data !== {});
			done();
		});
	});

	test('parse returns null for error on success', function(done) {
		parse(function(error, data) {
			assert.equal(error, null);
			done();
		});
	});

	test('parse returns good values', function(done) {
		parse(function(error, data) {
			assert.ok(data.rss);
			assert.equal(data.rss.channel.length, 1);
			assert.ok(data.rss.channel[0].item.length > 0);		
			done();
		});		
	});

	test('parse returns fail on anything but http 200', function(done) {
		var mock404 = nock('https://news.ycombinator.com')
                .get('/rss')
                .reply(404, {});
		parse(function(error, data) {
			assert.notEqual(error || data.statusCode, null);
			done();
			nock.restore();
		});
	}); 
});

suite('changeUrl', function() {
	test('changeUrl affects parse URL', function(done) {
		changeUrl("http://cnn.com");
		parse(function(error, data) {
			assert.notEqual(error, null);
			done();
		});
	});
});