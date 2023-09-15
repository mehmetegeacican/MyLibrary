const app = require("./app");
const PORT = 4000;
const HOST = '0.0.0.0';

//Listen the Port
app.listen(PORT,HOST, (error) => {
    if (!error) {
        console.log("Excel Server is Successfully Running, and App is listening on port " + PORT);
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
}
);