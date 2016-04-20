var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var test = require('../models/model.js');


router.get('/test', function(req, res) {
	var info = {
		'name': 'my application',
		'status': 'OK'
	}
	res.json(info);
});

// Just checking the DB works
router.post('/api/create/:nameval/:valval', function(req, res){
	var name = req.params.nameval;
	var val = req.params.valval;
	console.log("request: ", name, val);

	var testobj = {
		name: name,
		val: val
	};

	var tester = new test(testobj);

	tester.save(function(err, data) {
		if (err) {
			var error = {status: 'ERROR', message: 'Error saving record'};
			console.log(error);
			return res.json(error);
		}

		console.log('saved !', data);

		var jsonData = {
			status: 'OK',
			tester: data
		}

		return res.json(jsonData);
	});
});


// See what's in the DB
router.get('/api/display', function(req, res) {
	test.find(function(err, data) {
		if (err || data == null) {
			var error = {status: 'ERROR', message: 'Nothing found'};
			return res.json(error);
		}

		var jsonData = {
			status: 'OK',
			tests: data
		}
		res.json(jsonData);
	});
});


module.exports = router;