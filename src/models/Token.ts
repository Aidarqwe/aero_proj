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
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: "u_id" },
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
