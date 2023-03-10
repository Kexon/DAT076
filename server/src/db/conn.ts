import 'dotenv/config';
import { createConnection } from 'mongoose';

let uri: string;

if (!process.env.DB_URI) {
  throw new Error('DB_URI not found');
}
if (!process.env.DB_URI_TEST) {
  throw new Error('DB_URI_TEST not found');
}

if (process.env.NODE_ENV === 'test') {
  uri = process.env.DB_URI_TEST;
} else {
  uri = process.env.DB_URI;
}

export const conn = createConnection(uri);
