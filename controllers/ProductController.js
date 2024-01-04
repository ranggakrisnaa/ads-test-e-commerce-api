const { Product, sequelize } = require("../models");

class ProductController {
    static async addProduct(req, res, next) {
        try {
            await Product.create(req.body)

            res.status(201).json({ success: true, message: "Product Created Successfully" })
        } catch (error) {
            next(error)
        }
    }

    static async getAllProduct(req, res, next) {
        try {
            const foundProduct = await Product.findAll()

            res.status(200).json({
                success: true, message: "Product Data Retrieved Successfully", data: foundProduct
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        const { id } = req.params
        const { title, description, SKU, price, stock } = req.body
        try {
            const foundProduct = await Product.findOne({
                where: {
                    id
                }
            })

            if (!foundProduct) {
                throw { name: "ErrNotFound" }
            }

            const payload = {
                title: title || foundProduct.title,
                description: description || foundProduct.description,
                SKU: SKU || foundProduct.SKU,
                price: price || foundProduct.price,
                stock: stock || foundProduct.stock
            }

            await foundProduct.update(payload);
            res
                .status(200)
                .json({ sucess: true, message: "User Updated Successfully" });
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        const { id } = req.params
        try {
            const foundProduct = await Product.findOne({
                where: {
                    id
                }
            })

            if (!foundProduct) {
                throw { name: "ErrorNotFound" }
            }

            await foundProduct.destroy()
            res
                .status(200)
                .json({ sucess: true, message: "Product Deleted Successfully" });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController