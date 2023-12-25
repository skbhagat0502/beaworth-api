import mongoose from "mongoose";
import { DB_URI } from "../constants.js";
const connectDatabase = () => {
  mongoose.connect(DB_URI).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  });
};

export default connectDatabase;
