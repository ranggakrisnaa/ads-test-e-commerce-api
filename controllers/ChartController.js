const { Chart, Product, User, sequelize } = require("../models");

class ChartController {
    static async addChart(req, res, next) {
        const { id } = req.loggedUser
        const { quantity, product_id } = req.body
        const t = await sequelize.transaction()
        try {
            const foundProduct = await Product.findOne({
                where: {
                    id: product_id
                }
            }, { transaction: t })

            if (!foundProduct) {
                throw { name: "ErrorNotFound" }
            }

            const foundChartProd = await Chart.findOne({
                where: {
                    user_id: id,
                    product_id: product_id
                }
            })

            if (quantity > foundProduct.stock || (foundChartProd && foundChartProd.quantity > foundProduct.stock)) {
                throw { name: "insufficientQuantity" };
            }

            // if (quantity > foundProduct.stock || foundChartProd.quantity && foundChartProd.quantity > foundProduct.stock) {
            //     throw { name: "insufficientQuantity" }
            // }
            // else {
            //     await foundProduct.decrement('stock', {
            //         by: quantity
            //     })
            // }

            if (foundChartProd) {
                await foundChartProd.increment('quantity', {
                    by: quantity
                })
            } else {
                await Chart.create({
                    quantity: quantity,
                    product_id: foundProduct.id,
                    user_id: id
                }, { transaction: t })
            }


            await t.commit()
            res.status(201).json({ success: true, message: "Chart Product Created Successfully" })
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async getAllChart(req, res, next) {
        try {
            const foundChart = await Chart.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['user_id'] },
                        include: [{ model: Product }]
                    }
                ]
            });
            res.status(200).json({ success: true, message: "Chart Product Retrieved Successfully", data: foundChart })
        } catch (error) {
            next(error)
        }
    }

    static async updateQuantity(req, res, next) {
        const { id } = req.params
        const { quantity } = req.body
        try {
            const foundChart = await Chart.findOne({
                where: {
                    id
                }
            })
            if (!foundChart) {
                throw { name: "ErrorNotFound" }
            }

            await foundChart.update({ quantity })
            res.status(200).json({ success: true, message: "Chart Product Updated Successfully" })
        } catch (error) {
            next(error)
        }
    }

    static async deleteChart(req, res, next) {
        const { id } = req.params
        try {
            const foundChart = await Chart.findOne({
                where: {
                    id
                }
            })

            if (!foundChart) {
                throw { name: "ErrorNotFound" }
            }

            await foundChart.destroy()
            res.status(200).json({ sucess: true, message: "Product Deleted Successfully" });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ChartController