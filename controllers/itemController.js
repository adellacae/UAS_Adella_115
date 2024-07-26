import Item from "../models/item.js";

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new item
export const createItem = async (req, res) => {
  try {
    const { name, description, price, stock, id_vendor } = req.body;
    const newItem = await Item.create({
      name,
      description,
      price,
      stock,
      id_vendor,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update item by ID
export const updateItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const [updated] = await Item.update(
      { name, description, price },
      { where: { id_item: req.params.id } }
    );
    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete item by ID
export const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.destroy({ where: { id_item: req.params.id } });
    if (deleted) {
      res.json({ message: "Item deleted" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
