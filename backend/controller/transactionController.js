// import Account from "../model/accountModel.js";
// import Transaction from "../model/transactionModel.js"

// export const deposite = async (req, res) => {
//   try {
//     const { accountNumber, amount } = req.body;

//     const account = await Account.findOne({ accountNumber });

//     if (!account) {
//       return res.status(404).json({
//         status: false,
//         message: "Account not found",
//       });
//     }

//     account.balance += Number(amount);

//     await account.save();

//     // transaction save
//     await Transaction.create({
//       accountNumber: account.accountNumber,
//       customerName: account.customerName,
//       type: "Deposit",
//       amount,
//       balanceAfter: account.balance,
//       branchcode: account.branchcode,
//       branchname: account.branchname,

//       performedBy: req.user.userid,
//       performedByRole: req.user.role,
//     });

//     res.json({
//       status: true,
//       message: "Deposit successful",
//       data: account,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };
// export const withdraw = async (req, res) => {
//   try {
//     const { accountNumber, amount } = req.body;

//     const account = await Account.findOne({ accountNumber });

//     if (!account) {
//       return res.status(404).json({
//         status: false,
//         message: "Account not found",
//       });
//     }

//     if (account.balance < amount) {
//       return res.status(400).json({
//         status: false,
//         message: "Insufficient balance",
//       });
//     }

//     account.balance -= Number(amount);

//     await account.save();

//     await Transaction.create({
//       accountNumber: account.accountNumber,
//       customerName: account.customerName,
//       type: "Withdraw",
//       amount,
//       balanceAfter: account.balance,
//       branchcode: account.branchcode,
//       branchname: account.branchname,

//       performedBy: req.user.userid,
//       performedByRole: req.user.role,
//     });

//     res.json({
//       status: true,
//       message: "Withdraw successful",
//       data: account,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };
// export const getHistory = async (req , res)=>{
//     try{
//         const accountNumber =  req.params.accountNumber
//         const history = await Transaction
//             .find({accountNumber})
//             .sort({createdAt:-1});

//              res.json({
//             status:true,
//             count:history.length,
//             data:history
//         });
//     }
//     catch(err){
//         res.status(500).json({
//             status:false,
//             message:"history get failled !!",
//             err:err.message
//         })
//     }
// }


// export const getTodayTransactions = async (req, res) => {
//   try {
//     const { date, branchcode } = req.query;

//     // ✅ Agar date query mein hai toh wo date use karo, nahi toh today
//     let start, end;

//     if (date) {
//       // ✅ Specific date ka data
//       start = new Date(date);
//       start.setHours(0, 0, 0, 0);

//       end = new Date(date);
//       end.setHours(23, 59, 59, 999);
//     } else {
//       // ✅ Today ka data
//       start = new Date();
//       start.setHours(0, 0, 0, 0);

//       end = new Date();
//       end.setHours(23, 59, 59, 999);
//     }

//     console.log("📅 Date Range:", { start, end, branchcode });

//     let filter = {
//       createdAt: { $gte: start, $lte: end }
//     };

//     // ✅ Branch filter
//     if (branchcode) {
//       filter.branchcode = branchcode;
//     }

//     const data = await Transaction.find(filter)
//       .sort({ createdAt: -1 });

//     console.log("📝 Transactions Found:", data.length);

//     res.json({
//       status: true,
//       data,
//     });
//   } catch (err) {
//     console.error("❌ Transaction Error:", err);
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };
// // ✅ Get Single Transaction by ID
// export const getTransactionById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // ✅ Find transaction by ID
//     const transaction = await Transaction.findById(id);

//     if (!transaction) {
//       return res.status(404).json({
//         status: false,
//         message: "Transaction not found",
//       });
//     }

//     res.status(200).json({
//       status: true,
//       data: transaction,
//     });

//   } catch (err) {
//     console.error("❌ Error fetching transaction:", err);
//     res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };



import Account from "../model/accountModel.js";
import Transaction from "../model/transactionModel.js";
import bcrypt from "bcrypt";

// ===== DEPOSIT =====
export const deposit = async (req, res) => {
  try {
    const { accountNumber, amount, password } = req.body;

    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });
    }

    // ✅ Check if account has password
    if (account.accountPassword) {
      if (!password) {
        return res.status(401).json({
          status: false,
          message: "Account password required",
        });
      }
      const isMatch = await bcrypt.compare(password, account.accountPassword);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid account password",
        });
      }
    }

    account.balance += Number(amount);
    await account.save();

    await Transaction.create({
      accountNumber: account.accountNumber,
      customerName: account.customerName,
      type: "Deposit",
      amount,
      balanceAfter: account.balance,
      branchcode: account.branchcode,
      branchname: account.branchname,
      performedBy: req.user.userid,
      performedByRole: req.user.role,
      status: "success",
    });

    res.json({
      status: true,
      message: "Deposit successful",
      data: account,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ===== WITHDRAW =====
export const withdraw = async (req, res) => {
  try {
    const { accountNumber, amount, password } = req.body;

    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });
    }

    // ✅ Check if account has password
    if (account.accountPassword) {
      if (!password) {
        return res.status(401).json({
          status: false,
          message: "Account password required",
        });
      }
      const isMatch = await bcrypt.compare(password, account.accountPassword);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid account password",
        });
      }
    }

    if (account.balance < amount) {
      return res.status(400).json({
        status: false,
        message: "Insufficient balance",
      });
    }

    account.balance -= Number(amount);
    await account.save();

    await Transaction.create({
      accountNumber: account.accountNumber,
      customerName: account.customerName,
      type: "Withdraw",
      amount,
      balanceAfter: account.balance,
      branchcode: account.branchcode,
      branchname: account.branchname,
      performedBy: req.user.userid,
      performedByRole: req.user.role,
      status: "success",
    });

    res.json({
      status: true,
      message: "Withdrawal successful",
      data: account,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ===== GET HISTORY BY ACCOUNT =====
export const getHistory = async (req, res) => {
  try {
    const accountNumber = req.params.accountNumber;

    if (!accountNumber) {
      return res.status(400).json({
        status: false,
        message: "Account number is required",
      });
    }

    const history = await Transaction.find({ accountNumber })
      .sort({ createdAt: -1 });

    res.json({
      status: true,
      count: history.length,
      data: history,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "History fetch failed",
      error: err.message,
    });
  }
};

// ===== GET TODAY TRANSACTIONS =====
export const getTodayTransactions = async (req, res) => {
  try {
    const { date, branchcode } = req.query;

    let start, end;

    if (date) {
      start = new Date(date);
      start.setHours(0, 0, 0, 0);
      end = new Date(date);
      end.setHours(23, 59, 59, 999);
    } else {
      start = new Date();
      start.setHours(0, 0, 0, 0);
      end = new Date();
      end.setHours(23, 59, 59, 999);
    }

    console.log("📅 Date Range:", { start, end, branchcode });

    let filter = {
      createdAt: { $gte: start, $lte: end },
    };

    if (branchcode) {
      filter.branchcode = branchcode;
    }

    const data = await Transaction.find(filter).sort({ createdAt: -1 });

    res.json({
      status: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ===== GET SINGLE TRANSACTION BY ID =====
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        status: false,
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      status: true,
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

// ===== VERIFY ACCOUNT PASSWORD =====
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

    if (!account.accountPassword) {
      return res.json({
        status: true,
        message: "No password required for this account",
        verified: true,
      });
    }

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