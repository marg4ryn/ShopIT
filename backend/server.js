require('./db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server runs on port ${PORT}`);
});
