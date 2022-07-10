const db = require('../db/connection')
const { v4: uuidv4 } = require('uuid');

module.exports.renderLoginDetails = (req, res) => {
    if (req.session.user) {
        return res.send({ loggedIn: true, user: req.session.user })
    }
    res.send({ loggedIn: false })
}

module.exports.postLoginData = (req, res) => {
    const { email, password } = req.body;
    try {
        const sql = "SELECT * FROM Users WHERE email=?";
        db.query(sql, email, (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                const sql = "SELECT password FROM Users WHERE email=?";
                db.query(sql, email, (err, returnedPassword) => {
                    if (err) throw err
                    actualPassword = returnedPassword[0].password
                    if (password === actualPassword) {
                        req.session.user = result;
                        res.send(result);
                    }
                    else {
                        res.send({ message: "Email or Password is incorrect!!" });
                    }
                })
            }
            else {
                res.send({ message: "Email Doesn't Exist" });
            }
        })
    }
    catch (err) {
        throw err;
    }
}