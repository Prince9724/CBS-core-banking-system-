import Customer from "../model/customerModel.js";
import Account from "../model/accountModel.js";
import Transaction from "../model/transactionModel.js";
import Auth from "../model/authModel.js";

export const getManagerDashboard = async (req, res) => {
  try {
    const branchcode = req.params.branchcode;

    // Total customers
    const totalCustomers = await Customer.countDocuments({ branchcode });

    // Total accounts
    const totalAccounts = await Account.countDocuments({ branchcode });

    // Branch total balance
    const balanceData = await Account.aggregate([
      { $match: { branchcode } },
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$balance" },
        },
      },
    ]);

    const totalBranchBalance = balanceData[0]?.totalBalance || 0;

    // Today range
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Today deposit
    const depositData = await Transaction.aggregate([
      {
        $match: {
          branchcode,
          type: "Deposit",
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Today withdraw
    const withdrawData = await Transaction.aggregate([
      {
        $match: {
          branchcode,
          type: "Withdraw",
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Today transaction count
    const todayTransactions = await Transaction.countDocuments({
      branchcode,
      createdAt: { $gte: start, $lte: end },
    });

    // Branch tellers
    const tellers = await Auth.find({
      branchcode,
      role: "Teller",
    }).select("name userid contact");

    // Recent transactions
    const recentTransactions = await Transaction.find({ branchcode })
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "accountNumber customerName amount type createdAt performedBy balanceAfter"
      );

    res.status(200).json({
      status: true,
      data: {
        totalCustomers,
        totalAccounts,
        totalBranchBalance,
        todayDeposit: depositData[0]?.total || 0,
        todayWithdraw: withdrawData[0]?.total || 0,
        todayTransactions,
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