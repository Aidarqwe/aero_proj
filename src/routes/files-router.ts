import {Router} from "express";
import {uploadFile} from "../middleware/file-middleware";
import authMiddleware from "../middleware/auth-middleware";
import filesController from "../controllers/files-controller";


const filesRouter = Router();

// filesRouter.post('/upload', uploadFile, filesController.uploadFile);
// filesRouter.get('/list', filesController.listFiles);
// filesRouter.get('/:id', filesController.getFile);
// filesRouter.get('/download/:id', filesController.downloadFile);
// filesRouter.put('/update/:id', uploadFile, filesController.updateFile);
// filesRouter.delete('/delete/:id', filesController.deleteFile);

export default filesRouter;
