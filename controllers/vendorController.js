import Vendor from "../models/vendor.js";

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new vendor
export const createVendor = async (req, res) => {
  try {
    const { name, address, contact_info } = req.body;
    const newVendor = await Vendor.create({
      name,
      address,
      contact_info,
      id_manager: req.user.id_manager, // Assuming the manager ID is available in req.user
    });
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update vendor by ID
export const updateVendor = async (req, res) => {
  try {
    const { name, address, contact_info } = req.body;
    const [updated] = await Vendor.update(
      { name, address, contact_info },
      { where: { id_vendor: req.params.id } }
    );
    if (updated) {
      const updatedVendor = await Vendor.findByPk(req.params.id);
      res.json(updatedVendor);
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete vendor by ID
export const deleteVendor = async (req, res) => {
  try {
    const deleted = await Vendor.destroy({
      where: { id_vendor: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Vendor deleted" });
    } else {
      res.status(404).json({ message: "Vendor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
