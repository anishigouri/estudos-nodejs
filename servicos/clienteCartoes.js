var restify = require('restify');

var cliente = restify.createJsonClient({
    url: 'http://localhost:3001'
});

cliente.post('/catoes/autoriza', cartao,
        function(erro, req, res, retorno) {
            console.log('consumindo serviço de cartoes');
            console.log(retorno);
});
