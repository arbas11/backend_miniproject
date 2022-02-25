const bcrypt = require('bcrypt');
const {getQuery} = require('../database/query');

const loginInstruction = (req, res) => {
    res.status(200).json({
        id: "your username",
        password: "your password"
    });
};

const login = async (req, res, next) => {
    const { id, password } = req.body;
    if(!id && !password || password === undefined || id === undefined){
        return res.status(401).json({ error: "something wrong with the request" });
    }else{
    const q = `SELECT * FROM merchant WHERE id = "${id}"`;
    getQuery(q, async (error, result) => {
        if (result[0] === undefined) {
            return res.status(401).json({ error: "wrong id or password try again" });
        } else {
            const { user_password } = result[0];
            const valid = await bcrypt.compare(password, user_password)
                if (valid) {
                    res.cookie('uid', id)
                    res.status(200).json({
                    login: "successfully",
                    acsess: "/merchant/:id/product",
                    id: id,
                    });
                }else{
                    return res.status(401).json({ error: "wrong id or password try again" });
                }
        }
        })
}
};

const logout = (req, res) => {
    res.clearCookie('uid')
    return res.json({
        logout: "successfully",
    });
};

module.exports = {login, loginInstruction, logout}