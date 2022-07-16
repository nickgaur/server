const db = require("../db/connection");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

module.exports.isAdminLoggedIn = (req, res, next) => {
    if(!(req.session.user.role === "admin")){
        res.status(403).json({message: "You are not allowed to create new user!!"});
    }
    next();
}

module.exports.isAuthorized = (req, res, next) => {
    const {id} = req.params;
    let sql = "SELECT * FROM images WHERE imageName = ?";
    db.query(sql, id, (error, result) => {
        if(error) throw error;
        if(result[0].userid === req.session.userid){
            return res.status(403).json({message: "You are not allowed to delete this post"})
        }
        next();
    })
    // if(req.session.user.userid === )
}