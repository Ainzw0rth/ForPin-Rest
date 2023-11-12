import express, { Application } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import router from './routers/router';

const app: Application = express();

app.use(cors({
    credentials: true,  
}));

app.use(express.json());
app.use('/', router);

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
