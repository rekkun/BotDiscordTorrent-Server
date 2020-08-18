const express = require('express');
const router = express.Router();
const http = require('http');
const fs = require('fs');

//Functions
function random(length) {
var result           = '';
var characters       = '0123456789';
var charactersLength = characters.length;
for ( var i = 0; i < length; i++ ) {
	result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}

function wait(ms, cb) {
   setTimeout(cb, ms)
}

router.get('/:text', function(req, res, next) {
	var id = random(16)
	var path = `./temps/${id}.mp3`
	const file = fs.createWriteStream(path);
	const request = http.get(`http://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${req.params.text}`, function(response) {
	  response.pipe(file);
	});
	res.send(id)
	wait(60000)
	fs.unlink(path)
});

module.exports = router;
