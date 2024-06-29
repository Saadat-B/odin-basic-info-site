const http = require("http");

const fs = require("fs");

const url = require("url");

const PORT = 3000;

const myServer = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  let filename = "";

  if (pathname === "/") {
    filename = "./index.html";
  } else {
    filename = `./${pathname}.html`;
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      fs.readFile("./404.html", (err, errorData) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("<h1>404 Page not found</h1>");
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(errorData);
        }
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

myServer.listen(PORT, () => {
  console.log(`My server is running on port ${PORT}`);
});
