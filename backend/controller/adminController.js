import branch from "../model/branchModel.js"
import Auth from "../model/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generatorOtp, transpoter } from "./otpController.js"
import OTP from "../model/otpModel.js"
export const addBranch = async (req, res) => {

    try {
        const result = await branch.create(req.body);
        res.status(200).json({
            status: true,
            message: "branch added succesfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "branch Added failled !! ",
            err: err.message
        })
    }
}
export const deleteBranch = async (req, res) => {

    try {
        const result = await branch.findByIdAndDelete(req.query.id);
        res.status(200).json({
            status: true,
            message: "branch delete succesfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "branch delete failled !! ",
            err: err.message
        })
    }
}
export const getBranch = async (req, res) => {
    try {
        const result = await branch.find(req.body);
        res.status(200).json({
            status: true,
            message: "branches fetching succesfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "branches fetching failled !! ",
            err: err.message
        })
    }
}

export const updateBranch = async (req, res) => {
    try {
        const result = await branch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            status: true,
            message: "Branch updated successfully",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};
//sign branc get krne ke liye 
export const getSingleBranch = async (req, res) => {
    try {
        console.log("Branch ID:", req.params.id);

        // branch find
        const result = await branch.findById(req.params.id);

        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Branch not found",
            });
        }

        // manager find by branchcode
        const manager = await Auth.findOne({
            branchcode: result.branchcode,
            role: "Manager",
        }).select("name email contact userid role branchcode");

        res.status(200).json({
            status: true,
            data: {
                ...result.toObject(),
                manager: manager || null,
            },
        });
    } catch (err) {
        console.log("GET SINGLE BRANCH ERROR:", err);

        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};

// manager dashboard ke liye
export const getBranchByCode = async (req, res) => {
  try {
    const result = await branch.findOne({
      branchcode: req.params.branchcode,
    });

    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Branch not found",
      });
    }

    // manager ko bhi bheja yaha se 
    const manager = await Auth.findOne({
      branchcode: result.branchcode,
      role: "Manager",
    }).select("name email contact userid");

    res.status(200).json({
      status: true,
      data: {
        ...result.toObject(),
        manager: manager || null,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
//add user for admin 
export const addManager = async (req, res) => {
    try {
        const { name, email, contact, role, branchcode, branchname, password, userid } = req.body
        const hash = await bcrypt.hash(password, 12);
        const result = await Auth.create({ name, userid, email, contact, role, branchcode, branchname, password: hash });
        res.status(200).json({
            status: true,
            message: "user post succesfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "manager added failed !!",
            err: err.message
        })
    }
}
export const otpSend = async (req, res) => {
    try {
        const otp = generatorOtp();
        const expiry = new Date(Date.now() + 1000 * 60 * 20);//20 minute ka expiry hai otp ka 
        await OTP.create({ email: req.body.email, otp, expiry })
        await transpoter.sendMail({
            from: `"cbs"<${process.env.USEREMAIL}>`,
            to: req.body.email,
            subject: "forget your password do not share Otp",
            text: `your otp is ${otp} it is expire in 2 minute !`
        })
        res.json({
            status: true,
            message: "otp send succesfully !!",
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "can't otp send",
            err: err.message
        })
    }
}
export const otpVerify = async (req, res) => {
    const { email, otp } = req.body
    const result = await OTP.findOne({ email, otp });
    if (!result) {//agar otp find nhi hua to 
        res.json({
            status: false,
            message: "Otp Invalid !!",
            err: err.message
        })
    }
    if (result.expiry > new Date(Date.now())) {//agar otp expire hone se pahle enter hai to 
        res.status(200).json({
            status: true,
            message: "Otp verification successfully !! ",

        })
    }

    else {
        res.json({
            status: false,
            message: "otp Expire !! ",

        })
    }
}
export const getUsers = async (req, res) => {
  try {
    const users = await Auth.find(
      { role: { $in: ["Manager", "Teller"] } },
      "name userid email contact role branchname branchcode"
    );

    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};