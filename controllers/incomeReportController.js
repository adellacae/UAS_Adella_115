import IncomeReport from "../models/incomeReport.js";

// Get all income reports
export const getIncomeReports = async (req, res) => {
  try {
    const reports = await IncomeReport.findAll({
      attributes: { exclude: ["id_manager"] },
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get income report by ID
export const getIncomeReportById = async (req, res) => {
  try {
    const report = await IncomeReport.findByPk(req.params.id, {
      attributes: { exclude: ["id_manager"] },
    });
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new income report
export const createIncomeReport = async (req, res) => {
  try {
    const { report_date, total_income } = req.body;
    const newReport = await IncomeReport.create({
      report_date,
      total_income,
      id_manager: req.user.id_manager, // Assuming the manager ID is available in req.user
    });
    const report = await IncomeReport.findByPk(newReport.id_report, {
      attributes: { exclude: ["id_manager"] },
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update income report by ID
export const updateIncomeReport = async (req, res) => {
  try {
    const { report_date, total_income } = req.body;
    const [updated] = await IncomeReport.update(
      { report_date, total_income },
      { where: { id_report: req.params.id } }
    );
    if (updated) {
      const updatedReport = await IncomeReport.findByPk(req.params.id, {
        attributes: { exclude: ["id_manager"] },
      });
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: "Report not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete income report by ID
export const deleteIncomeReport = async (req, res) => {
  try {
    const deleted = await IncomeReport.destroy({
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
