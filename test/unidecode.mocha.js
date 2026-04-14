/**
 * Regression tests aligned with Text::Unidecode reference cases.
 * @see https://metacpan.org/pod/Text::Unidecode
 */

'use strict';

/* global describe, it */

var assert = require('assert');
var unidecode = require('../lib/unidecode');

describe('# Purity tests', function(){
	var code;
	var tests = [];

	for(code=0; code<=127; code++) {
		tests.push(String.fromCharCode(code));
	}
	tests.forEach(function(test) {
		it(test.charCodeAt(0).toString(16) + ' ' + test, function(){
			var exp = test;
			var res = unidecode(exp);
			assert.equal(res, exp);
		});
	});
});

describe('# Basic string tests', function(){

	var tests = [
		"",
		1/10,
		"I like pie.",
		"\n",
		"\r\n",
		"I like pie.\n",
	];

	tests.forEach(function(test) {
		it(String(test), function(){
			var exp = test;
			var res = unidecode(test.toString());
			assert.equal(res, exp);
		});
	});
});

describe('# Complex tests', function(){

	var tests = [
		["\u00C6neid", "AEneid"],
		["\u00E9tude", "etude"],
		["\u5317\u4EB0", "Bei Jing "],
		["\u1515\u14c7\u14c7", "shanana"],
		["\u13d4\u13b5\u13c6", "taliqua"],
		["\u0726\u071b\u073d\u0710\u073a", "ptu'i"],
		["\u0905\u092d\u093f\u091c\u0940\u0924", "abhijiit"],
		["\u0985\u09ad\u09bf\u099c\u09c0\u09a4", "abhijiit"],
		["\u0d05\u0d2d\u0d3f\u0d1c\u0d40\u0d24", "abhijiit"],
		["\u0d2e\u0d32\u0d2f\u0d3e\u0d32\u0d2e\u0d4d", "mlyaalm"],
		["\u3052\u3093\u307e\u3044\u8336", "genmaiCha "],
	];

	tests.forEach(function(test) {
		it(test[0] + '-->' + test[1], function(){
			var exp = test[1];
			var res = unidecode(test[0]);
			assert.equal(res, exp);
		});
	});
});

describe('# Custom substitution value tests', function(){

	var tests = [
		["ab\uFFFFc", "X", "abXc"],
		["12\ud900\u1b003", " ", "12  3"]
	];

	tests.forEach(function(test) {
		it('{' + test[1] + '} ' + test[0] + '-->' + test[2], function(){
			var exp = test[2];
			var res = unidecode(test[0], test[1]);
			assert.equal(res, exp);
		});
	});
});
