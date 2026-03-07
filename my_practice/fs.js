const fs=require("fs");
function todo(){
    const data = fs.readFileSync("todos.json","utf-8");
    return JSON.parse(data);
}
function addtodo(task){
    const read=todo();
    const add={
        id:read.length+1,
        title:task,
        completed:false
    }
    read.push(add);
    fs.writeFileSync("todos.json",JSON.stringify(read,null,2));
}

function listtodo(){
    const todos = todo();
    if(todos.length===0){
        console.log("there is no todo");
        return;
    }
    todos.forEach((todoe,index)=>{
        const status = todoe.completed?"done":"abhi nhi hua";
        console.log(`${index+1},${status},${todoe.title}`);
    })
}

function updatestatus(id){
    const todos=todo();
    const check = todos.find(t=>t.id===Number(id));
    if(!check){
        return console.log("todo not exist");
    }
    check.completed=true;
    fs.writeFileSync("todos.json",JSON.stringify(todos,null,2));
}

function deleted(id){
    const todos=todo();
    const remaning=todos.filter(t=>t.id!==Number(id));
    if(remaning.length===todos.length){
        return console.log("no todo find");
    }
    fs.writeFileSync("todos.json",JSON.stringify(remaning));
    console.log(`deleted ${id}`);
}
addtodo("lakhu");
addtodo("paglu");
updatestatus(2);
deleted(2);
listtodo();

