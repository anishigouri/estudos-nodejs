function ResultadoDAO(connection) {
  this._connection = connection;
}

ResultadoDAO.prototype.list = function(callback) {
  this._connection.query('SELECT * FROM resultado', callback);
}

ResultadoDAO.prototype.save = function(resultado, callback) {
  this._connection.query('INSERT INTO resultado SET ?', resultado, callback);
}

ResultadoDAO.prototype.update = function(resultado, callback) {
  this._connection.query('UPDATE resultado SET ? where id = ? ', [resultado, resultado.id], callback);
}

ResultadoDAO.prototype.getById = function(id, callback) {
  this._connection.query('SELECT * FROM resultado WHERE id = ? ', [id], callback);
}

module.exports = function() {
  return ResultadoDAO;
}