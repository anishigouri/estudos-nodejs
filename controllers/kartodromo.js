module.exports = async function(app) {

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

    app.get('/kartodromos/:id', function(req, res) {
        var id = req.params.id;
        var connection = app.persistencia.connectionFactory();
        var kartodromoDAO = new app.persistencia.KartodromoDAO(connection);

        kartodromoDAO.getById(id, function(err, result) {
            if(err) {
            res.status(500).send(err);
            return;
            }
            res.send(result);
        });
    });

    app.delete('/kartodromos/:id', function(req, res) {
        var id = req.params.id;
        var connection = app.persistencia.connectionFactory();
        var kartodromoDAO = new app.persistencia.KartodromoDAO(connection);

        console.log('id', id);

        kartodromoDAO.delete(id, function(err, result) {
            if(err) {
                console.log('Erro ao remover: ', err);
                res.status(500).send(err);
                return;
            }
            res.send(result);
        });
    });

    app.post('/kartodromos', function(req, res) {

        var connection = app.persistencia.connectionFactory();
        var kartodromoDAO = new app.persistencia.KartodromoDAO(connection);
        var contatoDAO = new app.persistencia.ContatoDAO(connection);
        var enderecoDAO = new app.persistencia.EnderecoDAO(connection);

        var kartodromo = req.body['kartodromo'];
        var contato = req.body.kartodromo['contato'];
        var endereco = req.body.kartodromo['endereco'];

        console.log('contato', contato);
        console.log('endereco', endereco);

        contatoDAO.save(contato, function(err, resultContato) {
            if(err) {
                console.log('Erro ao inserir no banco de dados (Contato)');
                res.status(500).send(err);
            } else {
                console.log('id do contato', resultContato.insertId);
                kartodromo.contato_id = resultContato.insertId;
                enderecoDAO.save(endereco, function(err, resultEndereco) {
                    if(err) {
                        console.log('Erro ao inserir no banco de dados (Endereco)');
                        res.status(500).send(err);
                    } else {
                        console.log('resultado', resultEndereco);
                        kartodromo.endereco_id = resultEndereco.insertId;
                        delete kartodromo.contato;
                        delete kartodromo.endereco;        
                        console.log('kartodromo', kartodromo);  
                        kartodromoDAO.save(kartodromo, function(err, result) {
                            if(err) {
                                console.log('Erro ao inserir no banco de dados (Kartodromo)');
                                res.status(500).send(err);
                            } else {
                                console.log('resultado', result);
                                res.status(201).json(result);
                            }
                        });
                    }
                });
            }
        });
    });

    app.put('/kartodromos', function(req, res) {
        
        var connection = app.persistencia.connectionFactory();
        var kartodromoDAO = new app.persistencia.KartodromoDAO(connection);
        var contatoDAO = new app.persistencia.ContatoDAO(connection);
        var enderecoDAO = new app.persistencia.EnderecoDAO(connection);

        var kartodromo = req.body['kartodromo'];
        var contato = req.body.kartodromo['contato'];
        var endereco = req.body.kartodromo['endereco'];

        contatoDAO.update(contato, function(err, resultContato) {
            if(err) {
                console.log('Erro ao atualizar no banco de dados (Contato)');
                res.status(500).send(err);
            } else {
                enderecoDAO.update(endereco, function(err, resultEndereco) {
                    if(err) {
                        console.log('Erro ao atualizar no banco de dados (Endereco)');
                        res.status(500).send(err);
                    } else {
                        delete kartodromo.contato;
                        delete kartodromo.endereco;        
                        kartodromoDAO.update(kartodromo, function(err, result) {
                            if(err) {
                                console.log('Erro ao atualizar no banco de dados (Kartodromo)');
                                res.status(500).send(err);
                            } else {
                                console.log('resultado', result);
                                res.status(201).json(result);
                            }
                        });
                    }
                });
            }
        });
    });

}
