module.exports = function (sequelize, DataTypes) {
    var Replay = sequelize.define("Replay", {
        
        playerName: {
            type: DataTypes.STRING
        },
        pieceName: {
            type: DataTypes.STRING
        },
        capName: {
            type: DataTypes.STRING
        },
        to: {
            type: DataTypes.INTEGER
        },
        from: {
            type: DataTypes.INTEGER
        },
        side: {
            type: DataTypes.STRING
        },
        replay: {
            type: DataTypes.STRING
        },
    });
    return Replay;
}
