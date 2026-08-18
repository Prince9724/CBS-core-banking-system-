import Customer from "../model/customerModel.js";
import Account from "../model/accountModel.js";
import Transaction from "../model/transactionModel.js";
import Auth from "../model/authModel.js";

export const getManagerDashboard = async (req, res) => {
  try {
    const branchcode = req.params.branchcode;

    console.log("📊 Dashboard Request for branch:", branchcode);

    // ===== TOTAL CUSTOMERS =====
    const totalCustomers = await Customer.countDocuments({ branchcode });
    console.log("👥 Total Customers:", totalCustomers);

    // ===== TOTAL ACCOUNTS =====
    const totalAccounts = await Account.countDocuments({ branchcode });
    console.log("🏦 Total Accounts:", totalAccounts);

    // ===== BRANCH BALANCE =====
    const balanceData = await Account.aggregate([
      { $match: { branchcode } },
      { $group: { _id: null, totalBalance: { $sum: "$balance" } } }
    ]);
    const totalBranchBalance = balanceData[0]?.totalBalance || 0;
    console.log("💰 Total Balance:", totalBranchBalance);

    // ===== TODAY TRANSACTIONS =====
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // ✅ Get all account numbers for this branch
    const accounts = await Account.find({ branchcode });
    const accountNumbers = accounts.map(acc => acc.accountNumber);

    // ✅ Today transactions
    const todayTransactions = await Transaction.find({
      accountNumber: { $in: accountNumbers },
      createdAt: { $gte: start, $lte: end }
    }).sort({ createdAt: -1 });

    console.log("📝 Today Transactions Count:", todayTransactions.length);

    // ✅ Calculate Deposit and Withdraw
    const todayDeposit = todayTransactions
      .filter(t => t.type === "Deposit")
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const todayWithdraw = todayTransactions
      .filter(t => t.type === "Withdraw")
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    console.log("💰 Today Deposit:", todayDeposit);
    console.log("💰 Today Withdraw:", todayWithdraw);

    // ===== TELLERS =====
    const tellers = await Auth.countDocuments({
      branchcode,
      role: { $in: ["Teller", "teller"] }
    });
    console.log("👤 Tellers:", tellers);

    // ===== RECENT TRANSACTIONS (Last 10) =====
    const recentTransactions = await Transaction.find({
      accountNumber: { $in: accountNumbers }
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("accountNumber customerName type amount balanceAfter createdAt performedBy performedByRole");

    console.log("📋 Recent Transactions:", recentTransactions.length);

    res.json({
      status: true,
      data: {
        totalCustomers,
        totalAccounts,
        totalBranchBalance,
        todayDeposit,
        todayWithdraw,
        todayTransactionsCount: todayTransactions.length,
        tellers,
        recentTransactions
      }
    });

  } catch (err) {
    console.error("❌ Dashboard Error:", err);
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};