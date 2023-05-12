import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init(
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'users',
    timestamps: false,
  },
);

export default Users;
