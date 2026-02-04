const fs = require("fs");

fs.open("file.txt", "a+", function (err, fd) {
    if (err) throw err;

    fs.write(fd, "Hello World\n", function (err) {
        if (err) throw err;

        fs.close(fd, function () {
            console.log("Done");
        });
    });
});
