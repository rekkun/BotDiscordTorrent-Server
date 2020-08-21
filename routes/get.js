const express = require('express');
const router = express.Router();

router.get('/:url', function(req, res, next) {
	const WebTorrent = require('webtorrent')
	const client = new WebTorrent()
	const db = require('dropbox-stream');
	const http = require('http');
	const fs = require('fs-extra');
	const path = require('path')
	const zl = require("zip-lib");
	
	const TOKEN = 'TslsFYc4bs4AAAAAAAAAAQDqcd_lPJu8aLfBI8MxDvCyP0IV8cdC-Iq4isDYpMUV';
	
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

// 	const space = /\s/g;
// 	const hai_cham = new RegExp('\\:', 'g');
// 	const gach_cheo = new RegExp('\\/', 'g');
	
// 	var arr = decodeURI(req.params.url).replace(space, '_').split('&tr=')
	
// 	function enc(length) {
// 		var result           = ''
// 		for ( var i = 1; i < length; i++ ) {
// 			result += ('&tr=' + arr[i].replace(hai_cham, '%3A').replace(gach_cheo, '%2F'))
// 	   }
// 	   return result;
// 	}
	var magnetURI = req.params.url
	var folder_name = req.params.url.split('&')[1].slice(3)
	
	console.log(folder_name)
	
	client.add(magnetURI, {path: `./res/${folder_name}` }, function (torrent) {
	  // Torrents can contain many files. Let's use the .mp4 file
		console.log('run')
		torrent.on('done', function(){
			zl.archiveFolder(`./res/${folder_name}`, `./res/${folder_name}.zip`).then(function () {
				const up = db.createDropboxUploadStream({
				token: TOKEN,
				path: `/Torrent/${folder_name}.zip`,
				chunkSize: 1000 * 1024,
				autorename: true,
				mode: 'add'
			  })
				.on('error', err => console.log(err))
				.on('progress', res => console.log(res))
				.on('metadata', metadata => console.log('Metadata', metadata))
				fs.createReadStream(`./res/${folder_name}.zip`).pipe(up).on('finish', () => {
					console.log(`Upload thành công file ${folder_name}.zip`)
					fs.emptyDir('./res')
				})
			})
			
		})
	})
	res.send(`${folder_name}.zip`)
});

module.exports = router;
