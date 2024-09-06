import express from 'express';
import {getAllBooks,getBookById,createBook,searchBooks}  from '../controllers/bookController.js'
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();



router.get('/search', searchBooks);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);
router.get('/users', getAllUsers);


export default router;
