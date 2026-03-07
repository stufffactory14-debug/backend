const http = require("http");
const fs = require("fs");
const { URL } = require("url");

const server = http.createServer((req,res)=>{
    const method = req.method;
    const url = new URL(req.url,"http://localhost:3000");
    const pathname=url.pathname;
    const id = url.searchParams.get("id");
    if(method==="GET" && pathname==="/todoes"){
        fs.readFile("todoes.json","utf-8",(err,data)=>{
            if(err){
                res.statusCode=404;
                return res.end("error while reading");
            }
            const todoes=JSON.parse(data || "[]");
            if(id){
                const todo=todoes.find(t=>t.id==Number(id));
                if(!todo){
                    res.statusCode=404;
                    return res.end("todo not found");
                }

                res.writeHead(200,{"Content-Type":"application/json"});
                return res.end(JSON.stringify(todo));
            }
            res.statusCode=200;
            res.end(JSON.stringify(todoes));
        })
    }else if(method==="POST" && pathname==="/todoes"){
        let body="";
        req.on("data",chunks=>{
            body+=chunks.toString();
        })

        req.on("end",()=>{
            const todos=JSON.parse(body);
            fs.readFile("todoes.json","utf-8",(err,data)=>{
                if(err){
                    res.statusCode=404;
                    return res.end("enable to write");
                }
                const d=JSON.parse(data||"[]");
                const todo={
                     id:d.length + 1,
                    title:todos.title,
                    completed:false
                }
                d.push(todo);
                fs.writeFile("todoes.json",JSON.stringify(d,null,2),err=>{
                    if(err){
                        res.statusCode=500;
                        return res.end("unable to add new todo");
                    }
                    res.writeHead(201,{"Content-Type":"application/json"});
                    res.end("todo added succesfully");
                })
            })
        })
    }else if(method==="PUT" && pathname==="/todoes"){
        let body="";
        req.on("data",chunks=>{
            body+=chunks.toString();
        })

        req.on("end",()=>{
            const update=JSON.parse(body);
            fs.readFile("todoes.json","utf-8",(err,data)=>{
                if(err){
                    res.statusCode=500;
                    return res.end("unable to read");
                }
                const todos=JSON.parse(data||"[]");
                const todo = todos.find(t=>t.id===Number(id));
                todo.completed=update.completed;
                fs.writeFile("todoes.json",JSON.stringify(todos,null,2),err=>{
                    if(err){
                        res.statusCode=500;
                        return res.end("error while writing");
                    }
                    res.writeHead(201,{"Content-Type":"application/json"});
                    res.end("updated status");
                })
            })
        })
    }else if(method==="DELETE" && pathname==="/todoes"){
        fs.readFile("todoes.json","utf-8",(err,data)=>{
            if(err){
                res.statusCode=500;
                return res.end("error");
            }
            const todos=JSON.parse(data || "[]");
            const todo=todos.filter(t=>t.id!==Number(id));
            if(todo.length===todos.length){
                res.statusCode=500;
                return res.end("no todo exist");
            }
            fs.writeFile("todoes.json",JSON.stringify(todo,null,2),err=>{
                if(err){
                    res.statusCode=500;
                    return res.end("error occured");
                }
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(JSON.stringify(todo));
            })
        })
    }
})

server.listen(3000,()=>{
    console.log("server runing at 3000 port");
})
