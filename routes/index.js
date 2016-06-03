var express = require('express');
var router = express.Router();
var facts = require('../data/parkFacts.js');

router.get('/test', function(req, res) {
	var info = {
		'name': 'my application',
		'status': 'OK'
	}
	res.json(info);
});


// Send facts from file for info card
router.get('/info/:park', function(req, res) {
	var park = req.params.park;
	var details = facts[park];
	res.json(details);
});

module.exports = router;