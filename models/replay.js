module.exports = function (sequlize, DataTypes) {
    var Replay = sequlize.define("Replay", {
        
        playerName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        pieceName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        capName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        to: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        from: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        side: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        replay: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });
    return Replay;
}