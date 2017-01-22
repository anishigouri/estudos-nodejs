function PagamentoDAO(connection) {
    this._connection = connection;
}


//Prototype garante que cada vez que criamos uma nova instancia, de fato consiga metodos exclusivo de cada instancia
//Evita que diferentes threads compartilhem do mesmo DAO
PagamentoDAO.prototype.salva = function(pagamento, callback) {
    this._connection.query('INSERT INTO pagamentos SET ?', pagamento, callback);
}

PagamentoDAO.prototype.atualiza = function(pagamento, callback) {
    this._connection.query('UPDATE pagamentos SET status = ? where id = ? ', [pagamento.status, pagamento.id], callback);
}

PagamentoDAO.prototype.lista = function(callback) {
    this._connection.query('SELECT * FROM pagamentos', callback);
}

PagamentoDAO.prototype.buscaPorId = function(id, callback) {
    this._connection.query('SELECT * FROM pagamentos WHERE id = ? ', [id], callback);
}

module.exports = function() {
    return PagamentoDAO;
}
