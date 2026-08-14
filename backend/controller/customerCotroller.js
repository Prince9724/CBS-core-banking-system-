import Customer from "../model/customerModel.js";

// ================= ADD CUSTOMER =================
export const addCustomer = async (req, res) => {
  try {
    console.log("ADD CUSTOMER BODY:", req.body);
    console.log("LOGGED USER:", req.user);

    const result = await Customer.create({
      ...req.body,
      branchcode: req.user.branchcode,
      branchname: req.user.branchname,
    });

    return res.status(201).json({
      status: true,
      message: "Customer added successfully",
      data: result,
    });

  } catch (err) {
    console.error("ADD CUSTOMER ERROR:", err);

    return res.status(500).json({
      status: false,
      message: "Customer add failed",
      error: err.message,
    });
  }
};
// ================= GET CUSTOMERS =================
export const getCustomer = async (req, res) => {
  try {
    // sirf logged-in manager ki branch ke customers
    const result = await Customer.find({
      branchcode: req.user.branchcode,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: "Customers fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ================= UPDATE CUSTOMER =================
export const updateCustomer = async (req, res) => {
  try {
    const result = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        branchcode: req.user.branchcode,
      },
      req.body,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Customer updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ================= DELETE CUSTOMER =================
export const deleteCustomer = async (req, res) => {
  try {
    const result = await Customer.findOneAndDelete({
      _id: req.params.id,
      branchcode: req.user.branchcode,
    });

    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
export const searchCustomers = async (req, res) => {
  try {
    const search = req.query.search || "";

    const result = await Customer.find({
      branchcode: req.user.branchcode,
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { aadhar: { $regex: search, $options: "i" } },
      ],
    }).limit(20);

    res.json({
      status: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};