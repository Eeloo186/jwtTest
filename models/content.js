const Sequelize = require('sequelize');

class Content extends Sequelize.Model {
  static initiate(sequelize) {
    Content.init({
        content: {
            type: Sequelize.STRING(5000),
            allowNull: false,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Content',
      tableName: 'contents',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Content.belongsTo(db.Post);
  }
};

module.exports = Content;
