const insertIntoTable = require("./db.js").insertIntoTable;

const express = require("express");
const app = express();

app.use(express.json());

const envVars = process.env;
const bgColor = envVars.BGCOLOR || "#000000";
const fgColor = envVars.FGCOLOR || "#ffffff";

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

if (!hexRegex.test(bgColor)) {
  console.log("Invalid background color. Setting to default.");

  bgColor = "#000000";
}

if (!hexRegex.test(fgColor)) {
  console.log("Invalid foreground color. Setting to default.");

  fgColor = "#ffffff";
}

const createHTMLBody = (content) => {
  return `<html><body style="background-color: ${bgColor}; color: ${fgColor};">${content}</body></html>`;
};

app.use((req, res, next) => {
  const ip = req.ip;
  const method = req.method;
  const path = req.path;
  const userAgent = req.headers["user-agent"];

  insertIntoTable(ip, method, path, userAgent);

  next();
});

app.get("/", (req, res) => {
  res.send(createHTMLBody("Hello World!"));
});

app.get("/api/environment", (req, res) => {
  const format = req.query.format || "html";

  switch (format) {
    case "json":
      res.setHeader("Content-Type", "application/json");
      res.send(envVars);
      break;
    case "xml":
      res.setHeader("Content-Type", "application/xml");
      let xml = "<envVars>";
      for (let key in envVars) {
        xml += `<${key}>${envVars[key]}</${key}>`;
      }
      xml += "</envVars>";
      res.send(xml);
      break;
    default:
      res.setHeader("Content-Type", "text/html");

      let html = "<h1>Environment Variables</h1><ul>";
      for (let key in envVars) {
        html += `<li>${key}: ${envVars[key]}</li>`;
      }

      html += "</ul>";

      res.send(createHTMLBody(html));
  }
});

app.get("/api/headers", (req, res) => {
  const headers = req.headers;

  let format = "html";
  if (req.query.format) {
    format = req.query.format;
  }

  switch (format) {
    case "json":
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(headers, null, 2));
      break;
    case "xml":
      res.setHeader("Content-Type", "application/xml");
      let xml = "<headers>";
      for (const key in headers) {
        xml += `<${key}>${headers[key]}</${key}>`;
      }
      xml += "</headers>";
      res.send(xml);
      break;
    default:
      res.setHeader("Content-Type", "text/html");

      let html = "<h1>Request Headers</h1><ul>";
      for (const key in headers) {
        html += `<li>${key}: ${headers[key]}</li>`;
      }
      html += "</ul>";

      res.send(createHTMLBody(html));
  }
});

app.all("/api/post", (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const body = req.body;

  console.log(body);

  let format = "html";
  if (req.query.format) {
    format = req.query.format;
  }

  switch (format) {
    case "json":
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(body, null, 2));
      break;
    case "xml":
      res.setHeader("Content-Type", "application/xml");
      let xml = "<body>";
      for (const key in body) {
        xml += `<${key}>${body[key]}</${key}>`;
      }
      xml += "</body>";
      res.send(xml);
      break;
    default:
      res.setHeader("Content-Type", "text/html");

      let html = "<h1>Request Body</h1><ul>";

      for (const key in body) {
        html += `<li>${key}: ${body[key]}</li>`;
      }

      html += "</ul>";

      res.send(createHTMLBody(html));
  }
});

console.log("Starting server...");

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
