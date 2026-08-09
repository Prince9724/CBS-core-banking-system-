export const adminOnly = (req, res, next) => {

    if (req.user.role !== "Admin") {

        return res.status(403).json({
            status: false,
            message: "Only Admin can access this route"
        });
    }

    next();
};