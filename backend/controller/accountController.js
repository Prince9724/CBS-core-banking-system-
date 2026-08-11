import Account from "../model/accountModel.js";
import Customer from "../model/customerModel.js";

// ================= OPEN ACCOUNT =================
export const openAccount = async (req, res) => {
    try {
        console.log("REQ.USER =", req.user);

        const { customerId, accountType, openingBalance } = req.body;

        const customer = await Customer.findById(customerId);

        console.log("CUSTOMER =", customer);

        if (!customer) {
            return res.status(404).json({
                status: false,
                message: "Customer not found",
            });
        }

        const count = await Account.countDocuments();

        const accountNumber =
            customer.branchcode +
            "-2026-" +
            String(count + 1).padStart(6, "0");

        const account = await Account.create({
            customerId,
            accountNumber,
            accountType,
            balance: openingBalance || 0,
            branchname: customer.branchname,
            branchcode: customer.branchcode,
        });

        res.status(201).json({
            status: true,
            message: "Account opened successfully",
            data: account,
        });
    } catch (err) {
        console.log("OPEN ACCOUNT ERROR =", err);

        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};
export const getAccounts = async (req, res) => {
  try {
    const result = await Account.find({
      branchcode: req.user.branchcode,
    }).populate("customerId", "name phone email");

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

export const searchCustomers = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        status: false,
        message: "Search value required",
      });
    }

    // Aadhar ya Name se search
    const customers = await Customer.find({
      $or: [
        { aadhar: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ],
    });

    // Account number se search
    const accounts = await Account.find({
      accountNumber: { $regex: search, $options: "i" },
    }).populate("customerId");

    const accountCustomers = accounts.map((a) => a.customerId);

    const result = [...customers, ...accountCustomers];

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
export const searchAccount = async (req, res) => {
  try {
    const { search } = req.query;

    // Aadhar se customer find
    const customer = await Customer.findOne({
      aadhar: search,
    });

    let account;

    if (customer) {
      account = await Account.findOne({
        customerId: customer._id,
      }).populate("customerId");
    } else {
      // direct account number se find
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