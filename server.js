

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.set('viewengine','ejs');

const MongoClient= require('mongodb').MongoClient;

var db
MongoClient.connect('mongodb+srv://musicology:musicology@cluster0.sagsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology:true}, function(error, client){
  if(error) return console.log(error)
  db=client.db('musicology')
  app.use('/public', express.static('public'))
  app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html')
  });

  app.get('/admin-library', function(req, res){
    res.render('admin-library.ejs')
  });
  
  app.post('/add', function(req, res){
    res.send('complete');
    db.collection('books').insertOne({ 제목: req.body.title, 부제목:req.body.subtitle, 작가:req.body.author, 연도:req.body.date, 출판사:req.body.publish, 분류:req.body.category, 이미지:req.body.img, 상세정보:req.body.about, 구매처:req.body.purchase}), function(error, result){
      console.log('저장완료')
    }
  })

  app.listen(3080, function(){
    console.log('listening on 3080')
  });

});

