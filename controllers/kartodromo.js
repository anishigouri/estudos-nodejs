module.exports = function(app) {

    app.get('/kartodromos', function(req, res) {

        var connection = app.persistencia.connectionFactory();
        var kartodromoDAO = new app.persistencia.KartodromoDAO(connection);

        kartodromoDAO.list(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }

            res.send(result);
        });

    });
}
