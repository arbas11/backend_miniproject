const { connectDB } = require('./db')

async function getQuery(q, next) {
    await connectDB.query(q, (error, result, fields) => {
        if (error) {
            next(error)
        } else {
            next(null, result)
        }
    });
}

async function getQueryPost(q, newData, next) {
    await connectDB.query(q, newData, (error, result, fields) => {
        if (error) {
            next(error)
        } else {
            next(null, result)
        }
    });
}

module.exports = { getQuery, getQueryPost }