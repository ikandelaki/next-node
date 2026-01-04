import ResourceConnection from './database/ResourceConnection.ts';
import express from 'express';
import dotenv from 'dotenv';
import menusRouter from './routes/menus.ts';
import cors from 'cors';

export const DEFAULT_SERVER_PORT = 3000;

const resourceConnection = new ResourceConnection();
resourceConnection.init();
resourceConnection.runMigrations();

const {
    parsed: {
        SERVER_PORT = DEFAULT_SERVER_PORT
    } = {}
} = dotenv.config() || {};

const app = express();

// Configure CORS for a specific origin (e.g., your React app running on port 3000)
const corsOptions = {
  origin: 'http://localhost:3000',
  // You can also allow specific methods
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If you need to handle cookies or authorization headers
};

app.use(cors(corsOptions));

// parse JSON bodies
app.use(express.json());

// mount routes
app.use('/menus', menusRouter);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
})