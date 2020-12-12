var express = require('express');
var router = express.Router();
const { spawn } = require('child_process')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('input')
});

router.post('/translation', (req, res) => {
  const word = req.body.word
  console.log(word)
  const comm = spawn('~/smt/mosesdecoder/bin/moses -f ~/corpus/working/mert-work/moses.ini', null, {
    shell: true,
    stdio: ['pipe', process.stdout, process.stdin]
  })
  process.stdin.pipe(comm.stdin)
  comm.stdin.write(word + '\n')
  comm.stdout.on('data', data => {
    let result = data.split('\n')
    let idx = 0
    for(let i = 0;i < result.length;i++) {
      if(result[i].includes('Line 0: Search took')) {
        idx = i
        break
      }
    }
    res.json({
      status: 200,
      result: result[idx + 1]
    })
  })
  comm.stdin.end(); 

  // cmd.get('~/smt/mosesdecoder/bin/moses -f ~/corpus/working/mert-work/moses.ini', (err, data, stderr) => {
    // cmd.get('node tesinput.js | afif', (err, data, stderr) => {
    //   console.log(err)
    //   console.log(data)
    //   let result = data.split('\n')
    //   let idx = 0
    //   for(let i = 0;i < result.length;i++) {
    //     if(result[i].includes('Line 0: Search took')) {
    //       idx = i
    //       break  
    //     }
    //   }
    //   res.json({
    //     status: 200,
    //     result: result[idx + 1]
    //   })
    // })
  // })
})

module.exports = router;
