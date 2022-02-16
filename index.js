import express from "express";

const arr = [];

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(8090,function (){
    console.log('le serveur demarre sur le port 8080')
    });

app.use(express.static('./public'));

 //creation d'une route vers index.twig
app.get('/', function(req, res){
  res.render('index.twig', {
        route: "presentation"
    })
})
//creation d'une route vers experiences.twig
app.get('/experiences', function(req, res){
    res.render('experiences.twig',{
        route: "experiences"
    })
})
//creation d'une route vers formation.twig
app.get('/formations', function(req, res){
    res.render('formations.twig',{
        route: "formations"
    })
})
//creation d'une route vers competences.twig
app.get('/competences', function(req, res){
    res.render('competences.twig',{
        route: "competences"
    })
})
//creation d'une route vers portfolio.twig
app.get('/portfolio', function(req, res){
    res.render('portfolio.twig', {
        route: "portfolio"
    })
})
//creation d'une route vers contact.twig
app.get('/contact', function(req, res){
    res.render('contact.twig', {
        route: "contact"
    })
})
app.post('/contact', function(req, res){
    console.log(req.body);
    arr.push(req.body)
    res.redirect('/contact')
    
})

//creation d'une route vers loisirs.twig
app.get('/loisirs', function(req, res){
    res.render('loisirs.twig', {
        route: "loisirs"
    })
})

app.get('/message', function(req, res){
    res.send(arr)
})


