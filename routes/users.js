var express = require('express');
var router = express.Router();
const cmd=require('node-cmd');

router.get('/kata', function(req, res, next) {
  res.render('input')
});

router.post('/kata/', function(req, res, next) {
  const word = req.body.kata
  console.log(word)
  cmd.get('cat tesfile', (err, data, stderr) => {
    let result = data.split('\n')
    for(var i in result) {
      if(result[i].includes('Line 0: Search took')) {}
    }
  })
});

module.exports = router;
