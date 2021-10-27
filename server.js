

const express = require('express');
const app = express();

app.listen(3080, function(){
  console.log('listening on 3080')
});
app.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html')
});

app.use('/public', express.static('public'))