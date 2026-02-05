const fs = require("fs");
// console.log(fs);

const readTodo = function () {
    const data = fs.readFileSync("todo.json", "utf-8");
    return JSON.parse(data);
}

console.log(readTodo());



function writeTodos(bhavya) {
    fs.writeFileSync("todo.json", JSON.stringify(bhavya, null, 2));
}

let todos = readTodo();

todos.push({
    "id": 1,
    "task": "Learn fs module",
    "done": true
  });

todos.push({
    "id": 1,
    "task": "learing fs module",
    "done": true
  });


writeTodos(todos);

function listTodos() {
    const todos = readTodo();

    if (todos.length === 0) {
        console.log("No todos found!");
        return;
    }

    todos.forEach((todos, index) => {
        const status = todos.done ? "✅" : "❌";
        console.log(`${index + 1}.${status}${todos.task}`);
    });
}
listTodos();

























