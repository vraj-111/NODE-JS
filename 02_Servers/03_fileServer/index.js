import http from "http";

import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("./style.html", (err, data) => {
    if (err) {
      return res.writeHead(404);
      res.end("doesn't found");
    } else {
      return res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });
});

const port = 302;

server.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`server was running ${port}`);
});
