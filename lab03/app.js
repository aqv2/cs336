//Taken from http://expressjs.com/en/starter/hello-world.html

const express = require('express')
const app = express()

app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));

app.listen(app.get('port'), () => console.log(`App listening on port ${app.get('port')}!`));
