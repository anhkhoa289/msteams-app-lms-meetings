const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static('build/static'))

app.get('/lti.xml', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/build/lti.xml'));
})
app.post('/lti.xml', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/build/lti.xml'));
})
app.get('/manifest.json', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/build/manifest.json'));
})
app.post('/manifest.json', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/build/manifest.json'));
})

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '/build/index.html'));
});
app.post('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(3000)
