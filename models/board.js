const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
  static initiate(sequelize) {
    Board.init({
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Board',
      tableName: 'boards',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Board.hasMany(db.Post);
  }
};

module.exports = Board;
