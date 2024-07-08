module.exports = (sequelize, DataTypes) => {

    const seat = sequelize.define("seat", {
        library_id:{
            type:DataTypes.INTEGER,
        },
        seat_number:{
            type:DataTypes.INTEGER,
        },
        price:{
            type:DataTypes.INTEGER
        },
        room_id:{
            type:DataTypes.INTEGER,
        },
        slot_1:{
            type: DataTypes.BOOLEAN,
        },
        slot_2:{
            type: DataTypes.BOOLEAN,
        },
        slot_3:{
            type:DataTypes.BOOLEAN,
        },
        slot_4:{
            type:DataTypes.BOOLEAN,
        }

    })

    return seat;
}