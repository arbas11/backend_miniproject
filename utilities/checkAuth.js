const isLogin = (req, res, next) => {
    if (!req.cookies.uid) {
        return res.status(401).json({
            error: "unautorized"})
    }
    next();
}
const isOwner = (req, res, next) => {
    const { id } = req.params;
    const usrid = req.cookies.uid
    if (id !== usrid) {
        return res.status(401).json({
            error: "You my friend not allowed to do that!"})
    }
    next();
}

module.exports = { isLogin, isOwner }