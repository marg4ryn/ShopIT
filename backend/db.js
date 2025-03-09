import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopit", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Połączono z MongoDB!");
  } catch (error) {
    console.error("Błąd połączenia z MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
