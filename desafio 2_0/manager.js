const ProductManager = require("./productManager");

const idaut = (() => (id = 1, () => id++))();
const product = {
  id: idaut(),
  title: "Remera",
  description: "Remera manga corta de color roja",
  price: 4500,
  thumbnail: "imagenRemera",
  code: "ghmdik567",
  stock: 40,
};
const product2 = {
  id: idaut(),
  title: "Gorra",
  description: "Gorra piluso de color blanca",
  price: 1100,
  thumbnail: "imagenGorra",
  code: "rrtyklñv345",
  stock: 16,
};
const productManager = new ProductManager([], "users.json");

const runAwait = async () => {
  await productManager.addProduct(product);
  await productManager.addProduct(product2);

  console.log("===============================================");

  const products = await productManager.getproducts();
  console.log("getproducts", products);

  console.log("===============================================");

  const productFilter = await productManager.getProductById(1);
  console.log("filterProducts", productFilter);
  console.log("===============================================");
  await productManager.deleteProductById(1);
  await productManager.updateProduct(2);
  const products2 = await productManager.getproducts();
  console.log("getproducts2", products2);
};

runAwait();