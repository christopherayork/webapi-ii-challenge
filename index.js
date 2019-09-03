const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());
app.use('/api', router);

app.use('/', (req, res) => res.send('API up and running!'));
app.listen(5000, () => console.log('API running on port 5000'));
