module.exports = (sequelize, DataTypes) => {

    const library = sequelize.define("library", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location_id: {
            type: DataTypes.INTEGER
        },
        facilities:{
            type:DataTypes.STRING
        },
        image:{
            type:DataTypes.STRING
        },
        gmap_coordinates:{
            type: DataTypes.STRING
        },
        poc_name:{
            type: DataTypes.STRING,
        },
        poc_number:{
            type:DataTypes.STRING
        }
    })

    return library
}