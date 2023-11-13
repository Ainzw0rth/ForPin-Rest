import { Request, Response } from "express";
import ExclusiveContentModel from "../models/exclusiveContentModel";

const exclusiveContentModel = new ExclusiveContentModel();
export function addExclusiveContent( req : Request, res : Response ) {
    try {
        const { post_id, caption, descriptions, genre } = req.body;
        const newContent = exclusiveContentModel.addExclusiveContent(post_id, caption, descriptions, genre);
        return res.json({
            success: true,
            data: newContent
        })
    } catch {
        res.sendStatus(500);
    }
}

export function getExclusiveContents( req : Request, res : Response ) {
    try {
        return exclusiveContentModel.getExclusiveContents();
    } catch {
        res.sendStatus(500);
    }
}

export function getExclusiveContent( req : Request, res : Response ) {
    try {
        const { premium_post_id } = req.params;
        return exclusiveContentModel.getExclusiveContent(premium_post_id);
    } catch {
        res.sendStatus(500);
    }
}


