import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import problemRoutes from './routes/problem.routes.js'
import executionRoute from "./routes/execute-code.routes.js"
import submissionRoutes from "./routes/submission.routes.js"
import playlistRoutes from "./routes/playlist.routes.js"
import cors from "cors";
dotenv.config();

const app = express();  
app.use(express.json());   
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello guys welcometo leetcode');
});

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/problems",problemRoutes)
app.use("/api/v1/execute-code",executionRoute)
app.use ("/api/v1/submission",submissionRoutes)
app.use("/api/v1/playlist",playlistRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);


});

