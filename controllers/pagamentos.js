
module.exports = function(app) {

    app.get('/pagamentos', function(req, res) {
        console.log('Recebida requisição de testesss.');
        res.send('OK');
    });

    app.delete('/pagamentos/pagamento/:id', function(req, res) {
        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.atualiza(pagamento, function(erro) {
            if(erro) {
                res.status(500).send(erro);
                return;
            }
            console.log('pagamento cancelado');
            res.send(pagamento);
        });
    });

    app.put('/pagamentos/pagamento/:id', function(req, res) {

        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.atualiza(pagamento, function(erro) {
            if(erro) {
                res.status(500).send(erro);
                return;
            }
            res.send(pagamento);
        });

    });

    app.post('/pagamentos/pagamento', function(req, res) {

        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser um decimal.").notEmpty().isFloat();
        req.assert("pagamento.moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);


        var errors = req.validationErrors();

        if(errors) {
            console.log('Erros de validação encontrados');
            res.status(500).send(errors);
            return;
        }

        var pagamento = req.body["pagamento"];
        console.log('Processando uma requisição de um novo pagamento');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date;

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDAO(connection);

        pagamentoDAO.salva(pagamento, function(erro, resultado) {
            if(erro) {
                console.log('Erro ao inserir no banco', erro);
                res.status(500).send(erro);
            } else {
                pagamento.id = resultado.insertId;
                console.log('pagamento criado');

                if(pagamento.forma_de_pagamento == 'cartao') {
                    var cartao = req.body["cartao"];
                    console.log(cartao);
                    res.status(201).json(response);

                    clienteCartoes.autoriza(cartao);
                    return;
                }

                res.location('/pagamentos/pagamento' + pagamento.id); // da implementação do Mysql

                //HATEOAS - Hypermedia as the engine of application state

                var response = {
                    dados_do_pagamento : pagamento,
                    links: [
                        {
                            href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                            rel: 'confirmar',
                            method: 'PUT'
                        },
                        {
                            href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
                            rel: 'cancelar',
                            method: 'DELETE'
                        }
                    ]
                }


                res.status(201).json(response);
            }
        });

    });
}
