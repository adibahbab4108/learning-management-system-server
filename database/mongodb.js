import mongoose from "mongoose";

const URI =process.env.MONGODB_URI
const environment =process.env.NODE_ENV
if (!URI) {
  throw new Error(
    "Please Define the MONGODB_URI environment variable inside .env.<development/production>.local"
  );
}
const connectToDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log(`Connected to database in ${environment}`)
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
export default connectToDatabase