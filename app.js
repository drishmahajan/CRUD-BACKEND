const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(express.json());
app.use(cookieParser());

// CORS for frontend dev
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://crud-frontend-n8qn.onrender.com' // <== add this
  ],
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.options('*', cors());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (req, res) => res.json({ ok: true }));

module.exports = app;
