import Customer from "../model/customerModel.js";
import Account from "../model/accountModel.js";
import Transaction from "../model/transactionModel.js";
import Auth from "../model/authModel.js";

export const getManagerDashboard = async (req, res) => {
  try {
    // params se lo
    const branchcode = req.params.branchcode;

    // manager ka data database se lo
    const manager = await Auth.findById(req.user.id);

    const branchname = manager?.branchname;

    console.log("REQ.USER =>", req.user);
    console.log("BRANCHCODE =>", branchcode);

    // Total customers
    const totalCustomers = await Customer.countDocuments({
      branchcode,
    });

    // Accounts
    const accounts = await Account.find({ branchcode });

    const totalAccounts = accounts.length;

    const accountNumbers = accounts.map((a) => a.accountNumber);

    // Today range
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Transactions
    const todayTransactions = await Transaction.find({
      accountNumber: { $in: accountNumbers },
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    // Deposit
    const todayDeposit = todayTransactions
      .filter((t) => t.type === "Deposit")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Withdraw
    const todayWithdraw = todayTransactions
      .filter((t) => t.type === "Withdraw")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Balance
    const branchBalance = accounts.reduce(
      (sum, a) => sum + Number(a.balance || 0),
      0
    );

    // ✅ Teller count
    const tellers = await Auth.countDocuments({
      role: "teller",
      branchcode,
    });

    // Recent transactions
    const recentTransactions = await Transaction.find({
      accountNumber: { $in: accountNumbers },
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      status: true,
      data: {
        branchname,
        branchcode,
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
    console.log("DASHBOARD ERROR =>", err);

    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};