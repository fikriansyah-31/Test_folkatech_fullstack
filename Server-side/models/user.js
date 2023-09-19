'use strict';
const {
  Model
} = require('sequelize');
const Hash = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    namaDepan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Depan cannot be null"
        },
        notEmpty: {
          msg: "Nama Depan cannot be empty"
        }
      }
      
    },
    namaBelakang: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nama Belakang cannot be null"
        },
        notEmpty: {
          msg: "Nama Belakang cannot be empty"
        }
      }
      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be null"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
      
    },
    nomorTelepon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Nomor Telepon cannot be null"
        },
        notEmpty: {
          msg: "Nomor Telepon cannot be empty"
        }
      }
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
      
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, opt) => {
    user.password = Hash.create(user.password)
  })
  return User;
};