import express from "express";
import { addAlbum, listAlbums, removeAlbums } from "../controllers/albumController.js";
import upload from "../middleware/multer.js";

const albumRouter = express.Router();

albumRouter.post("/add", upload.single('image'), addAlbum);
albumRouter.get("/list", listAlbums);
albumRouter.post("/remove", removeAlbums);

export default albumRouter;