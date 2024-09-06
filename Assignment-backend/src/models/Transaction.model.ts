import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  bookName: string;
  userId: string;
  issueDate: Date;
  returnDate?: Date;
  rentCost?: number;
}

const TransactionSchema: Schema = new Schema({
  bookName: { type: String, required:true, ref: 'Book' },
  userId: { type: String,  required :true,ref: 'User' },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date },
  rentCost: { type: Number }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
