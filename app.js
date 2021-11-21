const exrpess = require("express");
const http = require("http")
const app = exrpess();
const path = require("path")
const server = http.createServer(app);
const socketIO = require('socket.io');
const momnet = require("moment")

const io = socketIO(server);

app.use(exrpess.static(path.join(__dirname, "src")))
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server is running' ${PORT}`))

io.on("connection", (socket) => {
    // console.log('연결이 이루어졌습니다')
    socket.on("chatting", (data) => {
        const { name, msg } = data;
        io.emit("chatting", {
            name,
            msg,
            time: momnet(new Date()).format("YYYY-MM-DD- HH:ss A")
        })
    })
})