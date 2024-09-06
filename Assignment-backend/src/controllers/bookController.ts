import { Request, Response } from 'express';
import Book from '../models/Book.model.js';

import Transaction from '../models/Transaction.model.js';



// Helper function to determine book status
const getBookStatus = async (bookName: string) => {
    const transaction = await Transaction.findOne({ bookName, returnDate: { $exists: false } });
    return transaction ? 'Issued' : 'Available';
};





// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        
        // Map through books and attach status to each
        const booksWithStatus = await Promise.all(
            books.map(async (book) => {
                const status = await getBookStatus(book.bookName);
                return { ...book.toObject(), status }; // Attach the status to the book object
            })
        );

        res.json(booksWithStatus);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
};

// Get book by ID
export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Failed to create book' });
    }


    

};


export const searchBooks = async (req: Request, res: Response) => {
    const { term, category, rentRange } = req.query;

    
    const query: any = {};

    
    if (term && typeof term === 'string') {
        query.bookName = { $regex: term, $options: 'i' }; 
    }

    
    if (category && typeof category === 'string') {
        query.category = category;
    }

    
    if (rentRange && typeof rentRange === 'string') {
        const [minRent, maxRent] = rentRange.split(',').map(Number);
        
        if (!isNaN(minRent) && !isNaN(maxRent) && minRent >= 0 && maxRent >= 0 && minRent <= maxRent) {
            query.rentPerDay = { $gte: minRent, $lte: maxRent };
        } else {
            return res.status(400).json({ error: 'Invalid rent range' });
        }
    }

    try {
        const books = await Book.find(query);

        
        const booksWithStatus = await Promise.all(
            books.map(async (book) => {
                const status = await getBookStatus(book.bookName);
                return { ...book.toObject(), status }; 
            })
        );

        res.json(booksWithStatus);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ error: 'Failed to search books' });
    }
};

