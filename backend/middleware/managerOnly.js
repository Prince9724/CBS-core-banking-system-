export const managerOnly = (req, res, next) => {

    console.log("Token user =>", req.user);

    if (req.user.role !== "manager") {

        return res.status(403).json({
            status: false,
            message: "Only Manager can access this route"
        });
    }

    next();
};