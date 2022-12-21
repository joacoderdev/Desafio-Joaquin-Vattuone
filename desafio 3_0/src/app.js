import express from "express";
import path from "path";
import ProductManager from "./productManager.js";

const app = express();
const port = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const productManager = new ProductManager(
  path.resolve(process.cwd(), "public", "products.json")
);

app.get("/", (req, res) => {
  res.send("Hola mundo con expres!");
});

app.get("/productos", async (req, res) => {
  try {
    const products = await productManager.getproducts();
    const limit = req.query.limit;
    let limitedProducts;
    if (limit) {
      limitedProducts = products.slice(0, limit);
    }
    res.send(limitedProducts || products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* app.post("/productos", async (req, res) => {
  try {
    const products = await productManager.getproducts();
    const newProduct = req.body;
    await productManager.addProduct(products, newProduct);
    res.send(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
}); */

app.listen(port, () => {
  console.log(`Iniciado en http://localhost:${port}`);
});