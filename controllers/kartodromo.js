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

    app.post('/kartodromos', function(req, res) {

        var connection = app.persistencia.connectionFactory();
        var kartodromoDAO = new app.persistencia.KartodromoDAO(connection);

        var kartodromo = req.body['kartodromo'];

        kartodromoDAO.save(kartodromo, function(err, result) {
            if(err) {
                console.log('Erro ao inserir no banco de dados');
                res.status(500).send(err);
            } else {
                console.log('resultado', result);
                res.status(201).json(result);
            }
        });
    });

}
