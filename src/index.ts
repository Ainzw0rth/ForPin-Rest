import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient(); 

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const server = http.createServer(app);

app.get("/", (_req, res) => {
    res.send("Server is running on port 3000");
});

app.get("/api/premium_users", async (req, res) => {
    try {
        const allPremiumUsers = await prisma.premium_users.findMany();
        return res.json({
            success: true,
            data: allPremiumUsers
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
});

app.post("api/premium_users", async (req, res) => {
    try {
        const { user_id } = req.body;
        const newPremiumUser = await prisma.premium_users.create({
            data: {
                user_id
            }
        });
        return res.json({
            success: true,
            data: newPremiumUser
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error
        }); 
    }
})



app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
})
