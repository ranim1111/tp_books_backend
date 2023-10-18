const http = require("http")
const app= require("./App")
const port =process.env.Port || 5001
const server = http.createServer(app)
server.listen(port,() =>{
    console.log("listening on " + port)
})