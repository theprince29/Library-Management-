import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import bookRoute from './routes/bookRoutes.js'
import transactionRoute from './routes/transactionsRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const connectDB = async (): Promise<void> => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};


connectDB(); 
// Configure CORS options
// const corsOptions = {
//   origin: process.env.CORS_ORIGIN, 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: false, 
//   optionsSuccessStatus: 204
// };

// Use CORS middleware
app.use(cors());

app.use('/api',bookRoute);
app.use('/api/transactions',transactionRoute);

app.get('/', (req: Request, res: Response) => {
    return res.send("Hey");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
