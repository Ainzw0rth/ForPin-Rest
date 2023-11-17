import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import UserModel from "../models/userModel";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModel = new UserModel();
const prisma = new PrismaClient();

export async function register( req : Request, res : Response ) {
    try {
        const { email, fullname, username, password, profile_path } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usernameDb = await userModel.getUser(username);
        const emailDb = await userModel.getUserFromEmail(email);

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
        const newPremiumUser = await prisma.premium_user.create({
            data: {
                email, 
                fullname, 
                username,
                password: hashedPassword,
                profile_path,
                is_admin: true
            }
        });
        return res.status(201).json({
            success: true,
            data: newPremiumUser,
            message: 'User registered successfully'
        });
    } catch {
        return res.sendStatus(500);
    }
}

export async function login( req : Request, res : Response ) {
    try {
        const { username, password } = req.body;
        const user = await userModel.getUser(username);
        const secret = process.env.JWT_TOKEN_SECRET;

        if (user) {
            if (user.is_admin) {
                const passwordTrue = bcrypt.compareSync(password, user.password);
                const token = jwt.sign({username: username, password: password}, secret, {expiresIn: '24h'});
                if (passwordTrue) {
                    res.status(201).json({
                        success: true,
                        data: user,
                        token,
                    })
                } else {
                    res.json({
                        message: "failed"
                    });
                }
            } else {

                const formData = new FormData();
                formData.append("username", username);
                formData.append("password", password);

                const token = jwt.sign({username: username, password: password}, secret, {expiresIn: '24h'});
                
                const response = await fetch('http://host.docker.internal:80/user/login', {
                    method: 'POST',
                    body: formData
                }).then(response => {
                    if (response.status === 201) {
                        res.status(201).json({
                            success: true,
                            data: user,
                            token
                        })
                    } else {
                        res.sendStatus(403);
                    }
                })
            }
        } else {
            res.sendStatus(400);
        }

    } catch {
        return res.sendStatus(500);
    }
}

export async function addUser(req : Request, rep : Response) {
    const { username } = req.body;
    const response = await fetch(`http://host.docker.internal:80/user/getUser/${username}`, {
        method: 'GET',
    }).then(response => response.json())
    .then(data => {
        const newUser = userModel.addUser(data.email, data.fullname, data.username, data.password, data.profile_path, false);
        rep.status(201).json({
            success: true,
            data: newUser
        });
    })
    .catch(error => console.error('Error:', error));
}

export async function getAllUsers( req : Request, res : Response ) {
    try {
        const results = await userModel.getAllUsers();
        return res.json({
            success: true,
            data: results
        })
    } catch {
        res.sendStatus(500);
    }
}