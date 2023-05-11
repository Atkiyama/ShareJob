import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import connectDB from './utils/database';
import routers from './routers'
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routers);
// Connecting to port
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})