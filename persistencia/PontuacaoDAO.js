function PontuacaoDAO(connection) {
  this._connection = connection;
}

PontuacaoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM pontuacao', callback);
}

PontuacaoDAO.prototype.save = function(pontuacao, callback) {
  this._connection.query('INSERT INTO pontuacao SET ?', pontuacao, callback);
}

PontuacaoDAO.prototype.update = function(pontuacao, callback) {
  this._connection.query('UPDATE pontuacao SET ? where id = ? ', [pontuacao, pontuacao.id], callback);
}

PontuacaoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM pontuacao WHERE id = ? ', [id], callback);
}

module.exports = function() {
  return PontuacaoDAO;
}