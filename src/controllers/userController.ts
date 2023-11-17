import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import UserModel from "../models/userModel";
import AdminModel from "../models/adminModel";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModel = new UserModel();
const adminModel = new AdminModel();

export async function login( req : Request, res : Response ) {
    try {
        const { username, password } = req.body;
        const user = await userModel.getUser(username);
        const admin = await adminModel.getAdmin(username);
        const secret = process.env.JWT_TOKEN_SECRET;

        if (admin) {
            const passwordTrue = bcrypt.compareSync(password, admin.password);
            const token = jwt.sign({username: username, password: password}, secret, {expiresIn: '24h'});
            if (passwordTrue) {
                res.status(200).json({
                    success: true,
                    data: admin,
                    token,
                    is_admin: true
                })
            } else {
                res.json({
                    message: "failed"
                });
            }
        } else {
            if (user) {
                const passwordTrue = bcrypt.compareSync(password, user.password);
                const token = jwt.sign({username: username, password: password}, secret, {expiresIn: '24h'});
                if (passwordTrue) {
                    res.status(200).json({
                        success: true,
                        data: user,
                        token,
                        is_admin: false
                    })
                } else {
                    res.json({
                        message: "failed"
                    });
                }
            } else {
                res.sendStatus(400);
            }
        }
        
      
    } catch {
        return res.sendStatus(500);
    }
}

export function logout() {
    return "";
}

