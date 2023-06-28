const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        userId: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        address1: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        address2: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        address3: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao", "google", "naver"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        pet: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        rank: {
          type: Sequelize.STRING(5), // 추후 ENUM으로 변경
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Pet);
    db.User.hasMany(db.Like);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers",
      through: "Follow",
    });
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings",
      through: "Follow",
    });
  }
}

module.exports = User;
