var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:iid', function(req, res, next) {
  	var options = {
		  method: 'GET',
		  url: 'https://union.0html.com/getcid_cn/getCID.php?IID='+req.params.iid
		};
	request(options, function (error, response, result) {
    	if (!error) {
			var result = JSON.parse(result);
			res.send(result.CID);
		}
	})
});

module.exports = router;
