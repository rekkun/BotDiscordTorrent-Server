const express = require('express');
const router = express.Router();
const http = require('http');

router.get('/:id.mp3', function(req, res, next) {
	var path = `./temps/${req.params.id}.mp3`
	res.download(path);
});

module.exports = router;
