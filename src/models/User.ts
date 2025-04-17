import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class User extends Model {
    declare u_id: number;
    declare id: string;
    declare password: string;
}

User.init(
    {
        u_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        modelName: "user",
        tableName: "users",
        timestamps: false,
    }
);



export default User;

