module.exports = function(app) {
    app.get('/calendarios', function(req, res) {

        var connection = app.persistencia.connectionFactory();
        var calendarioDAO = new app.persistencia.CalendarioDAO(connection);

        calendarioDAO.lista(function(erro, resultado) {
            if(erro) {
                res.status(500).send(erro);
                return;
            }
            res.send(resultado);
        });
    });
}
