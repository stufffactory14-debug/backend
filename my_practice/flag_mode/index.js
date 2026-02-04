const fs = require("fs");
fs.writeFile("file.txt", "Hello World", (err) => {
    if (err) throw err;
});
//for creation of file using wrte same we can do using append 
