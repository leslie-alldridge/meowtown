let express = require('express'),
	server = express(),
    data = require('./data.json');
    
const {
	readCats,
	writeCats,
} = require('./fileReaders')

server.get('/', function(req, res) {
	res.redirect('/cats')
})

server.get('/cats', function(req, res) {
    readCats('./data.json',(err, data) => {
    res.render('index', data)
    })
})

server.get('/cats/help', function(req, res) {
	res.render('help');
})

server.get('/cats/new', function(req, res) {
	res.render('new')
})

server.get('/cats/:id', function(req, res) {

	readCats('./data.json',(err, data) => {
		if (err) res.sendStatus(500)
		else {
			console.log('params', req.params)
			let id = Number(req.params.id);
			//console.log("heyID", id)


			let index = data.cats.findIndex((view) => {
				return view.id == id
			})
			//console.log("heyIndex", index)
			
			let found = data.cats.find((view) => {
				return view.id == id
			})
			id = index; 
			//console.log("hey", found)

			data.cats[id].lives--;
			req.body.lifestory = data.cats[id].lifestory;

            console.log("Current lives of cat ID: " + id + ": " + data.cats[id].lives);
			
			if (data.cats[id].lives <= 0){

                let arr = data.cats.splice(id,1)

                writeCats('./data.json', data, (err) => {
                    if (err) res.sendStatus(500)
                })
					res.send('Why did you kill me? What a sad sad person...')

            	} else {

                writeCats('./data.json', data, (err) => {
                    if (err) res.sendStatus(500)
                })
    
                res.render('show', found)
            }
		}
	})
})


server.post('/cats', function(req, res) {
	readCats('./data.json',(err, data) => {
		if (err) res.sendStatus(500)
		else {



	console.log(req.body)
	let request = req.body

	let arr2 = []

	for(var key in data.cats) {
		arr2.push( data.cats[key].id );
	}

	let NewID = Math.max.apply(null, arr2) + 1
	//console.log("zsca", NewID)


	req.body.lives = 9;
	//console.log(request)

	data.cats[data.cats.length] = req.body;


	req.body.id = NewID;



	writeCats('./data.json', data, (err) => {
		if (err) res.sendStatus(500)
		else
			res.redirect('/')
	})

	console.log(data.cats)
}
})
})

server.get('/cats/edit/:id', function(req, res) {

	let requestID = req.params.id;
	let found = Object.values(data);
	let filteredData = (found[0][requestID - 1])
    console.log(filteredData);
    
	res.render('edit', filteredData)
})

server.post('/cats/:id', function(req, res) {

	readCats('./data.json',(err, data) => {
		if (err) res.sendStatus(500)
		else {

			let catId = req.params.id
			let index = data.cats.findIndex((view) => {
				return view.id == catId;
            })
		   
			
            req.body.lives = data.cats[catId].lives; //assigning lives
			req.body.id = Number(req.params.id)
            delete req.body.commit
            data.cats[index] = req.body;
        
			writeCats('./data.json', data, (err) => {
				if (err) res.sendStatus(500)
				else {
					res.redirect('/cats/' + catId)
				}
			})
		}
	})
})
module.exports = server