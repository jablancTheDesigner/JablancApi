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

const whitelist = ['http://jablanc.com', "https://api-jablanc.vercel.app", "https://jablanc-dashboard.vercel.app"]
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

app.use(express.json())

app.use(express.static(path.join(__dirname, 'dashboard/dist')));

app.use("/projects", cors(corsOptionsDelegate), projectsRouter)

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
