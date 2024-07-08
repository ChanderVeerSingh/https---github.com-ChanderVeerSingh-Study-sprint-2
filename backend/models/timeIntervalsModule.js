module.exports = (sequelize, DataTypes) => {

    const timeInterval = sequelize.define("time_interval", {
        library_id:{
            type:DataTypes.INTEGER,
        },
        start_time:{
            type:DataTypes.INTEGER,
        },
    })

    return timeInterval;
}