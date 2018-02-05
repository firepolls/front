require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');

const app = express();

app.use(favicon(`${__dirname}/favicon.ico`));
app.use(express.static(`${__dirname}/build`));

app.get('*', (request, response) =>
  response.sendFile(`${__dirname}/build/index.html`));

app.listen(process.env.PORT, () => { 
  console.log('__SERVER_UP__', process.env.PORT);
});
