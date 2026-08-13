import Account from "../model/accountModel.js";
import Transaction from "../model/transactionModel.js"

export const deposite = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });
    }

    account.balance += Number(amount);

    await account.save();

    // transaction save
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
export const withdraw = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });
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
    });

    res.json({
      status: true,
      message: "Withdraw successful",
      data: account,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
export const getHistory = async (req , res)=>{
    try{
        const accountNumber =  req.params.accountNumber
        const history = await Transaction
            .find({accountNumber})
            .sort({createdAt:-1});

             res.json({
            status:true,
            count:history.length,
            data:history
        });
    }
    catch(err){
        res.status(500).json({
            status:false,
            message:"history get failled !!",
            err:err.message
        })
    }
}


export const getTodayTransactions = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const data = await Transaction.find({
      branchcode: req.user.branchcode,
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

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