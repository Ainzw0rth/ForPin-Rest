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

// const prisma = new PrismaClient();
// async function insertExclusiveContent() {
//     try {
//       const result = await prisma.exclusive_content.create({
//         data: {
//           post_id: 2,
//           caption: "aku terzeta zeta",
//           descriptions: "aku terzeta zeta",
//           likes: 0,
//           genre: "happy",
//         },
//       });
   
//       console.log('Data inserted:', result);
//     } catch (error) {
//       console.error('Error inserting data:', error);
//     } finally {
//       await prisma.$disconnect();
//     }
//   }

//   insertExclusiveContent();
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
