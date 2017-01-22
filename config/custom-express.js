var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidador = require('express-validator');

module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    //Adiciona o body-parser como middleWare do express
    app.use(bodyParser.json());

    app.use(expressValidador());

    //Informa para a variável app conhecer a pasta controllers
    consign()
        .include('controllers')
        .then('persistencia')
        .into(app);

    return app;
}
