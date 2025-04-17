import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class File extends Model {
    declare id: number;
    declare filename: string;
    declare extension: string;
    declare mime_type : string;
    declare size: number;
    declare upload_date: Date;
    declare path: string
}

File.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        extension: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mime_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        upload_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "file",
        tableName: "files",
        timestamps: false,
    }
);

export default File;
