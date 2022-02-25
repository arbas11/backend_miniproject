const express = require('express');
const app = express();
const authRoutes = require('./routes/auth')
const logoutRoutes = require('./routes/logout')
const merchantRoutes = require('./routes/merchant')
const productRoutes = require('./routes/product')
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

app.use('/merchant/login', authRoutes)
app.use('/merchant/logout', logoutRoutes)
app.use('/merchant', merchantRoutes )
app.use('/merchant/:id', productRoutes )

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    const { message = 'something is not right from error handler', status = 500 } = error;
    res.status(status).send(message)
})
app.use((req, res) => {
    res.status(404).send('NOT FOUND! from 404')
})
app.listen(3000, ()=>console.log('on port 3000'))