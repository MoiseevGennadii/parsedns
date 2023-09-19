const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.json());

app.post('/',  (req, res) => {
  console.log(req.body);
   res.send('Данные успешно получены.');
   let json = JSON.stringify(req.body, null, 4);
      fs.writeFile('dns.json', json, 'utf8', (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File has been saved');
	  console.log('dns.json.length - ', req.body.length);    
    }
  })
});
app.listen(port, () => {
  console.log('Хакерский сервер запущен');
});
