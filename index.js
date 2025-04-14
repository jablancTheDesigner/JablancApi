import express from "express";
import projectsRouter from "./routes/projects.js";
import cors from "cors"
import path from "path"

const app = express();
const port = process.env.port || 5050;
const __dirname = path.resolve();

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'dashboard/dist')));

app.use("/projects", projectsRouter)

app.listen(port , (err) => {
    console.log(`Server on port localhost:${port}`)
})