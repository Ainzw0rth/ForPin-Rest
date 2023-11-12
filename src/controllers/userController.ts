import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import UserModel from "../models/userModel";

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export async function register( req : Request, res : Response ) {
    try {
        const { user_id, email, fullname, username, password, profile_path } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newPremiumUser = await prisma.premium_user.create({
            data: {
                user_id,
                email, 
                fullname, 
                username, 
                password: hashedPassword, 
                profile_path
            }
        });
        return res.json({
            success: true,
            data: newPremiumUser
        })
    } catch {
        return res.sendStatus(500);
    }
}

export async function login( req : Request, res : Response ) {
    const userModel = new UserModel();
    try {
        const { username, password } = req.body;
        const user = await userModel.getUser(username);
        const secret = process.env.TOKEN_SECRET;
        
        if (user) {
            const passwordTrue = bcrypt.compareSync(password);
            const token = jwt.sign({username: username, password: password}, secret, {expiresIn: '24h'});
            if (passwordTrue) {
                res.status(200).json({
                    success: true,
                    data: user,
                    token
                })
            } else {
                res.json({
                    message: "failed"
                });
            }
        } else {
            res.sendStatus(400);
        }
    } catch {
        return res.sendStatus(500);
    }
}

export function logout() {
    return "";
}

