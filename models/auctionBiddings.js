
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const AuctionBiddings = sequelize.define('AuctionBiddings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        Price: {
            type: DataTypes.DECIMAL(14, 2),
            allowNull: false,

        }



    }, {
        sequelize: sequelize,
        timestamp: true,
        moduleName: 'AuctionBiddings',
        tableName: 'AuctionBiddings',
        paranoid: true,
        charset: 'utf8',
        collation: 'utf8_general_ci'
    })

    return AuctionBiddings;
}
