'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.User, {
        foreignKey: "adminId",
        targetKey: "id",
        as: 'adminData'
      });
    }
  };
  Posts.init({
    adminId: DataTypes.INTEGER,
    description: DataTypes.TEXT('long'),
    descriptionHTML: DataTypes.TEXT('long'),
    descriptionMarkdown: DataTypes.TEXT('long'),
    image: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
