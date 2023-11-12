import { Request, Response } from "express";

export async function register( req : Request, res : Response) {
    res.status(200).json({ message: "OK"});
}

export function login() {
    return "";
}

export function logout() {
    return "";
}

