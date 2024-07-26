import Transaction from "../models/transaction.js";

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new transaction
export const createTransaction = async (req, res) => {
  try {
    const { amount, date, type, id_vendor, id_manager } = req.body;
    const newTransaction = await Transaction.create({
      amount,
      date,
      type,
      id_vendor,
      id_manager,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update transaction by ID
export const updateTransaction = async (req, res) => {
  try {
    const { amount, date, type } = req.body;
    const [updated] = await Transaction.update(
      { amount, date, type },
      { where: { id_transaction: req.params.id } }
    );
    if (updated) {
      const updatedTransaction = await Transaction.findByPk(req.params.id);
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete transaction by ID
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.destroy({
      where: { id_transaction: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Transaction deleted" });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
