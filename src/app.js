"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var config_1 = require("./database/config");
var auth_1 = require("./routes/auth");
var client_1 = require("./routes/client");
var event_1 = require("./routes/event");
dotenv_1.default.config();
/** Creating Express Server */
var app = (0, express_1.default)();
var port = process.env.PORT;
/** Database */
(0, config_1.dbConnection)();
/** Public Directory */
app.use(express_1.default.static("public"));
/** Reading and parsing of body */
app.use(express_1.default.json());
/** Routes */
app.use("/api/auth", auth_1.routerAuth);
app.use("/api/client", client_1.routerClient);
app.use("/api/event", event_1.routerEvents);
/** Listen Petitions */
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
