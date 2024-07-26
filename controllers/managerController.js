import Manager from "../models/manager.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

// Mendapatkan semua manajer
export const getManagers = async (req, res) => {
  try {
    const managers = await Manager.findAll({ include: User });
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan manajer berdasarkan ID
export const getManagerById = async (req, res) => {
  try {
    const manager = await Manager.findOne({
      where: { id_manager: req.params.id },
      include: User,
    });
    if (!manager) return res.status(404).json({ message: "Manager not found" });
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Membuat manajer baru
export const createManager = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru terlebih dahulu
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "manager", // Pastikan role adalah manager
    });

    // Buat entri manajer yang terhubung dengan pengguna baru
    const newManager = await Manager.create({ id_user: newUser.id_user });

    res
      .status(201)
      .json({ message: "Manager created successfully", newManager });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate manajer
export const updateManager = async (req, res) => {
  const { username, email, role } = req.body;

  try {
    const manager = await Manager.findOne({
      where: { id_manager: req.params.id },
    });
    if (!manager) return res.status(404).json({ message: "Manager not found" });

    // Update data pengguna
    await User.update(
      { username, email, role },
      { where: { id_user: manager.id_user } }
    );

    res.json({ message: "Manager updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus manajer
export const deleteManager = async (req, res) => {
  try {
    const manager = await Manager.findOne({
      where: { id_manager: req.params.id },
    });
    if (!manager) return res.status(404).json({ message: "Manager not found" });

    // Hapus pengguna terkait
    await User.destroy({ where: { id_user: manager.id_user } });

    // Hapus manajer
    await Manager.destroy({ where: { id_manager: req.params.id } });

    res.json({ message: "Manager deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
