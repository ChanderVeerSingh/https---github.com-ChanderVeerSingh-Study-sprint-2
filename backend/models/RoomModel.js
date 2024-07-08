module.exports = (sequelize, DataTypes) => {

    const room = sequelize.define("room", {
        library_id:{
            type:DataTypes.INTEGER,
        },
        room_number:{
            type:DataTypes.INTEGER,
        },
        total_seats:{
            type: DataTypes.INTEGER,
        },
        is_ac_room:{
            type: DataTypes.BOOLEAN
        }

    })

    return room
}