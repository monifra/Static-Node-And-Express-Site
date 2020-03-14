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
app.get('/about', (req, res)=> {
    res.render('about');
});

//Dynamic projects route
app.get('/project/:id', (req, res, next)=> {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    res.render('project', {project});
});

//error handling

app.get('*', function(req, res, next) {
    let err = new Error('Page Not Found');
    err.statusCode = 404;
    next(err);
});
app.use((err, req, res, next)=> {
    res.locals.error = err;
    res.render('error');
} );

//Starting a server on port 3000
app.listen(3000, ()=> {
    console.log('The application is running on localhost:3000');
} );