const { Chart, Product, Order_Product, Order, sequelize } = require("../models");
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
            // let totalPrice = 0
            for (const chart of foundCharts) {
                const invoice = `INV-0${i}`

                const product = await Product.findOne({
                    where: {
                        id: chart.Product.id
                    }
                })

                if (chart.quantity < 1) {
                    throw { name: "InvalidQuantity" }
                }

                // await Order.create({
                //     total_price: chart.quantity * product.price,
                //     invoice,
                //     status
                // }, { transaction: t });

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
                // totalPrice += chart.quantity * product.price
                // order.invoice = invoice
                i++
            }
            // order.total_price += totalPrice


            // await order.save({ transaction: t })
            await t.commit();
            res.status(201).json({ success: true, message: "Order created successfully" });
        } catch (error) {
            await t.rollback();
            next(error);
        }
    }



    static async getAllOrder(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async updateStatusOrder(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async deleteOrder(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = OrderController