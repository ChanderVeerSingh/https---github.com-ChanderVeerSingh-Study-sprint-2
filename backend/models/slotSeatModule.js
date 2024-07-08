module.exports = (sequelize, DataTypes) => {

    const slotSeat = sequelize.define("slot_seats", {
        library_id:{
            type:DataTypes.INTEGER,
        },
        room_id:{
            type:DataTypes.INTEGER,
        },
        seat_id:{
            type:DataTypes.INTEGER,
        },
        seat_number:{
            type:DataTypes.INTEGER
        },
        time_interval_id:{
            type:DataTypes.INTEGER,
        },
        price:{
            type:DataTypes.INTEGER,
        },
        is_available:{
            type:DataTypes.BOOLEAN,
        }
    })

    return slotSeat;
}