const bcrypt = require('bcrypt');
const {getQueryPost, getQuery} = require('../database/query');

const registerInstruction = (req, res) => {
    res.status(200).json({
        post: "to - merchant/register to register merchant",
        id: "create your user name for login",
        user_name: "name of your merchant",
        user_password: "create your password",
        address: "enter your address",
        phone_num: "enter your phone number"
    });
};

const registerMerchant = async (req, res, next) => {
    const { id, user_name, user_password, address, phone_num } = req.body;
    const hash = await bcrypt.hash(user_password, 10);
    const newMerchant = {
        id: id,
        user_name: user_name,
        user_password: hash,
        address: address,
        phone_num: phone_num
    };
    const q = 'INSERT INTO merchant SET ?';
    getQueryPost(q, newMerchant, (error, result) => {
        if (error) {
                return next(error)
        } else {
            res.status(200).json({
                register: "successfully",
                acsess: "/merchant/:id/product",
                id: id
            });
        }
    })
};
const getMerchantByid = async (req, res) => {
    const id = req.params.id
    let q = `SELECT * FROM merchant WHERE id = "${id}"`;
    getQuery(q, (error, result) => {
        if (error) {
            return res.status(500).json({
                error: "something went wrong"
            })
        } else {
            res.json({result})
        }
    })
};

const removeMerchant = async (req, res, next) => {
    const id = req.cookies.uid
    let q = `DELETE FROM merchant WHERE id = '${id}'`
    getQuery(q, function (error, result, fields) {
        if (error){
            res.status(500).send('something went wrong')
        };
        res.clearCookie('uid')
        return res.json({
            succsessfully: "delete merchant"
        })
    });
};

module.exports = {registerMerchant, registerInstruction, removeMerchant, getMerchantByid}