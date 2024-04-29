const http = require('http'); // module

const app = require('./app'); // files

app.set('port', 3000);
app.get('/get', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });
  // post
let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
const server = http.createServer(app);
server.listen(3000);

console.log("server is start");
