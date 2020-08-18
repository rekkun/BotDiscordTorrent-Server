const express = require('express');
const router = express.Router();
const http = require('http');

router.get('/:id', function(req, res, next) {
	const fs = require('fs');

	var path = `./temps/${req.params.id}.mp3`
	res.download(path);
	// setTimeout(fs.unlink(path), 30000);
});

module.exports = router;
