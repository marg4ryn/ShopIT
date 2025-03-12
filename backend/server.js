require('./db');

const express = require('express');
const app = express();

app.listen(3000, () => console.log("The server runs on port 3000"));
