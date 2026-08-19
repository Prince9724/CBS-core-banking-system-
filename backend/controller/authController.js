import Auth from "../model/authModel.js";
import Branch from "../model/branchModel.js";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SIGN UP
export const signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      password,
      role,
      userid,
      branchname,
      branchcode,
    } = req.body;

    const hash = await bcrypt.hash(password, 12);

    const result = await Auth.create({
      name,
      userid,
      email,
      contact,
      role,
      password: hash,
      branchname,
      branchcode,
    });

    return res.status(200).json({
      status: true,
      message: "user post successfully !!",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "user post failed !!",
      err: err.message,
    });
  }
};

// SIGN IN
export const signIn = async (req, res) => {
    try {
        const { userid, password, branchcode } = req.body;

        // ✅ Check if user exists
        const auth = await Auth.findOne({ userid });
        if (!auth) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        // ✅ Check password
        const isMatch = await bcrypt.compare(password, auth.password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: "Wrong password",
            });
        }

        // ✅ NEW: Branch status check for Manager/Teller
        if (auth.role === "manager" || auth.role === "Manager" || 
            auth.role === "teller" || auth.role === "Teller") {
            
            // ✅ Find branch
            const branch = await Branch.findOne({ branchcode });  // ✅ Now works
            
            // ✅ Check if branch exists
            if (!branch) {
                return res.status(404).json({
                    status: false,
                    message: "Branch not found",
                });
            }
            
            // ✅ Check if branch is active
            if (branch.status !== "Active") {
                return res.status(403).json({
                    status: false,
                    message: `Your branch "${branch.branchname}" is currently Inactive. Please contact admin.`,
                });
            }
        }

        // ✅ Branch code check for manager/teller
        if (
            (auth.role === "Manager" || auth.role === "manager" || 
             auth.role === "Teller" || auth.role === "teller") &&
            auth.branchcode !== branchcode
        ) {
            return res.status(400).json({
                status: false,
                message: "Branch code mismatch",
            });
        }

        // ✅ Generate token
        const token = jwt.sign(
            {
                id: auth._id,
                role: auth.role.toLowerCase(),
                branchcode: auth.branchcode,
                branchname: auth.branchname,
                userid: auth.userid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
            maxAge: 12 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            status: true,
            message: "Login successful",
            user: {
                name: auth.name,
                role: auth.role.toLowerCase(),
                branchcode: auth.branchcode || "",
                branchname: auth.branchname || "",
            },
            token: token,
        });

    } catch (err) {
        console.error("❌ SignIn Error:", err);  // ✅ Debug log
        return res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return res.status(200).json({
    status: true,
    message: "Logged out successfully",
  });
};

// UPDATE AUTH
export const updateAuth = async (req, res) => {
  try {
    const result = await Auth.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true }
    );

    if (!result) {
      return res.json({
        status: false,
        message: "Id nahi mila",
        data: null,
      });
    }

    return res.json({
      status: true,
      message: "manager updation successfully !!",
      data: result,
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "user updation failed !!",
      err: err.message,
    });
  }
};

// DELETE AUTH
export const deleteAuth = async (req, res) => {
  try {
    const result = await Auth.findByIdAndDelete(req.query.id);

    return res.json({
      status: true,
      message: "manager deleted successfully !!",
      data: result,
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "user delete failed !!",
      err: err.message,
    });
  }
};

export const forgetPassword = async (req, res) => {};