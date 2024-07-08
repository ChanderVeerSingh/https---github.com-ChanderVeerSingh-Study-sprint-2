const dbConfig = require('../config/config.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Booking = require('./BookingModel.js')(sequelize, DataTypes)
db.library = require('./libraryModel.js')(sequelize, DataTypes)
db.timeSlot = require('./timeSlotModel.js')(sequelize, DataTypes)
db.user=require('./userModule.js')(sequelize,DataTypes)
db.room=require('./RoomModel.js')(sequelize, DataTypes)
db.seat=require('./seatModule.js')(sequelize, DataTypes)
db.payment_detail=require('./paymentDetailsModule.js')(sequelize, DataTypes)
db.location=require('./locationModule.js')(sequelize, DataTypes)
db.timeInterval=require('./timeIntervalsModule.js')(sequelize,DataTypes)
db.slotSeat=require('./slotSeatModule.js')(sequelize,DataTypes)


db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})
// 1 to Many Relation

// db.products.hasMany(db.reviews, {
//     foreignKey: 'product_id',
//     as: 'review'
// })

// db.reviews.belongsTo(db.products, {
//     foreignKey: 'product_id',
//     as: 'product'
// })





module.exports = db