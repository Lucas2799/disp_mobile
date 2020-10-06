const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const { ObjectId } = require('mongodb')

app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient 
const uri="mongodb+srv://dbUser:Lucas2412@unifacs.iltjy.gcp.mongodb.net/Unifacs?retryWrites=true&w=majority";

MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
  if (err) return console.log(err)  
  db = client.db('Unifacs')

  app.listen(3000, function() {
    console.log('server is running on port 3000')
  })
})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//___________________________________lucas________________________________________

app.set('view engine', 'ejs')
//Implementação para informar o servidor o que deve fazer
app.get('/', (req, res) => {
    res.render('lucas/index.ejs')
})
app.get('/', (req, res) => {
    let cursor = db.collection('livro').find()
})

app.get('/show', (req, res) => {
    
    db.collection('livro').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('lucas/show.ejs', { livro: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('livro').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
        db.collection('livro').find().toArray((err, results) => {
            console.log(results)
        })
    })
    
})
//Rota para o roteamento de solicitação
app.route('/lucas/edit/:id').get((req, res) => {
  var id = req.params.id
  db.collection('livro').find({"_id": ObjectId(id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('lucas/edit.ejs', {livro: result, title: 'Editar usuário'})
  })
})
app.route('/lucas/update').post((req, res) => {
    var id = req.body.id
    console.log(id);
    var nome = req.body.nome
    var fantasia = req.body.fantasia
    var cnpj = req.body.cnpj
    var cidade = req.body.cidade
    var tipo = req.body.tipo
   
    db.collection('livro').updateOne(
        {_id: ObjectId(id)},

        {$set: {
          nome: nome, 
          fantasia: fantasia,
          cnpj: cnpj, 
          cidade : cidade,
           tipo: tipo} 
          }, 
        (err, result) => {
        if (err) return res.send(err)
        res.redirect('/show')
        console.log('Atualizado no Banco de Dados')
    })
  })
  app.route('/lucas/delete/:id')
  .get((req, res) => {
  var id = req.params.id
 
  db.collection('livro').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})
