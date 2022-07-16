const express = require('express');
const Router = express.Router({ mergeParams: true });
const { isLoggedIn, isAuthorized } = require('../middleware/middleware');
const multer = require('multer');
const path = require('path');
const db = require('../db/connection');


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({ storage: storage })

Router
    .route('/uploads')
    .post(isLoggedIn, upload.single('image'), (req, res) => {
        try {
            const imageName = req.file.filename;
            const userId = req.session.user.userid;
            let sql = `INSERT INTO images (imageName, userid) VALUES (?, ?)`
            db.query(sql, [imageName, userId], (error, result) => {
                if (error) throw error;
            })
        }
        catch (err) {
            console.log("FILE MUST NOT BE EMPTY");
        }
        res.redirect("/");

    })

    Router
    .route("/delete/:id")
    .post(isLoggedIn, isAuthorized, async (req, res) => {
        const {id} = req.params;
        let sql = "DELETE FROM images where imageName = ?";
        await db.query(sql, id, (error, result) => {
            if(error) throw error;
            res.redirect("/");
        })
    })

module.exports = Router;