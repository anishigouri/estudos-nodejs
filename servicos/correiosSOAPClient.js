var soap = require('soap');

soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
        function(erro, cliente) {

            console.log('cliente Soap criado');

            cliente.CalcPrazo({'nCdServico' : '40010', 'sCepOrigem' : '03802020', 'sCepDestino' : '06810320'},

                function(err, resultado) {
                    console.log(JSON.stringify(resultado));
            });
        }
)
