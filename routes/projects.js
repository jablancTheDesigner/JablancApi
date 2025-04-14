import Project from "../data/project.js";
import express from "express";
import DataDocument from "../data/dataDocument.js"
import { fireStore } from "../firebase/firebase.js"
import { addDoc, collection, getDocs, deleteDoc, getDoc, doc } from 'firebase/firestore';

const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
    try{
        const results = [];
        const querySnapshot = await getDocs(collection(fireStore, "projects"));
        querySnapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id })
        });
        res.status(200).send({
            projects: results
        });
    } catch(e){
        res.status(400).send(e.message);
    }
});

projectsRouter.get("/:id", async (req, res) => {
    try {
        const docRef = doc(fireStore, "projects", req.params.id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            res.status(200).send({
                project: {
                    ...docSnap.data(),
                    id: req.params.id
                }
            });
        } else {
            throw new Error(`No Document found with id: ${req.params.id}`);
        }
    } catch(e){
        res.status(400).send(e.message)
    }
});

projectsRouter.post("/add", async (req, res) => {
    try {
        const {title, metaData} = req.body;
        const project = new Project(title, metaData);
        const docRef = await addDoc(collection(fireStore, "projects"), {
            ...project
        });
        res.status(200).send({
            id: docRef.id
        });
    } catch(e){
        res.status(400).send(e.message);
    }
})

projectsRouter.post("/delete", async (req, res) => {
    try {
        const {docId} = req.body;
        if (!docId) {
            throw new Error("DocID is undefined.")
        }
        const docRef = doc(fireStore, "projects", docId);
        await deleteDoc(docRef);
        res.status(200).send('Document removed');
    } catch(e){
        res.status(400).send(e.message);
    }
});

export default projectsRouter;

