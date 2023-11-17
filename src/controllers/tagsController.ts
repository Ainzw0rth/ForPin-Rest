import { Request, Response } from "express";
import TagsModel from "../models/tagsModel";

const tagsModel = new TagsModel();
export async function getTags( req : Request, res : Response ) {
    try {
        const results = await tagsModel.getAllTags();
        return res.json({
            success: true,
            data: results
        })
    } catch {
        res.sendStatus(500);
    }
}