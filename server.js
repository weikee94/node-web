const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

// stores all of our environment variables as key value pairs
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

// middle function use app.use to register middleware
// and .static as the function we wants
app.use(express.static(__dirname + '/public'));

// use next to tell middleware when it is donw
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         maintenanceMsg: 'Maintenance'
//     })
// });

// middle function use app.use to register middleware
// and .static as the function we wants
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('Hello Express');
    // res.send({
    //     name: 'Wei'
    // })
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMsg: 'Welcome Home',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad request',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
    });
});

app.listen(port, () => {
    console.log(`Server is ready to go on ${port}!`);
});