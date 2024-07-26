import SalesReport from "../models/salesReport.js";

// Get all sales reports
export const getSalesReports = async (req, res) => {
  try {
    const reports = await SalesReport.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get sales report by ID
export const getSalesReportById = async (req, res) => {
  try {
    const report = await SalesReport.findByPk(req.params.id);
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new sales report
export const createSalesReport = async (req, res) => {
  try {
    const { report_date, total_items_sold, total_revenue, id_item } = req.body;
    const newReport = await SalesReport.create({
      report_date,
      total_items_sold,
      total_revenue,
      id_manager: req.user.id_manager, // Assuming the manager ID is available in req.user
      id_item,
    });
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update sales report by ID
export const updateSalesReport = async (req, res) => {
  try {
    const { report_date, total_items_sold, total_revenue } = req.body;
    const [updated] = await SalesReport.update(
      { report_date, total_items_sold, total_revenue },
      { where: { id_report: req.params.id } }
    );
    if (updated) {
      const updatedReport = await SalesReport.findByPk(req.params.id);
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete sales report by ID
export const deleteSalesReport = async (req, res) => {
  try {
    const deleted = await SalesReport.destroy({
      where: { id_report: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Report deleted" });
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
