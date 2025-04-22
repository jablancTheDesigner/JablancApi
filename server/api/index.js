import express from "express";
import projectsRouter from "../routes/projects.js";
import cors from "cors"
import path from "path"
import { resolvers } from "../gql/resolvers/projectResolvers.js"
import { typeDefs } from "../gql/schemas/index.js"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

const app = express();
const port = process.env.port || 5050;
const __dirname = path.resolve();

const whitelist = ['http://jablanc.com', "https://api-jablanc.vercel.app"]
const corsOptions = {
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    origin: function (origin) {
        if (whitelist.indexOf(origin) !== -1) {
            return origin
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'dashboard/dist')));

app.use("/projects", projectsRouter)

app.listen(port , (err) => {
    console.log(`Server on port localhost:${port}`)
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
