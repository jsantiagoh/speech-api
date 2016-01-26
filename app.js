const express = require('express')
const app = express()
const wit = require('node-wit')
const dateFormat = require('dateformat')

const ACCESS_TOKEN = process.env.WIT_ACCESS_TOKEN
if ( !ACCESS_TOKEN ) {
    console.error("Missing 'WIT_ACCESS_TOKEN' environment variable")
    process.exit(1)
}

function witResponder(res, label, startedAt) {
    return function (err, witres) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.json(witres)
      }
      const ts = dateFormat(new Date(),"dd-mm-yyyy hh:mm:ss.ms")
      console.log(`${ts} ${label}: ${(Date.now() - startedAt)} ms` )
    }
}

app.get('/v1/text/', function(req, res) {
  const q = req.query.q
  wit.captureTextIntent(ACCESS_TOKEN, q, witResponder(res, "/text", Date.now()))
})

app.post('/v1/speech/', function(req, res) {
  wit.captureSpeechIntent(ACCESS_TOKEN, req, "audio/wav", witResponder(res, "/speech", Date.now()))
})

app.listen(3000, function () {
  console.log('listening on port 3000.')
})
