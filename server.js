var path = require('path')

var express = require('express')
var hbs = require('express-handlebars')

var server = express()

// view engine config

var hbsConfig = {
  defaultLayout: 'main',
  extname: 'hbs'
}
server.engine('hbs', hbs(hbsConfig))
server.set('view engine', 'hbs')

// middleware

server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))

// sample data

var data = {
  cats: [
    {id: 1, name: 'fluffy', image:'Maine Coon', lifestory: 'Wet Food'},
    {id: 2, name: 'tick', image:'Siamese', lifestory: 'Raw mince'}
  ]
}

// routes

server.get('/', function (req, res) {
  res.redirect('/cats') // what is this doing?
})

server.get('/cats', function (req, res) {
  res.render('index', data)
})

server.get('/cats/new', function (req, res) {
  res.render('new')
})

server.get('/cats/:id', function (req, res) {
  //console.log(req.params) // try going to /cats/1
  let requestID = req.params.id;
  let found = Object.values(data);
  let filteredData = (found[0][requestID - 1])
    console.log(filteredData);
    res.render('show', filteredData)
    });
   
server.post('/cats', function (req, res) {
  console.log(req.body)
  let request = req.body
  
  
  let id = (data.cats.length + 1);
  let name = (req.body.name);
  let image = (req.body.image);
  //let lifestoryString = 'life-story'
  lifestory = req.body['life-story'];

  //id = counter + 1;
  console.log(request)
  data.cats[id - 1] = {id, name, image, lifestory};
  console.log(data.cats)
})

server.get('/cats/edit/:id', function (req,res){
  let requestID = req.params.id;
  let found = Object.values(data);
  let filteredData = (found[0][requestID - 1])
    console.log(filteredData);
  res.render('edit', filteredData)
})

server.post('/cats/:id', function (req, res) {
  console.log(req.body)
  let id = Number(req.params.id)
  console.log(id);
  let name = (req.body.name);
  let image = (req.body.image);
  //let lifestoryString = 'life-story'
  let lifestory = req.body['life-story'];

  //id = counter + 1;
  //console.log(request.values)
  data.cats[id - 1] = {id, name, image, lifestory};
  console.log(data.cats)
})

module.exports = server
