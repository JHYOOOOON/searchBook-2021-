const express = require('express');

const app = express();
const port = 4000;

app.use(express.static(__dirname + '/src'));

app.get('/', function(req, res){
  res.render('index');
})

app.listen(process.env.PORT || port, function(err) {
  console.log('Connected port - ' + port);
  if (err) {
    return console.log('Found error - ', err);
  }
});