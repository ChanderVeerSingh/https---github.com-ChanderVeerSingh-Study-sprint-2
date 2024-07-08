
module.exports = (sequelize, DataTypes) => {

    const booking= sequelize.define("bookings", {
        library_id:{
            type: DataTypes.INTEGER
        },
        start_time:{
            type: DataTypes.INTEGER
        },
        end_time:{
            type:DataTypes.INTEGER,
        },
        user_id:{
            type:DataTypes.INTEGER
        },
        user_number:{
            type:DataTypes.STRING
        },
        room_number:{
            type:DataTypes.INTEGER
        },
        seat_number:{
            type:DataTypes.INTEGER
        },
        total_payment:{
            type:DataTypes.INTEGER
        }
    })

    return booking;
}