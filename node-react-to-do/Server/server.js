import http from "http"
import fs from "fs"
import path from "path"
import { getNote, getNotes, createNote, deleteNote } from "./database.js"


const server = http.createServer(async (req, res) => {

    const allowedOrigins = ["http://localhost:3000"]; // Replace with your React app's URL

  // Check if the request origin is in the allowed list
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

  // Set other CORS headers
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
    // Preflight request (OPTIONS), respond with 200 OK
        res.writeHead(200);
        res.end();
        return;
    }




    if(req.url === '/'){
        try{
            let allNotes = await getNotes();
            // console.log(allNotes)

            const response = {
                tasks: allNotes,
            };
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response)); 

        } catch{
            console.error("Error:", error);
            res.statusCode = 500; // Set an appropriate status code for the error
            res.end("Cannot get all notes");
        }
             
    }
    try{
        if (req.url.match(/\/notes\/(\d+)/)) {

            const match = req.url.match(/\/notes\/(\d+)/);
            console.log("URL:", req.url);

            if (match && match[1] !== undefined) {

                const idString = match[1];
                const id = parseInt(idString);
                console.log("id:", id);

                if (isNaN(id)) {
                    console.log("Invalid id: " + id);
                    res.statusCode = 400; 
                    res.end("Invalid id");
                } 
            else {
                try{
                    const note = await getNote(id);
                    // console.log(note);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(note));
                
                }
                catch(error){
                    console.error("Error fetching note:", error);
                    res.statusCode = 500; // Set an appropriate status code for the error
                    res.end("Internal Server Error");
                }
                
            }
        }
    }
}        
    catch (error){
        console.error("Error:", error);
        res.statusCode = 500; // Set an appropriate status code for the error
        res.end("Cannot access the note using single id");
    }

    if(req.url.match(/\/notes\/create\?title=([^&]+)&contents=([^&]+)/
    )){
        try{
            const Creatematch = req.url.match(/\/notes\/create\?title=([^&]+)&contents=([^&]+)/
            )
            console.log(Creatematch);
            
            const createdNote = await createNote(Creatematch[1], Creatematch[2]);
            const response = {
                tasks: [createdNote],
            };
            console.log(response);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        }

        catch(error){
            console.error("Error:", error);
            res.statusCode = 500; 
            res.end("Cannot create note");
        }
    }

    if (req.url.match(/\/notes\/delete\/(\d+)/)){
        const delete_url = req.url.match(/\/notes\/delete\/(\d+)/);
        const delete_id = delete_url[1];

        if(delete_id == undefined){
            console.log("Invalid id: " + delete_id);
            res.statusCode = 400; 
            res.end("Invalid id");
        }else{
            try{
                const response = await deleteNote(delete_id);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: "Note Deleted" }));    
            }

            catch(error){
                console.log("Error", error)
                res.statusCode = 500; 
                res.end("Cannot create note");
            }
        }

        
    }
    
})

server.listen(8080, () => {
    console.log("Server started on port 8080.")
})