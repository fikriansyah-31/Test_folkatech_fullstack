'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, {
        foreignKey: "productId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init({
    title: DataTypes.STRING,
    namaProduct: DataTypes.STRING,
    harga: DataTypes.DOUBLE,
    description: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    imagesUrl: DataTypes.TEXT,
    brand: DataTypes.STRING,
    spesifikasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};