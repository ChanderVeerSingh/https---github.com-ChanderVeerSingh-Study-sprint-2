module.exports = (sequelize, DataTypes) => {

    const location = sequelize.define("locations", {
        name: {
            type: DataTypes.STRING,
        },
        pincode: {
            type: DataTypes.INTEGER,
        }
    })

    return location;
}