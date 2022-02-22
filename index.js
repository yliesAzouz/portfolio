import express from "express";
import nodemailer from 'nodemailer' // import de nodemailer
import { Config } from './config.js'

// debut du transporteur pour nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail', // car mon adresse est en gmail. si autre (hotmail) changer cette config
  auth: {
    user: Config.mail, // j'aurai pu mettre direct mon adresse mail mais elle aurait été visible sur github
    pass: Config.mailPass // pareil que le commentaire au dessus
  }
});
// fin du tranporteur pour nodemailer

const app = express() // pour initialiser express

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8090, function () {
    console.log('le serveur demarre sur le port 8080')
});

app.use(express.static('./public')); // pour qu'express lise les assets car il ne les lit pas par nature

//creation d'une route vers index.twig
app.get('/', function (req, res) {
    res.render('index.twig', {
        route: "presentation"
    })
})
//creation d'une route vers experiences.twig
app.get('/experiences', function (req, res) {
    res.render('experiences.twig', {
        route: "experiences"
    })
})
//creation d'une route vers formation.twig
app.get('/formations', function (req, res) {
    res.render('formations.twig', {
        route: "formations"
    })
})
//creation d'une route vers competences.twig
app.get('/competences', function (req, res) {
    res.render('competences.twig', {
        route: "competences"
    })
})
//creation d'une route vers portfolio.twig
app.get('/portfolio', function (req, res) {
    res.render('portfolio.twig', {
        route: "portfolio"
    })
})
//creation d'une route vers contact.twig
app.get('/contact', function (req, res) {
    res.render('contact.twig', {
        route: "contact"
    })
})


//creation d'une route vers loisirs.twig
app.get('/loisirs', function (req, res) {
    res.render('loisirs.twig', {
        route: "loisirs"
    })
})



app.post('/contact',async function (req, res) {
    let message = "";
    let mailOptions = { // obligatoire pour la config de nodemailer (a mettre dans le post de la route souhaité)
        from: req.body.email,
        to: 'y.azouz@hotmail.fr',
        subject: 'Contact de ' + req.body.name + ' via le CV en ligne',
        text: req.body.message
      };
      
     transporter.sendMail(mailOptions, function(error, info){ // obligatoire pour la config de nodemailer
        if (error) {
          console.log(error);
          message = "Le message n'a pa pu etre envoyé"
          res.render('contact.twig', {
            message: message
        })
        } else {
          console.log('Email sent: ' + info.response);
          message = "Le message a été envoyé"
          res.render('contact.twig', {
            message: message
        })
        }
      });
})


