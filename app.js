const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const catchAsync = require('./utilities/catchAsync')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: 'dontmesswithme',
    resave: false,
    saveUninitialized: false
}))

const isLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect(`/merchant/login`)
    }
    next();
}
const isOwner = (req, res, next) => {
    const { id } = req.params;
    const usrid = req.session.user_id
    if (id !== usrid) {
        res.send('not allowed')
        return res.redirect(`/merchant/${usrid}/product`)
    }
    next();
}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'merchant_dibimbing'
});
app.get('/auth/test', (req, res) => {
    res.send(req.headers.authorization)
})
app.get('/merchant', (req, res) => {
    res.render('merchant')
});
app.get('/merchant/register', (req, res) => {
    res.render('register')
});

app.post('/merchant/register', catchAsync(async (req, res) => {
    const { id, user_name, user_password, address, phone_num } = req.body;
    const hash = await bcrypt.hash(user_password, 10);
    const newMerchant = {
        id: id,
        user_name: user_name,
        user_password: hash,
        address: address,
        phone_num: phone_num
    };
    await connection.query('INSERT INTO merchant SET ?', newMerchant, (error, result) => {
        if (error) throw error;
        req.session.user_id = id
        res.redirect(`/merchant/${id}/product`);
    });
}));
app.get('/merchant/login', (req, res) => {
    res.render('login');
})
app.post('/merchant/login', catchAsync(async (req, res, next) => {
    const { id, password } = req.body;
    const q = await connection.query(`SELECT * FROM merchant WHERE id = "${id}"`, async (error, result, fields) => {
        if (error) throw error;
        const { user_password } = result[0];
        const valid = await bcrypt.compare(password, user_password)
        if (valid) {
            req.session.user_id = id
            res.redirect(`/merchant/${id}/product`);
        } else if (valid == false) {
            res.redirect(`/merchant/login`);
        }
    });
}));

app.delete('/merchant/:id', isLogin, isOwner, catchAsync(async (req, res) => {
    const id = req.session.user_id
    let q = `DELETE FROM merchant WHERE id = '${id}'`
    await connection.query(q, function (error, result, fields) {
        if (error) throw error;
        res.redirect(`/merchant`)
    });
}));
app.get('/merchant/:id/product', isLogin, isOwner, catchAsync(async (req, res) => {
    const id = req.session.user_id
    let q = `SELECT * FROM product WHERE merchant_id = "${id}"`;
    await connection.query(q, (error, result, fields) => {
        if (error) throw error;
        res.render('products/show', { result, id });
    });
}))

app.post('/merchant/:id/product', isLogin, catchAsync(async (req, res) => {
    const id = req.session.user_id
    const newProduct = req.body;
    newProduct['merchant_id'] = id;
    await connection.query('INSERT INTO product SET ?', newProduct, (error, result) => {
        if (error) throw error;
        res.redirect(`/merchant/${id}/product`);
    });

}))

app.get('/merchant/:id/product/new', isLogin, (req, res) => {
    const id = req.session.user_id
    res.render('products/new', { id })
})

app.get('/merchant/:id/product/:prodid/edit', isLogin, async (req, res, next) => {
    try {
        const { prodid } = req.params;
        const id = req.session.user_id
        var q = `SELECT * FROM product WHERE id = ${prodid}`;
        await connection.query(q, (error, result, fields) => {
            if (error) throw error;
            res.render('products/edit', { result, id, prodid });
        });
    } catch (error) {
        next(error)
    }
})
app.patch('/merchant/:id/product/:prodid/edit', isLogin, catchAsync(async (req, res) => {
    const { prodid } = req.params;
    const id = req.session.user_id
    let newUpdate = {
    };
    newUpdate['product_name'] = req.body.product_name;
    newUpdate['quantity'] = req.body.quantity;
    newUpdate['price'] = req.body.price;
    let q = `UPDATE product SET ? WHERE id = ${prodid}`
    await connection.query(q, newUpdate, function (error, result, fields) {
        if (error) throw error;
        res.redirect(`/merchant/${id}/product`)
    });
}))
app.delete('/merchant/:id/product/:prodid/edit', isLogin, catchAsync(async (req, res) => {
    const { prodid } = req.params;
    const id = req.session.user_id
    let q = `DELETE FROM product WHERE id = ${prodid}`
    connection.query(q, function (error, result, fields) {
        if (error) throw error;
        res.redirect(`/merchant/${id}/product`)
    });
}))
app.post('/merchant/logout', isLogin, (req, res) => {
    req.session.user_id = null;
    res.redirect(`/merchant/login`)
})

app.use((error, req, res, next) => {
    res.send('something went wrong!!')
})
app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})
app.listen(3000, () => console.log('on port 3000'))