const config = require('config');

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.get('/', (req, res) => res.send(`How did you get here? Shoo!`));

app.use('/api', routes);

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})