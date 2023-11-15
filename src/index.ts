import express, { Application } from 'express';
import cors from 'cors';
import router from './routers/router';
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
            genre: "happy",
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
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      await prisma.$disconnect();
    }
}

// insertInitialData();

// const server = http.createServer(app);

// app.get("/", (_req, res) => {
//     res.send("Server is h running on port 3000");
// });

// app.get("/api/premium_user", async (req, res) => {
//     try {
//         const allPremiumUsers = await prisma.premium_user.findMany();
//         return res.json({
//             success: true,
//             data: allPremiumUsers
//         });
//     } catch (error) {
//         return res.json({
//             success: false,
//             message: error
//         });
//     }
// });

// app.post("api/premium_user", async (req, res) => {
//     try {
//         const { user_id } = req.body;
//         const newPremiumUser = await prisma.premium_user.create({
//             data: {
//                 user_id : String 
//             }
//         });
//         return res.json({
//             success: true,
//             data: newPremiumUser
//         })
//     } catch (error) {
//         return res.json({
//             success: false,
//             message: error
//         }); 
//     }
// })

app.listen(3000, () => {
    console.log('Server is lalaa http://localhost:3000/');
})
