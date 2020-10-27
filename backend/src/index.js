const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configurando realtime
const server = require("http").Server(app);

app.use(cors());

// Fazendo servidor entender requisições via json
app.use(bodyParser.json());

// Fazendo servidor entender parametros via url
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas da aplicação
app.use(require("./routes.js"));

server.listen(process.env.PORT || 3333);
