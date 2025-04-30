require('./db');

const logger = require('./logger');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('images'));

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/announcements', announcementRoutes);

app.listen(process.env.PORT, () => {
  logger.info(`The server runs on port ${process.env.PORT}`);
});
