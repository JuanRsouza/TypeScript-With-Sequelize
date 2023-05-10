import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare teamName: string;
}

Teams.init(
  {
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    } },
  {
    underscored: true,
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
  },
);

export default Teams;
