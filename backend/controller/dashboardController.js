import Customer from "../model/customerModel.js";
import Account from "../model/accountModel.js";
import Transaction from "../model/transactionModel.js";
import Auth from "../model/authModel.js";

export const getManagerDashboard = async (req, res) => {
  try {
    const branchname = req.user.branchname;

    // Total customers
    const totalCustomers = await Customer.countDocuments({ branchname });

    // Accounts of this branch
    const accounts = await Account.find({ branchname });
    const totalAccounts = accounts.length;

    const accountNumbers = accounts.map((a) => a.accountNumber);

    // Today date range
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Today transactions
    const todayTransactions = await Transaction.find({
      accountNumber: { $in: accountNumbers },
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    // Deposit total
    const todayDeposit = todayTransactions
      .filter((t) => t.type === "Deposit")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Withdraw total
    const todayWithdraw = todayTransactions
      .filter((t) => t.type === "Withdraw")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Branch balance
    const branchBalance = accounts.reduce(
      (sum, a) => sum + Number(a.balance || 0),
      0
    );

    // Branch tellers
    const tellers = await Auth.countDocuments({
      role: "Teller",
      branchname,
    });

    // Recent 10 transactions
    const recentTransactions = await Transaction.find({
      accountNumber: { $in: accountNumbers },
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      status: true,
      data: {
        totalCustomers,
        totalAccounts,
        todayDeposit,
        todayWithdraw,
        todayTransactionsCount: todayTransactions.length,
        branchBalance,
        tellers,
        recentTransactions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};