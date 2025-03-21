require('./db');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server runs on port ${PORT}`);
});
