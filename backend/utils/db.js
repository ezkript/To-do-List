import mongoose from "mongoose";

export const db = () => {
    try {
        mongoose.connect(process.env.DB_URI);
        console.log('DB Connection successful');
    } catch (e) {
        console.error(e);
      }
}