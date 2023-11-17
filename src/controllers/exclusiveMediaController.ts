import { Request, Response } from "express";
import ExclusiveMediaModel from "../models/exclusiveMediaModel";

const exclusiveMediaModel = new ExclusiveMediaModel();
export function saveExclusiveMedia( req : Request, res : Response ) {
    try {
        const { media_path, media_post_id } = req.body;
        const newMedia = exclusiveMediaModel.saveExclusiveMedia(media_path, media_post_id);
        return res.json({
            success: true,
            data: newMedia
        })
    } catch {
        res.sendStatus(500);
    }
}
