import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import AdminModel from "../models/adminModel";

const adminModel = new AdminModel();
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export async function register( req : Request, res : Response ) {
    try {
        const { user_id, email, fullname, username, password, profile_path } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usernameDb = await adminModel.getAdmin(username);
        const emailDb = await adminModel.getAdminFromEmail(email);

        if (usernameDb && emailDb) {
            res.status(400).send({
                status: res.statusCode,
                success: false,
                data: null,
                message: 'Username and email already exist'
            });
            return;
        }
        if (usernameDb) {
            res.status(400).send({
                status: res.statusCode,
                success: false,
                data: null,
                message: 'Username already exist'
            })
            return;
        }
        if (emailDb) {
            res.status(400).send({
                status: res.statusCode,
                success: false,
                data: null,
                message: 'Email already exist'
            })
            return;
        }
        const newPremiumUser = await prisma.premium_admin.create({
            data: {
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

