import express from "express";
import connectDB from "./db.js";
import Product from "./models/Product.js";

const app = express();
app.use(express.json());

// Połączenie z bazą
connectDB();

// Endpoint do pobierania produktów
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Endpoint do dodawania produktu
app.post("/api/products", async (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = new Product({ name, price, category });
  await newProduct.save();
  res.status(201).json(newProduct);
});

app.listen(5000, () => console.log("Serwer działa na porcie 5000"));
