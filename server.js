const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('viewengine', 'ejs');

const MongoClient = require('mongodb').MongoClient;

var db
MongoClient.connect('mongodb+srv://musicology:musicology@cluster0.sagsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useUnifiedTopology: true
}, function (error, client) {
  if (error) return console.log(error)
  db = client.db('musicology')
  app.use('/public', express.static('public'))
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.ejs')
  })
  app.get('/admin-library', function (req, res) {
    res.render('admin-library.ejs')
  })

  app.listen(3080, function () {
    console.log('listening on 3080')
  })

});



app.post('/add', function (req, res) {
  db.collection('counter').findOne({name: '게시물총갯수'}, function (error, result) {
    var 총게시물갯수 = result.totalPost
    db.collection('books').insertOne({
      _id: 총게시물갯수 + 1,
      제목: req.body.title,
      부제목: req.body.subtitle,
      작가: req.body.author,
      연도: req.body.date,
      출판사: req.body.publish,
      분류: req.body.category,
      이미지: req.body.img,
      상세정보: req.body.about,
      구매처: req.body.purchase
    }, function (error, result) {
      console.log('save complete')
      db.collection('counter').updateOne({name: '게시물총갯수'}, {$inc: {totalPost: 1}}, function (error, result) {
        if (error) {return console.log(error)}
        res.redirect('/admin-library');
      })
    })
  })
});

app.get('/admin-library', function (req, res) {
  db.collection('books').find().toArray(function (error, result) {
    res.render('admin-library.ejs', {books: result})
  })
})

app.delete('/delete', function(req, res){
  req.body._id = parseInt(req.body._id)
  db.collection('books').deleteOne(req.body, function(error, result){
    console.log('del complete')
    res.status(200).send({message : 'del success'})
  })

})

app.get('/library/:id', function(req, res){
  db.collection('books').findOne({_id : parseInt(req.params.id)}, function(error, result){
    res.render('book-detail.ejs', {books: result} )
  })
})


app.get('/admin-library/edit/:id', function(req, res){
  db.collection('books').findOne({_id : parseInt(req.params.id)}, function(error, result){
    res.render('edit.ejs', {books: result})
  })
})

app.post
