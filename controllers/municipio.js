module.exports = function(app) {
    app.get('/municipios/:uf', function(req, res) {
        var uf = req.params.uf;
        var connection = app.persistencia.connectionFactory();
        var municipioDAO = new app.persistencia.MunicipioDAO(connection);

        municipioDAO.findByUf(uf, function(err, result) {
            if(err) {
                res.status(500).send(err);
                return;
            }

            res.send(result);
        });
    });

    app.get('/ufs', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var municipioDAO = new app.persistencia.MunicipioDAO(connection);

        municipioDAO.listUfs(function(err, result) {
            if(err) {
                res.status(500).send(err);
                return;
            }

            res.send(result);
        });
    });
}
