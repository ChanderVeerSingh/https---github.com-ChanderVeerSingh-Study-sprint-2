
module.exports = (sequelize, DataTypes) => {

    const payment = sequelize.define("payment_detail", {
        price_paid:{
            type:DataTypes.INTEGER,
        },
        payment_id:{
            type: DataTypes.STRING,
        },
        payment_time:{
            type :DataTypes.TIME
        }
    })

    return payment;
}