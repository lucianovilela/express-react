// init project
var express = require("express");
var app = express();
var session = require("express-session");
var token = require("./token");
const router = express.Router();
var httpProxy = require("http-proxy");
var apiProxy = httpProxy.createProxyServer();

// Using session middleware
app.use(
  session({
    secret: "a secret string",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);
app.use("/protected", token.validateToken, (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<p>Ola: " + req.user.username + "</p>");
  res.write("<p>Views: " + req.session.views + "</p>");
  res.write("<p>Expiration: " + req.session.cookie.maxAge / 1000 + "s</p>");
  res.write("<p>username: " + req.cookie.username + "</p>");
  res.end();
});

app.get("/login", token.generateToken, (req, res) => {
  req.session.token = req.token;
  res.json({ token: req.token });
  res.end();
});

// Access the session with req.session
app.get("/init", function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write(`<script >document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    </script>`);
    res.write("<p>Views: " + req.session.views + "</p>");
    res.write("<p>Expiration: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end(
      "Welcome to express-session. Refresh to see the view count increment."
    );
  }
});

app.use("/init2/*", express.static("./view/build"));

app.all("/*", (req, res) => {
  apiProxy.web(req, res, { target: "http://localhost:3000/" });
});

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
