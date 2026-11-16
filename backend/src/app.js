const express = require('express');
const cors = require('cors');
const { clientUrl } = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const categoriesRoutes = require('./routes/categories.routes');
const movementsRoutes = require('./routes/movements.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(
  cors({
    origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'StockFlow API online.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/movements', movementsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado.' });
});

app.use(errorMiddleware);

module.exports = app;
