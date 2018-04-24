
const express = require('express');
const hbs = require('hbs');

var app  = express();

// set partial path
hbs.registerPartials(__dirname + '/views/partials');

// Registering helper , see call of helper in footer.hbs
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
// set view engine handlebars
app.set('view engine','hbs');

// set defaulut template/html directory using middleware
app.use(express.static(__dirname + '/public'));

// middleware, executed before any request served.
app.use((request,response,next)=>{
    console.log('Time:' + new Date().toString() +', Request Method: ' + request.method );
    next();
});

app.get('/',(request,response) => {
    
    // sending HTML or plain text
    // response.send('<h1>Hello Express</h1>');

    // sending JSON response
    // response.send({
    //     name:"Bhavin",
    //     hobbies: ["Programming","Eating"]
    // });
 
    // rendering template 
    response.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage: "Welcome to my website."
    });
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/bad',(request,response)=>{
    response.send({
        error:'Unable to find the request'
    });
});

app.listen(3000, ()=> {
    console.log("server is running");
});