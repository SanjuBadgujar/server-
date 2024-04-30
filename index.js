const http = require('http'); // module
const routes = require('./routes/route');
const app = require('./app'); // files
const { log } = require('console');
const cors = require("cors");

app.use(cors());
app.use('/api', routes)

app.set('port', 3001);


const server = http.createServer(app);
server.listen(3001);



console.log("server is start on", 3001);
