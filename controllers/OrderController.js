const { Chart, Product, Order_Product, User, Order, sequelize } = require("../models");
class OrderController {

    static async addOrder(req, res, next) {
        const { id } = req.loggedUser;
        const { status } = req.body;
        const t = await sequelize.transaction();
        try {
            const foundCharts = await Chart.findAll({
                where: { user_id: id },
                include: [{ model: Product }],
                transaction: t
            });

            if (foundCharts.length === 0) {
                throw { name: "InvalidQuantity" }
            }

            const order = await Order.create(
                {
                    total_price: 0,
                    invoice: null,
                    status,
                },
                { returning: true, transaction: t }
            );


            if (!foundCharts) {
                throw { name: "ErrorNotFound" };
            }

            let i = 1
            for (const chart of foundCharts) {
                const invoice = `INV-0${i}`

                const product = await Product.findOne({
                    where: {
                        id: chart.Product.id
                    }
                })

                await Order_Product.create({
                    quantity: chart.quantity,
                    price: product.price,
                    order_id: order.id,
                    product_id: product.id
                })

                await order.update({
                    total_price: chart.quantity * product.price,
                    invoice,
                    status
                }, { transaction: t });

                await product.decrement('stock', {
                    by: chart.quantity,
                    transaction: t
                })

                await chart.decrement('quantity', {
                    by: chart.quantity,
                    transaction: t
                })

                i++
            }

            await t.commit();
            res.status(201).json({ success: true, message: "Order Product created successfully" });
        } catch (error) {
            await t.rollback();
            next(error);
        }
    }

    static async getAllOrder(req, res, next) {
        try {
            const foundOrder = await Order.findAll({
                include: [
                    {
                        model: Product,
                        include: {
                            model: User
                        }
                    }
                ]
            })

            res.status(200).json({ success: true, message: "Order Product Retrieved Successfully", data: foundOrder })
        } catch (error) {
            next(error)
        }
    }

    static async updateStatusOrder(req, res, next) {
        const { id } = req.params
        const { status } = req.body
        try {
            const foundOrder = await Order.findOne({
                where: {
                    id
                }
            })

            if (!foundOrder) {
                throw { name: "ErrorNotFound" }
            }

            await foundOrder.update({ status })
            res.status(200).json({ success: true, message: "Status Order Updated Successfully" })
        } catch (error) {
            next(error)
        }
    }

    static async deleteOrder(req, res, next) {
        const { id } = req.params
        try {
            const foundOrder = await Order.findOne({
                where: {
                    id
                }
            })

            if (!foundOrder) {
                throw { name: "ErrorNotFound" }
            }

            await foundOrder.destroy()
            res.status(200).json({ success: true, message: "Order Product Deleted Successfully" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OrderController