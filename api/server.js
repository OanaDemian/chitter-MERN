
import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

dotenv.config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '' }` });
console.log(process.env);

const port = process.env.PORT;
const host = process.env.HOST;

const main = async () =>  {
    console.log(`Connecting to a database at ${process.env.DB_URI}`);
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`Connected to DB`);
    }
    catch (error) {
        console.log(error)
    }
}
main();

export const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is runnning on http://${SERVERHOST}:${SERVERPORT}`);
});





