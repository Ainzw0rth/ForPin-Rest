import { Request, Response } from "express";
import ExclusiveContentModel from "../models/exclusiveContentModel";

const exclusiveContentModel = new ExclusiveContentModel();
export async function addExclusiveContent( req : Request, res : Response ) {
    try {
        console.log(req.body);
        const { user_id, caption, descriptions, media_paths, genres } = req.body;
        const newContent = exclusiveContentModel.addExclusiveContent(user_id, caption, descriptions, media_paths, genres);
        
        return res.json({
            success: true,
            data: newContent
        })
    } catch {
        res.sendStatus(500);
    }
}

export async function getExclusiveContents( req : Request, res : Response ) {
    try {
        const results = await exclusiveContentModel.getExclusiveContents();
        return res.json({
            success: true,
            data: results
        })
    } catch {
        res.sendStatus(500);
    }
}

export async function getExclusiveContent( req : Request, res : Response ) {
    try {
        const { premium_post_id } = req.params;
        const results = await exclusiveContentModel.getExclusiveContent(premium_post_id);
        return res.json({
            success: true,
            data: results
        })
    } catch {
        res.sendStatus(500);
    }
}


