import {Router} from "express";
import filesController from "../controllers/files-controller";
import {uploadFile} from "../middleware/file-middleware";
import asyncHandler from "../service/asyncHandler";

const filesRouter = Router();

filesRouter.post('/upload', uploadFile, asyncHandler(filesController.uploadFile));
filesRouter.get('/list', asyncHandler(filesController.listFiles));
filesRouter.get('/:id', asyncHandler(filesController.getFile));
filesRouter.get('/download/:id', asyncHandler(filesController.downloadFile));
filesRouter.put('/update/:id', uploadFile, asyncHandler(filesController.updateFile));
filesRouter.delete('/delete/:id', asyncHandler(filesController.deleteFile));

export default filesRouter;
