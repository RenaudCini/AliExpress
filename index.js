const express = require('express')
const http = require("http");
const url = require("url");

const app = express()
const port = 3000
const database = require("./database");

// recup jsonHello WoHello World!rld!
app.use(express.json());
// app.use(express.urlencoded());

let data_s = [];

function display_result(result,res) {

  res.end(JSON.stringify(result));
}


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => {
  data_s.push(req.body);
  res.setHeader('Content-Type', 'application/');
  res.send(JSON.stringify(data_s))
})


app.get('/user', (req, res) => {
  res.writeHead(200);
  res.end("Hello user")
})

app.post('/user/signup', (req, res) => {


let q = url.parse(req.url, true);
  let query_str = `select name_user from user where mail="${q.query.mail}" AND mdp="${q.query.mdp}"`;

  database.do_query(query_str, display_result(res), () => res.send('NO resuls'));
})

app.get('/user/login', (req, res) => {
  let q = url.parse(req.url, true);
  let query_str = `INSERT INTO user(name_user,mail,mdp) VALUE("${q.query.name_user}","${q.query.mail}","${q.query.mdp}")`;
  database.do_query(query_str)
})


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!${data_s}`))
