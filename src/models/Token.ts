import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import User from "./User";

class Token extends Model {
    declare id: number;
    declare userId: number;
    declare refreshToken: string;
}

Token.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: User, key: "id" },
            onDelete: "CASCADE",
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "token",
        tableName: "tokens",
        timestamps: false,
    }
);

export default Token;
