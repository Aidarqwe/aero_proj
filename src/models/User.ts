import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class User extends Model {
    declare id: string;
    declare password: string;
}

User.init(
    {
        id: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
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

