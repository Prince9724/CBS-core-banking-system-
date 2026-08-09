import Account from "../model/accountModel.js";
import Transaction from "../model/transactionModel.js"

export const deposite = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body
        const account = await Account.findOne({ accountNumber });
        if (!account) {
            return res.status(404).json({
                status: false,
                message: "Account is not found"
            });
        }
        account.balance += Number(amount);
        await account.save();

        await Transaction.create({
            accountNumber,
            type: "deposit",
            amount: Number(amount),

            balanceAfter: account.balance,
            description: "cash deposite",
            branchcode: account.branchcode,
            branchname: account.branchname,

            perfomerdBy: req.user.userid
        });
        res.json({
            status: true,
            message: "Deposit successful",
            balance: account.balance
        });


    }
    catch (err) {
        res.json({
            status: false,
            message: "transiction failled !! ",
            err: err.message
        })
    }
}

export const withdraw = async (req , res)=>{
try{
    const {accountNumber,amount} = req.body;

const account = await Account.findOne({accountNumber});

if (!account) {
        return res.status(404).json({
            status: false,
            message: "Account is not found"
        });
    }
    if(account.balance <amount){
        return res.status(400).json({
            status: false,
            message: "The amount is more than the account balance",

        });

    }   
    account.balance -= Number(amount);

    await account.save();
    await Transaction.create({
        accountNumber,
        type: "withdraw",
        amount: Number(amount),

        balanceAfter: account.balance,
        description: "cash withdraw",
        branchcode: account.branchcode,
        branchname: account.branchname,

        perfomerdBy: req.user.userid
    });
    res.json({
        status: true,
        message: "withdraw successful",
        balance: account.balance
    });

}
catch(err){

}

}

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