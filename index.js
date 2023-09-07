import express from "express";
import http from "http";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
const hyper=http.createServer(app);

app.use(express.static("public"));


const PORT= 3000;


hyper.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})



app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})


//Socket

import {Server} from "socket.io";

let io=new Server(hyper);


// import { Server as abc} from "socket.io"
// let a=new abc(hyper)
io.on("connection",(socket)=>{
    console.log("Connected....");
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg);
    })
});

