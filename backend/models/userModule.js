module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define("users", {
        adhar_number:{
            type: DataTypes.STRING,
        },
        phone_number:{
            type:DataTypes.STRING,
        },
        age:{
            type:DataTypes.INTEGER,
        },
        emaiL:{
            type:DataTypes.STRING,
        },
        institute_name:{
            type:DataTypes.STRING,
        }
    })

    return user;
}