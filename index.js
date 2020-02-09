const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());

app.use(express.json({ extended: false }));

const db = process.env.MONGODB_URL || 'mongodb://127.0.0.1/DMMS';

const mongoose = require('mongoose');
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

app.use('/api/customers', require('./routes/Customers'));
app.use('/api/sale', require('./routes/DailySale'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
