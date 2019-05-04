const http =require("http");
const url = require("url");
const port = 9191
const database = require("./database");




function connexion(mail, mdp, res) {

  function display_result (result)
  {
    res.end(JSON.stringify(result));
  }

    let query_str =  `select user_name from user where mail="${mail}" AND mdp="${mdp}"`;

    database.do_query(query_str, display_result);
}


function dispatch(req,res)
{
  let q = url.parse(req.url,true);
  let pathname = q.pathname;

    if (pathname === "/user")
      {
      res.writeHead(200);
      res.end("Hello user")
      }
      else if (pathname === "/user/login")
      {
       let mdp = q.query.mdp;
       let mail = q.query.mail;
        connexion(mail, mdp, res);
        console.log(q);
      }
      else if (pathname === "/signup/")
}

const server = http.createServer(dispatch);
console.log("serveur en ecoute");
server.listen(port);
