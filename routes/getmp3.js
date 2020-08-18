const express = require('express');
const router = express.Router();


router.get('/:text', function(req, res, next) {
	const http = require('http');
	const fs = require('fs');
	
	//Functions
	function random(length) {
	var result           = '';
	var characters       = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
	}

	var id = random(8)
	var path = `./temps/${id}.mp3`
	const file = fs.createWriteStream(path);
	const request = http.get(`http://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${req.params.text}`, function(response) {
	  response.pipe(file);
	});
	res.send(id)
});

module.exports = router;
