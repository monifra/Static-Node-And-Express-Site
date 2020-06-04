//require Express
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
} );

//Dynamic projects route
app.get('/project/:id', (req, res, next)=> {
    const projectId = req.params.id;

    if(projectId < projects.length){ //if choosen project id exist
        const project = projects.find( ({ id }) => id === +projectId );
        res.render('project', {project}); //renderer choosen project page
    }else{ //if choosen project id doesn't exist
        let err = new Error('Project Page Not Found'); //create 404 status error
        err.statusCode = 404;
        next(err);
    }
} );

//error handling
app.get('*', function(req, res, next) { //for any not existing rout
    let err = new Error('Page Not Found'); //create 404 status error
    err.statusCode = 404;
    next(err);
} );


app.use((err, req, res, next)=> {
    res.locals.error = err;
    console.log('Error: Something went wrong');
    res.render('error'); //render error page
} );



//Starting a server on port 3000
app.listen(process.env.PORT || 3000, ()=> {
    console.log('The application is running on localhost:3000');
} );