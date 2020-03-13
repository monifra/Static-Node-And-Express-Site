const express = require('express');
const app = express();

//require JSON data

const {projects} = require('./data.json');

//Serve static files
app.use('/static',express.static('public'));

//Set view engine to pug
app.set('view engine', 'pug');

//An index route
app.get('/', (req,res)=> {
    res.render('index', {projects});
});
//An about route
app.get('/about', (req,res)=> {
    res.render('about');
});

//Dynamic projects route
app.get('/project/:id', (req,res,next)=> {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    res.render('project', {project});
});

//Starting a server on port 3000
app.listen(3000, ()=> {
    console.log('The application is running on localhost:3000');
} );