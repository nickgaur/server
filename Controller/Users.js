const db = require('../db/connection');
const { v4: uuidv4 } = require('uuid');

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login')
}

module.exports.renderHomepage = (req, res) => {
    const user = req.session.user
    let sql = "SELECT * FROM images";
    db.query(sql, (error, result) => {
        if (error) throw error;
        res.render('home/home', { user, images: result });
    })
}

module.exports.renderLoginForm = (req, res) => {
    req.session.destroy();
    res.render('loginForm/login');
}

module.exports.postLoginForm = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM Users WHERE email=?";
    db.query(sql, email, async (error, result) => {
        if (error) throw error;
        else if (result.length > 0) {
            if (password === result[0].password) {
                req.session.user = result[0];
                return res.redirect("/");
            }
            console.log("INCORRECT PASSWORD");
            return res.redirect('/login');
        }
        console.log("USER DOESN'T EXIST");
        res.redirect('/login');

    })
}


module.exports.renderRegisterForm = (req, res) => {
    res.render('register/register');
}


module.exports.postRegisterForm = async (req, res) => {
    const { fname, lname, email, password, role } = req.body;
    console.log(role);
    let sql = "INSERT INTO Users (userid,fname,lname,email,password,role) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [uuidv4(), fname, lname, email, password, role], (error, result) => {
        if (error) {
            console.error(error)
            console.log("USER ALREADY EXIST");
            return res.redirect("/register");
        }
        console.log('USER REGISTERED SUCCESSFULLY');
        res.redirect("/");
    })
}
