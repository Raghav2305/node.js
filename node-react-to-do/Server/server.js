import http from "http"
import fs from "fs"
import path from "path"
import { getNote, getNotes, createNote } from "./database.js"

const server = http.createServer(async (req, res) => {
    if(req.url === '/'){
        try{
            let allNotes = await getNotes();
            console.log(allNotes)
            console.log(allNotes)
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(allNotes)); 
        } catch{
            console.error("Error:", error);
            res.statusCode = 500; // Set an appropriate status code for the error
            res.end("Internal Server Error");
        }
             
    }
    if(req.url === 'notes/:id'){
        try{
            const id =  req.query.id;
            console.log(id);
            if(id === ""){
                console.log("Empty!!!!!");
            }
            const note = await getNote(id);
            console.log(note)
            res.setHeader('Content-Type', 'application/json');
            res.end(note); 
            
        } catch{
            console.error("Error:", error);
            res.statusCode = 500; // Set an appropriate status code for the error
            res.end("Internal Server Error");
        }
    }
})

server.listen(8080, () => {
    console.log("Server started on port 8080.")
})