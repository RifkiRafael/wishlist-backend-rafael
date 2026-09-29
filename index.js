import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import addWishlist from './api/add-to-wishlist.js';
import getWishlist from './api/get-wishlist.js';
import getAllWishlist from './api/get-all-wishlist.js';
import removeWishlist from './api/remove-from-wishlist.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/add-to-wishlist', addWishlist);

app.get('/api/get-wishlist', getWishlist);

app.get('/api/get-all-wishlist', getAllWishlist);


app.delete('/api/remove-from-wishlist', removeWishlist);

app.get('/', (req, res) => {
    res.json({
        message: 'Wishlist API is running'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});