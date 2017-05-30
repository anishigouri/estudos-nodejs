var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidador = require('express-validator');
var morgan = require('morgan');
var logger = require('../servicos/logger.js');

module.exports = function() {
    var app = express();

    //Usado para criar logs
    app.use(morgan("common", {
        stream: {
            write: function(mensagem) {
                logger.info(mensagem);
            }
        }
    }));

    app.use(bodyParser.urlencoded({extended: true}));
    //Adiciona o body-parser como middleWare do express
    app.use(bodyParser.json());

    app.use(expressValidador());

    //Informa para a variável app conhecer a pasta controllers
    consign()
        .include('controllers')
        .then('persistencia')
        .then('servicos')
        .into(app);

    return app;
}
