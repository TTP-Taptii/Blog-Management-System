const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { clientUrl } = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/error');

const app = express();

app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.json({ success: true, message: 'Blog Management API is running' }));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
