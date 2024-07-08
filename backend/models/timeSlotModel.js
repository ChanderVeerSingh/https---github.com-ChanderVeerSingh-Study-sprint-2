module.exports = (sequelize, DataTypes) => {

    const time_slots = sequelize.define("time_slot", {
        slot_id:{
            type:DataTypes.INTEGER,
        },
        start_time:{
            type: DataTypes.STRING,
        },
        end_time:{
            type: DataTypes.STRING,
        }
    })

    return time_slots;
}