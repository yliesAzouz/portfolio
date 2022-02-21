import express from "express";
import nodemailer from 'nodemailer' // import de nodemailer
import { Config } from './config.js'

// debut nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Config.mail,
    pass: Config.mailPass
  }
});
// fin de nodemailer

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8090, function () {
    console.log('le serveur demarre sur le port 8080')
});

app.use(express.static('./public'));

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
    let mailOptions = {
        from: req.body.email,
        to: 'y.azouz@hotmail.fr',
        subject: 'Demande de contact de ' + req.body.name + ' sur cv en ligne',
        text: req.body.message
      };
      
     transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          message = "Le message n'a pa pu etre envoyé"
          res.render('contact.twig', {
            message: message,
            debug: error
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


