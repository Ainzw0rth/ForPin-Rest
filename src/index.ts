import express, { Application } from 'express';
import { Request, Response } from "express";
import cors from 'cors';
import router from './routers/router';
import path from 'path';
import { Multer } from 'multer';
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');

const app: Application = express();

app.use(cors({
    credentials: true,  
}));

app.use(express.json());
app.use('/', router);
app.use('/media', express.static('uploads'));

const prisma = new PrismaClient();
async function insertInitialData() {
    try {
        const poster = await prisma.Premium_user.create({
            data: {
                email: "vestia_zeta@gmail.com",
                fullname: "Vestia Zeta",
                username: "agent_V7",
                password: "bazo",
                profile_path: "http://localhost:3000/media/profile pic.gif",
            },
        });
   
        console.log('Data poster inserted:', poster);
        const post = await prisma.Exclusive_content.create({
            data: {
            caption: "terzeta zeta",
            descriptions: "uweeeeeeeeee",
            premium_user_id: poster.user_id,
            },
        });
    
        console.log('Data post inserted:', post);

        const media = await prisma.Exclusive_media.create({
            data: {
            media_path: "http://localhost:3000/media/Jamming.mp4",
            media_post_id: post.post_id,
            },
        });
        console.log('Data media inserted:', media);

        const media2 = await prisma.Exclusive_media.create({
            data: {
            media_path: "http://localhost:3000/media/sO yOU HAve a MoThER.mp4",
            media_post_id: post.post_id,
            },
        });
        console.log('Data media inserted:', media2);

        const tag = await prisma.Tag.create({
            data: {
                genre: "happy",
                exclusive_content: {
                    connect: {
                        post_id: post.post_id
                    }
                }
            }
        })
        console.log('Data data inserted:', tag);

    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      await prisma.$disconnect();
    }
}

// insertInitialData();

// for uploading the media
interface MulterRequest extends Request {
    file: any;
}

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req: MulterRequest, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage
})

app.post("/upload", upload.array('file'), (req: Request, res: Response) => {
    console.log(req.files);
    console.log(req.body);

    const mediaPaths = (req.files as Express.Multer.File[]).map(file => 'http://localhost:3000/media/' + file.filename);
    res.json({
        success: 1,
        media_paths: mediaPaths
    });
});

app.listen(3000, () => {
    console.log('Server is lalaa http://localhost:3000/');
})