import Auth from "../model/authModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import cookieparser from "cookie"
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
            branchcode
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
            branchcode
        });
        
        res.status(200).json({
            status: true,
            message: "user post succesfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user post failed !!",
            err: err.message
        })
    }
}
//signIn for admin
export const signIn = async (req, res) => {

    try {

        const {
            userid,
            password,
            branchcode
        } = req.body;

        // user find
        const auth = await Auth.findOne({ userid });

        if (!auth) {

            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        // password check
        const isMatch = await bcrypt.compare(
            password,
            auth.password
        );

        if (!isMatch) {

            return res.status(400).json({
                status: false,
                message: "Wrong password"
            });
        }

        // 🔥 Manager ke liye branchcode check
        if (auth.role === "Manager") {

            if (auth.branchcode !== branchcode) {

                return res.status(400).json({
                    status: false,
                    message: "Branch code mismatch"
                });
            }
        }

        // token
        const token = jwt.sign({
            id: auth._id,
            role: auth.role,
            branchcode: auth.branchcode,
            branchname: auth.branchname,
            userid: auth.userid
        }, "!@#$%^&*()", {
            expiresIn: "12h"
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        });

        res.status(200).json({
            status: true,
            message: "Login successful",
            user: {
                name: auth.name,
                role: auth.role,
                branchcode: auth.branchcode,
                branchname: auth.branchname,
            },
        });
    } catch (err) {

        res.status(500).json({
            status: false,
            message: err.message
        });
    }
};

export const updateAuth = async (req, res) => {
    try {

        const result = await Auth.findByIdAndUpdate(req.body._id, req.body, { new: true })
        if (!result) {
            return res.json({
                status: false,
                message: "Id nahi milla ye Id data base me nhi hai ",
                data: null
            })
        }
        res.json({
            status: true,
            message: "manager updation succesfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user updation failed !!",
            err: err.message
        })
    }
}
export const deleteAuth = async (req, res) => {
    try {
        const result = await Auth.findByIdAndDelete(req.query.id)
        res.json({
            status: true,
            message: "manager deleted succesfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user delted failed !!",
            err: err.message
        })
    }
}

export const forgetPassword = async (req, res) => {

}