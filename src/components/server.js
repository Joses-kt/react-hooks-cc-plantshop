// server.js
const express = require("express");
const app = express();
const port = 6001;

// Dummy data (in a real app, this might come from a database)
let plants = [
  { id: 1, name: "Aloe", image: "./images/aloe.jpg", price: 15.99, inStock: true },
  { id: 2, name: "ZZ Plant", image: "./images/zz-plant.jpg", price: 25.98, inStock: false },
  { id: 3, name: "Pilea peperomioides", image: "./images/pilea.jpg", price: 5.99, inStock: true },
  { id: 4, name: "Jade", image: "./images/jade.jpg", price: 10.37, inStock: true },
  { id: 5, name: "Monstera Deliciosa", image: "./images/monstera.jpg", price: 25.99, inStock: true },
  { id: 6, name: "Fiddle Leaf Fig", image: "./images/fiddle-leaf-fig.jpg", price: 55.00, inStock: false },
];

// Middleware to parse JSON
app.use(express.json());

// Endpoint to fetch all plants
app.get("/plants", (req, res) => {
  res.json(plants);
});

// Endpoint to update plant price
app.patch("/plants/:id", (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  const plant = plants.find((p) => p.id === parseInt(id));

  if (!plant) {
    return res.status(404).json({ message: "Plant not found" });
  }

  plant.price = price;
  res.json(plant);
});

// Endpoint to delete a plant
app.delete("/plants/:id", (req, res) => {
  const { id } = req.params;
  plants = plants.filter((plant) => plant.id !== parseInt(id));

  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});