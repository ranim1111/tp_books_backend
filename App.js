const express = require("express")
const { default: mongoose } = require("mongoose")
const Book = require("./models/Book")
mongoose.connect("mongodb+srv://ranimba:21428118@cluster0.sa78t.mongodb.net/tpbackend?retryWrites=true&w=majority",
//mongoose.connect("mongodb://localhost:27017/Back",
{ useNewUrlParser : true,useUnifiedTopology : true })
.then(()=> console.log("Connexion a  MongoDB réussie!"))
.catch((e)=>console.log("Connexion à MongoDB échouée!",e))
const app = express();

app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader("Acces-Control-Allow-Origin","*")
    res.setHeader(
        "Acces-Control-Allow-Headers",
        "Origin,X-Requested_With,Content,Accept,Content-Type,Authorisation"
    )
    res.setHeader(
        "Acces-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,PATCH,OPTIONS"
        
    )
    next()
})
    ///////////////Ajouter un livre ///////////////////////////////

app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Livre enregistré'}))
      .catch(error => res.status(400).json({ error }));
  });
    ///////////////Supprimer un livre ///////////////////////////////

app.delete("/api/books/:id",(req,res)=>{
    Book.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({message: "Livre supprimé"}))
.catch((error) => res.status(400).json({error: error.message}))
})

    ///////////////Modifier un livre ///////////////////////////////

app.put('/api/books/:id', (req, res, next) => {
        Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre modifié'}))
          .catch(error => res.status(400).json({ error }));
      });
    ///////////////Récuperer tous les livres ///////////////////////////////
    
app.get("/api/books/",(req,res)=>{
        Book.find()
        .then((tasks) => {
            res.status(200).json(
                {model: tasks, message: "Success"}
            )
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "Problème d'extraction"
            })
        })
    })
    ///////////////Récuperer un livre par son id///////////////////////////////
    app.get('/api/books/:id', (req, res, next) => {
        Book.findOne({ _id: req.params.id })
          .then(book => res.status(200).json(book))
          .catch(error => res.status(404).json({ error }));
      });
module.exports=app