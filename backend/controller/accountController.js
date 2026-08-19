// import Account from "../model/accountModel.js";
// import Customer from "../model/customerModel.js";

// // ================= OPEN ACCOUNT =================
// export const openAccount = async (req, res) => {
//   try {
//     const {
//       customerId,
//       accountType,
//       openingBalance,
//     } = req.body;

//     // Customer ID check
//     if (!customerId) {
//       return res.status(400).json({
//         status: false,
//         message: "Customer ID is required",
//       });
//     }

//     // Customer check
//     const customer = await Customer.findById(customerId);

//     if (!customer) {
//       return res.status(404).json({
//         status: false,
//         message: "Customer not found",
//       });
//     }

//     // Unique account number
//     const accountNumber = `${customer.branchcode}-${Date.now()}`;

//     // Create account
//     const account = await Account.create({
//       customerId: customer._id,
//       customerName: customer.name,
//       accountNumber,
//       accountType,
//       balance: Number(openingBalance) || 0,
//       branchcode: customer.branchcode,
//       branchname: customer.branchname,
//       status: "Active",
//     });

//     return res.status(201).json({
//       status: true,
//       message: "Account opened successfully",
//       data: account,
//     });

//   } catch (err) {
//     console.error("Open Account Error:", err);

//     return res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };
// export const getAccounts = async (req, res) => {
//   try {
//     let query = {};

//     // Manager/Teller ko sirf apni branch ke accounts
//     if (req.user.role === "Manager" || req.user.role === "Teller") {
//       query.branchcode = req.user.branchcode;
//     }

//     const result = await Account.find(query)
//       .populate("customerId", "name phone email")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       status: true,
//       count: result.length,
//       data: result,
//     });
//   } catch (err) {
//     console.error("Get Accounts Error:", err);

//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };

// export const searchCustomers = async (req, res) => {
//   try {
//     const { search } = req.query;

//     if (!search) {
//       return res.status(400).json({
//         status: false,
//         message: "Search value required",
//       });
//     }

//     // Aadhar ya Name se search
//     const customers = await Customer.find({
//       $or: [
//         { aadhar: { $regex: search, $options: "i" } },
//         { name: { $regex: search, $options: "i" } },
//       ],
//     });

//     // Account number se search
//     const accounts = await Account.find({
//       accountNumber: { $regex: search, $options: "i" },
//     }).populate("customerId");

//     const accountCustomers = accounts.map((a) => a.customerId);

//     const result = [...customers, ...accountCustomers];

//     res.json({
//       status: true,
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };
// export const searchAccount = async (req, res) => {
//   try {
//     const { search } = req.query;

//     // Aadhar se customer find
//     const customer = await Customer.findOne({
//       aadhar: search,
//     });

//     let account;

//     if (customer) {
//       account = await Account.findOne({
//         customerId: customer._id,
//       }).populate("customerId");
//     } else {
//       // direct account number se find
//       account = await Account.findOne({
//         accountNumber: search,
//       }).populate("customerId");
//     }

//     if (!account) {
//       return res.status(404).json({
//         status: false,
//         message: "Account not found",
//       });
//     }

//     res.json({
//       status: true,
//       data: {
//         accountNumber: account.accountNumber,
//         balance: account.balance,
//         branchcode: account.branchcode,
//         customer: {
//           name: account.customerId.name,
//           aadhar: account.customerId.aadhar,
//           mobile: account.customerId.mobile,
//         },
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };

import Account from "../model/accountModel.js";
import Customer from "../model/customerModel.js";
import bcrypt from "bcrypt";

// ================= OPEN ACCOUNT =================
export const openAccount = async (req, res) => {
  try {
    const {
      customerId,
      accountType,
      openingBalance,
      accountPassword  // ✅ NEW - Optional password
    } = req.body;

    // Customer ID check
    if (!customerId) {
      return res.status(400).json({
        status: false,
        message: "Customer ID is required",
      });
    }

    // Customer check
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        status: false,
        message: "Customer not found",
      });
    }

    // ✅ Hash password if provided
    let hashedPassword = null;
    if (accountPassword && accountPassword.trim() !== "") {
      hashedPassword = await bcrypt.hash(accountPassword, 10);
    }

    // Unique account number
    const accountNumber = `${customer.branchcode}-${Date.now()}`;

    // Create account
    const account = await Account.create({
      customerId: customer._id,
      customerName: customer.name,
      accountNumber,
      accountType,
      balance: Number(openingBalance) || 0,
      branchcode: customer.branchcode,
      branchname: customer.branchname,
      accountPassword: hashedPassword,  // ✅ Store hashed password or null
      status: "Active",
    });

    return res.status(201).json({
      status: true,
      message: "Account opened successfully",
      data: account,
    });

  } catch (err) {
    console.error("Open Account Error:", err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ================= GET ACCOUNTS =================
export const getAccounts = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role !== "admin") {
      filter.branchcode = req.user.branchcode;
    }

    const result = await Account.find(filter)
      .populate("customerId", "name phone email");

    res.status(200).json({
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

// ================= SEARCH ACCOUNT =================
export const searchAccount = async (req, res) => {
  try {
    const { search } = req.query;

    const customer = await Customer.findOne({
      aadhar: search,
    });

    let account;
    if (customer) {
      account = await Account.findOne({
        customerId: customer._id,
      }).populate("customerId");
    } else {
      account = await Account.findOne({
        accountNumber: search,
      }).populate("customerId");
    }

    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });
    }

    res.json({
      status: true,
      data: {
        accountNumber: account.accountNumber,
        balance: account.balance,
        branchcode: account.branchcode,
        hasPassword: !!account.accountPassword,  // ✅ Tell frontend if password exists
        customer: {
          name: account.customerId.name,
          aadhar: account.customerId.aadhar,
          mobile: account.customerId.mobile,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ================= VERIFY ACCOUNT PASSWORD =================
export const verifyAccountPassword = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });
    }

    // ✅ If no password set, always return success
    if (!account.accountPassword) {
      return res.json({
        status: true,
        message: "No password required for this account",
        verified: true,
      });
    }

    // ✅ Verify password
    const isMatch = await bcrypt.compare(password, account.accountPassword);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid account password",
        verified: false,
      });
    }

    res.json({
      status: true,
      message: "Password verified successfully",
      verified: true,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};