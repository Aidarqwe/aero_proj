import { Request, Response, NextFunction } from "express";
import * as path from "path";
import * as fs from "fs/promises";
import File from "../models/File";
import ApiError from "../exceptions/api-error";

class FilesController {
    async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.file)
            if (!req.file) {
                return next(ApiError.BadRequest("Файл не загружен", []));
            }

            const { originalname, mimetype, size, path: filepath } = req.file;

            const extension = path.extname(originalname).substring(1);

            const newFile = await File.create({
                filename: originalname,
                extension,
                mime_type: mimetype,
                size,
                path: filepath,
                upload_date: new Date(),
            });

            return res.json(newFile);
        } catch (e) {
            next(e);
        }
    }

    async listFiles(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const listSize = parseInt(req.query.list_size as string) || 10;
            const offset = (page - 1) * listSize;

            const files = await File.findAndCountAll({
                offset,
                limit: listSize,
                order: [["upload_date", "DESC"]],
            });

            return res.json({
                page,
                totalPages: Math.ceil(files.count / listSize),
                total: files.count,
                data: files.rows,
            });
        } catch (e) {
            next(e);
        }
    }

    async getFile(req: Request, res: Response, next: NextFunction) {
        try {
            const file = await File.findByPk(req.params.id);
            if (!file) {
                return next(ApiError.NotFoundError("Файл не найден"));
            }

            return res.json(file);
        } catch (e) {
            next(e);
        }
    }

    async downloadFile(req: Request, res: Response, next: NextFunction) {
        try {
            const file = await File.findByPk(req.params.id);
            if (!file) {
                return next(ApiError.NotFoundError("Файл не найден"));
            }

            return res.download(file.path, file.filename);
        } catch (e) {
            next(e);
        }
    }

    async deleteFile(req: Request, res: Response, next: NextFunction) {
        try {
            const file = await File.findByPk(req.params.id);
            if (!file) {
                return next(ApiError.NotFoundError("Файл не найден"));
            }

            await fs.unlink(file.path).catch(() => {});
            await file.destroy();

            return res.json({ message: "Файл удалён" });
        } catch (e) {
            next(e);
        }
    }

    async updateFile(req: Request, res: Response, next: NextFunction) {
        try {
            const file = await File.findByPk(req.params.id);
            if (!file) {
                return next(ApiError.NotFoundError("Файл не найден"));
            }

            await fs.unlink(file.path).catch(() => {});

            if (!req.file) {
                return next(ApiError.BadRequest("Файл не загружен"));
            }

            const { originalname, mimetype, size, path: filepath } = req.file;
            const extension = path.extname(originalname).substring(1);

            await file.update({
                filename: originalname,
                extension,
                mime_type: mimetype,
                size,
                path: filepath,
                upload_date: new Date(),
            });

            return res.json(file);
        } catch (e) {
            next(e);
        }
    }
}

export default new FilesController();
