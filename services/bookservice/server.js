const app = require("./app");
const PORT = 4000;

//Connect to Db and Listen the Port
app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
}
);