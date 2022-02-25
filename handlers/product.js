const {getQueryPost, getQuery} = require('../database/query');

const getAllProduct = async (req, res) => {
    const id = req.params.id
    let q = `SELECT * FROM product WHERE merchant_id = "${id}"`;
    await getQuery(q, (error, result) => {
        if (error) {
            return res.status(500).json({
                error: "something went wrong"
            })
        } else {
            res.json({
                instruction: {
                    add: "to add product POST",
                    product_name: "name of your product",
                    quantity: "your product stock",
                    price: "price of your product"
                },
                result
            })
        }
    })
};
const getProductByID = async (req, res, next) => {
        const { prodid } = req.params;
        var q = `SELECT * FROM product WHERE id = ${prodid}`;
        await getQuery(q, (error, result, fields) => {
            if (error) {
                res.status(500).json({
                    error: "something went wrong"})
            }
            res.json({
                instruction: {
                    toedit: "to edit product PATCH",
                    product_name: "Update name",
                    quantity: "Update stock",
                    price: "Update Price"
                },
                result
            })
        });
};
const addNewProduct = async (req, res) => {
    const id = req.cookies.uid
    const newProduct = req.body;
    newProduct['merchant_id'] = id;
    await getQueryPost('INSERT INTO product SET ?', newProduct, (error, result) => {
        if (error){
            res.status(500).json({
                error: "something went wrong"})
        };
        res.json({
            status: {
                add: "successfully added!"
            },
        })
    });

};

const updateProduct = async (req, res) => {
    const { prodid } = req.params;
    const id = req.cookies.uid
    let newUpdate = {
    };
    newUpdate['product_name'] = req.body.product_name;
    newUpdate['quantity'] = req.body.quantity;
    newUpdate['price'] = req.body.price;
    let q = `UPDATE product SET ? WHERE id = ${prodid}`
    await getQueryPost(q, newUpdate, function (error, result, fields) {
        if (error){
            res.status(500).json({
                error: "something went wrong"})
        };
        res.json({
            instruction: {
                status: "sucessfully update"
            },
            product:{
                ...newUpdate
            }
        })
    });
};

const removeProduct = async (req, res) => {
    const { prodid } = req.params;
    const id = req.cookies.uid
    let q = `DELETE FROM product WHERE id = ${prodid}`
    await getQuery(q, function (error, result, fields) {
        if (error){
            res.status(500).json({
                error: "something went wrong"})
        };
        res.json({
            instruction: {
                status: "sucessfully delete"
            }
        })
    });
};

module.exports = {getAllProduct, getProductByID, addNewProduct, updateProduct, removeProduct}